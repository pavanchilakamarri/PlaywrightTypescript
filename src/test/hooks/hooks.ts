import { After, AfterAll, Before, BeforeAll, Status, setDefaultTimeout } from "@cucumber/cucumber";
import { Browser, Page } from "playwright/test";
import { fixture } from "./pageFixture";
import { invokeBrowser } from "../../helper/browsers/browserManager";
import { getEnv } from "../../helper/env/env";
import { createLogger } from "winston";
import { options } from "../../helper/util/logger";
import { log } from "console";
import { saveRunMeta } from "../../helper/util/saveRunMeta";
import { removeToken, writeTokenToEnv } from "../../helper/wrappers/tokenWriter";
const path = require('path');
require('dotenv').config({ override: true })

getEnv()

const fs = require("fs-extra");
let browser: Browser;
let context: any;
let startTime: string;
setDefaultTimeout(60 * 1000 * 2);
export let apiClient: any;
BeforeAll(async function () {

    if (process.env.Type == 'Web') {
        log("came to if condition in BeforeAll");
        browser = await invokeBrowser();
    } else if (process.env.Type = 'API') {
        await writeTokenToEnv();

    }
    startTime = new Date().toISOString();
    console.log("START TIME IS :: ", startTime)

})

Before(async function ({ pickle }) {
    const scenarioName = pickle.name + pickle.id;
    if (process.env.Type == 'Web') {
        context = await browser.newContext({
            recordVideo: {
                dir: "cucumber-report/videos/",
                size: { width: 640, height: 480 },
            }
        });
        let page: Page = await context.newPage();
        fixture.page = page;
    }
    fixture.logger = createLogger(options(scenarioName));


})

After(async function ({ pickle, result }) {
    let videoPath: string;
    let img: Buffer;

    if (process.env.Type == 'Web') {
        if (result.status == Status.FAILED) {
            img = await fixture.page.screenshot({ path: `./cucumber-report/screenshots/${pickle.name}.png`, type: 'png' });
            videoPath = await fixture.page.video().path();

        }
        await fixture.page.close();
        await context.close();

    }

    if (process.env.Type == 'Web') {
        if (result.status == Status.FAILED) {
            this.attach(img, 'image/png');

            this.attach(
                fs.readFileSync(videoPath), "video/webm"

            );
        }
        await fixture.page.close();
        await context.close();

    }



})

AfterAll(async function () {

    log("CAME to AFTERALL step...");

    const endTime = new Date().toISOString();
    console.log("END TIME IS :: ", endTime)

    const env = (process.env.ENV).toUpperCase();
    let browserName: string;
    let browserVersion: string;
    //pageFixture.logger.close(); 
    if (process.env.Type == 'Web') {
        browser.close();

        browserName = process.env.BROWSER;
        browserVersion = browser.version();


    } else if (process.env.Type == 'API') {
        browserName = 'API';
        browserVersion = 'Not Applicable';
        removeToken();

    }
    saveRunMeta(browserName, startTime, endTime, env, browserVersion);

})