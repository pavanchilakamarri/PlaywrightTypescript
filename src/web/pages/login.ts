import { Locator, Page, expect } from "playwright/test";
import { fixture } from "../../test/hooks/pageFixture";
import PlaywrightWrapper from "../../helper/wrappers/PlaywrightWrappers";
import Assert from "../../helper/wrappers/assert";
import assert from "../../helper/wrappers/assert";
import { log } from "console";

export default class LoginPage {

    readonly page: Page;
    readonly userName: Locator;
    readonly password: Locator;
    readonly loginBtn: Locator;
    readonly primaryHeader: Locator;
    playwright: PlaywrightWrapper;


    constructor(page: Page) {


        this.page = page;
        this.userName = this.page.locator('[data-test="username"]');
        this.password = this.page.locator('[data-test="password"]');
        this.loginBtn = this.page.locator('[data-test="login-button"]');
        this.primaryHeader = this.page.locator('[data-test="primary-header"]');
        this.playwright = new PlaywrightWrapper(this.page);


    }

    async goto(baseUrl: string) {
        await this.playwright.goto(baseUrl);
    }

    async enterUserName(value: string) {
        console.log("Email page is opened....")

        await this.playwright.enterValue(value, this.userName);
    }

    async enterPassword(value: string) {
        await this.playwright.enterValue(value, this.password);
    }

    async clickLoginButton() {
        //await this.loginBtn.click();
        await this.playwright.waitAndClick(this.loginBtn);
    }

    async elementPresent(): Promise<boolean> {

        return await this.playwright.elementVisible(this.primaryHeader);

    }
}   