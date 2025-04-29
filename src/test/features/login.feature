Feature: validating login page

@loginPageSauce @Regression @createAccount 
Scenario: valiatio login with validate credentials
Given user is in login page
When user provide "userName" 
And user provides "password"
And clicks submit
Then user should navigate to dashboard