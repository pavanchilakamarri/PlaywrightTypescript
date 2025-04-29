import { Locator, Page, expect } from "playwright/test";
import { fixture } from "../../test/hooks/pageFixture";
import PlaywrightWrapper from "../../helper/wrappers/PlaywrightWrappers";
import Assert from "../../helper/wrappers/assert";
import assert from "../../helper/wrappers/assert";
import { log } from "console";

export default class Accounts {

    readonly page: Page;
    //
    readonly GettingStarted: Locator;
    readonly AmazonBusiness: Locator;
    readonly Accounts: Locator;
    readonly CreateAccountBtn: Locator;
    readonly AccountName: Locator;
    readonly CreatedBy: Locator;
    readonly Date: Locator;
    playwright: PlaywrightWrapper;


    constructor(page: Page) {
        this.page = page;

        this.AmazonBusiness = this.page.getByRole('link', { name: 'Amazon Business' });
        this.Accounts = this.page.getByRole('heading', { name: 'Accounts' });
        this.CreateAccountBtn = this.page.getByRole('button', { name: 'Create a new account' });
        this.AccountName = this.page.getByRole('cell', { name: 'Account Name' });
        this.CreatedBy = this.page.getByRole('cell', { name: 'Created by' });
        this.Date = this.page.getByRole('cell', { name: 'Date' });
        this.playwright = new PlaywrightWrapper(this.page);

    }   

    async clickAmazonBusinessButton() {

        this.page.waitForLoadState('domcontentloaded')

        //await this.loginBtn.click();
        await this.playwright.waitAndClick(this.AmazonBusiness);
    }

    async elementPresent(): Promise<boolean> {

        return await this.playwright.elementVisible(this.CreateAccountBtn);

    }

    async clickCreateAccountsButton() {
        //await this.loginBtn.click();
        await this.playwright.waitAndClick(this.CreateAccountBtn);
        await this.page.waitForLoadState("networkidle");
    }


}