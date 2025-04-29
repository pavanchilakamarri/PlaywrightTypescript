import { Locator, Page, expect } from "playwright/test";
import { fixture } from "../../test/hooks/pageFixture";
import PlaywrightWrapper from "../../helper/wrappers/PlaywrightWrappers";
import Assert from "../../helper/wrappers/assert";
import assert from "../../helper/wrappers/assert";
import { log } from "console";

export default class Accounts {

    readonly page: Page;
    //
    readonly AccountName: Locator;
    readonly AccountDesc: Locator;
    readonly AccountNote: Locator;
    readonly UploadFile: Locator;
    readonly SaveBtn: Locator;
    readonly CancelBtn: Locator;
    playwright: PlaywrightWrapper;


    constructor(page: Page) {

        this.page = page;
        // this.GettingStarted = this.page.getByRole('heading', { name: 'Getting Started' })
        this.AccountName = this.page.getByRole('textbox', { name: 'Account Name' })
        this.AccountDesc = this.page.getByRole('textbox', { name: 'Account Description' })
        this.AccountNote = this.page.getByRole('textbox', { name: 'Account Notes' })
        this.UploadFile = this.page.getByRole('textbox', { name: 'Click to upload or drag and' })
        this.SaveBtn = this.page.getByRole('button', { name: 'Save' })
        this.CancelBtn = this.page.getByRole('button', { name: 'Cancel' })
        this.playwright = new PlaywrightWrapper(this.page);

    }

    async elementPresent(): Promise<boolean> {

        await this.page.waitForLoadState("domcontentloaded");
        return await this.playwright.elementVisible(this.SaveBtn);


    }

    async enterAccountName(value: string) {
        console.log("Account name.... " + value)

        //this.playwright.waitTime(2000);

        await this.playwright.enterValue(value, this.AccountName);
    }

    async enterAccountDesc(value: string) {
        console.log("Account desc.... " + value)

        // this.playwright.waitTime(2000);

        await this.playwright.enterValue(value, this.AccountDesc);
    }

    async enterAccountNote(value: string) {
        console.log("Account note.... " + value)

        // this.playwright.waitTime(2000);

        await this.playwright.enterValue(value, this.AccountNote);
    }

    async clickSaveButton() {
        //await this.loginBtn.click();
        await this.playwright.waitAndClick(this.SaveBtn);
    }

    async clickCancelButton() {
        //await this.loginBtn.click();
        await this.playwright.waitAndClick(this.CancelBtn);
    }

}