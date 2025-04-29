
import { Given, When, Then } from "@cucumber/cucumber";
import endpoints from "../../../helper/APIConstants/endpoints";
import { getEnv } from "../../../helper/env/env";
import { apiClient } from "../../hooks/hooks";
import ApiHelper from "../../../helper/wrappers/APIWrappers";

require('dotenv').config({ override: true })

let response;

Given('GET request is available for Retrieving the user details', async () => {

  const token = `dev_access_token=${process.env.AccessToken}`

  console.log("TOken is :: " + token);
})


When('user send {int} as user id', async (value: number) => {
  //  console.log("repons code is :: When" + value);
  response = await ApiHelper.get(`${endpoints.USER_DETAILS}${value}`)
  console.log("Response of the project is :: " + JSON.stringify(response.data));

})

Then('user sees {int} response', (value: number) => {
  // console.log("repons code is :: When" + value);
  if (response.status === 200) {
    console.log('Success! Status is 200 OK.');
  } else {
    console.error(`Unexpected status: ${response.status}`);
  }
})

Then('response related to user should have id as {int}', async (value: number) => {
  // console.log("repons code is :: Then 2");
  if (response.data.id === 2) {
    console.log('✅ ID is correct: 2');
    console.log("user email id is :: ", response.data.email)
  } else {
    console.error(`Unexpected status: ${response.status}`);
  }
})

When('the response status code should be {int}', async (int: number) => {
  console.log("repons code is :: When");

})

Then('the response body should contain {string}', async (s: string) => {
  /* console.log("Response of the login is :: "+ await res.body());
  //let myMap = new Map<string, number>(res.headersArray());
  const token: string= res.headersArray()[2].value.split('; ')[0].split('=')[1];
  process.env.AccessToken = token;
  console.log("Headers are :: " +token);
  console.log("Token is :: " +process.env.AccessToken); */


})

Given('I send a POST request to the user endpoint with the following payload:', async () => {


  /*  res = await (await apiContext).post(process.env.API_Base_Url + endpoints.LOGIN_EP, {
     data: {
       email: process.env.EmailID,
       password: process.env.Password
     },
     headers: {
       "Content-Type": "application/json"
     } 
   });*/





})

