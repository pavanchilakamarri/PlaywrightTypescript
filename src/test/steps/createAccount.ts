
import { Given, When, Then, DataTable, setDefaultTimeout } from "@cucumber/cucumber";
import { fixture } from "../hooks/pageFixture";
import Assert from "../../helper/wrappers/assert";
import LoginPage from "../../web/pages/login";
import { log } from "console";
import { expect } from "playwright/test";
import Accounts from "../../web/pages/Accounts";
import CreateAccount from "../../web/pages/CreateAccount";
import { faker } from "@faker-js/faker/locale/en"


let accounts: Accounts;
let createAccount: CreateAccount;

When('user clicks on Amazon Business', async () => {

  accounts = new Accounts(fixture.page);

  // Write code here that turns the phrase above into concrete actions
  await accounts.clickAmazonBusinessButton();

})

Then('user should redirect to Account page', async () => {
  // Write code here that turns the phrase above into concrete actions
  await accounts.elementPresent();
})

When('user click create account', async () => {
  // Write code here that turns the phrase above into concrete actions
  createAccount = new CreateAccount(fixture.page);

  await accounts.clickCreateAccountsButton();


})

Then('user should redirect to create account page', async () => {
  // Write code here that turns the phrase above into concrete actions
  createAccount = new CreateAccount(fixture.page);
  createAccount.elementPresent();

})

When('user provide account details', async () => {
  // Write code here that turns the phrase above into concrete actions
  function generateFormData() {
    return {
        accountName: faker.person.fullName(),
        accountDesc: faker.person.jobDescriptor(),
        accountNote: faker.person.jobTitle(),
        //we are not using in our test
    };
}
const mockData = generateFormData();
  await createAccount.enterAccountName(mockData.accountName);
  await createAccount.enterAccountDesc(mockData.accountDesc);
  await createAccount.enterAccountNote(mockData.accountNote);
})

When('click on save button', async () => {
  // Write code here that turns the phrase above into concrete actions

  await createAccount.clickSaveButton();
})

Then('account should be created', async () => {
  // Write code here that turns the phrase above into concrete actions
})

Given('user is in create account page', async () => {
  // Write code here that turns the phrase above into concrete actions
})
