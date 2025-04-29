import { Given, When, Then, DataTable, setDefaultTimeout } from "@cucumber/cucumber";
import { fixture } from "../hooks/pageFixture";
import Assert from "../../helper/wrappers/assert";
import LoginPage from "../../web/pages/login";
import { log } from "console";
import { expect } from "playwright/test";


let loginPage:LoginPage;

Given('user is in login page', async () => {

    loginPage = new LoginPage(fixture.page);

    log("testinng ******" + loginPage);

    await loginPage.goto(process.env.BaseUrl);
  

});

When('user provide {string}', async (userName: string) => {

    fixture.logger.info("user provide ");
    
   await loginPage.enterUserName(process.env.EmailID);
   

});

When('user provides {string}', async (password: string) => {
   // await fixture.page.locator("//input[@type='password']").fill(process.env.Password);

    // await fixture.page.locator("//span[text()='Next']").click();

    await loginPage.enterPassword(process.env.Password);


});

When('clicks submit', async () => {
    await loginPage.clickLoginButton();

});

Then('user should navigate to dashboard', async () => {
  
    if(await loginPage.elementPresent())
        fixture.logger.info("PASS");
    else{
        fixture.logger.error("FAILED");
        throw new Error("Element not found...");
    }
        
});
