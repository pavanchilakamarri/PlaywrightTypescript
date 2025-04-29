import { Locator, Page, Expect, expect } from "@playwright/test";
import { fixture } from "../../test/hooks/pageFixture";
import { setDefaultTimeout } from "@cucumber/cucumber";
import { log } from "console";


export default class PlaywrightWrapper {


    constructor(private page: Page) {
        this.page = fixture.page;
        setDefaultTimeout(60 * 1000 * 2);

    }

    async goto(url: string) {
        await this.page.goto(url, {
            waitUntil: "domcontentloaded"
        });
    }

    async waitAndClick(locator: Locator) {

        await locator.waitFor({ state: 'visible', timeout: 15000 });
        //this.page.waitForTimeout(10000);
        await locator.click();
    }

    async navigateTo(link: string) {
        await Promise.all([
            this.page.click(link)
        ])
    }

    async enterValue(value: string, locator: Locator) {

        // await locator.waitFor();
        await locator.waitFor({ state: 'visible', timeout: 15000 });
        await locator.fill(value);
    }

    async waitTime(duration: number) {
        await new Promise(f => setTimeout(f, duration));
    }

    async elementVisible(locator: Locator): Promise<boolean> {

        await locator.waitFor({ state: 'visible', timeout: 15000 });

        return await locator.isVisible();

    }

}