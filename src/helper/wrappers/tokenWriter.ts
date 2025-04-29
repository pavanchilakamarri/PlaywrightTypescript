import path = require("path");
import { error, log } from "console";
import axios from "axios";
import endpoints from "../APIConstants/endpoints";
const fs = require("fs-extra");

let token: string | null = null;

// Path to your .env file
const envFilePath = path.resolve(`src/helper/env/.env.${process.env.ENV}`);

export async function writeTokenToEnv() {
    let envContent = '';

    // Check if the .env file already exists
    if (fs.existsSync(envFilePath)) {
        log("ENV FILE EXIST...");
        envContent = fs.readFileSync(envFilePath, 'utf-8');

        // Remove old token if it exists
        envContent = envContent.replace(/^AccessToken=.*(\r?\n)?/gm, '');
    }

    // Add new token
    const newTokenLine = await getToken();
    log("getToken called...", newTokenLine);

    envContent += `AccessToken=${newTokenLine}`;

    // Write updated content to the .env file
    fs.writeFileSync(envFilePath, envContent, 'utf-8');

    console.log('✅ Token saved to .env file');
}


async function getToken(): Promise<string> {

    if (token) {
        console.log("INTO IF COND of getToken()");
        return token;
    }

    console.log('BASE URL IS :: ', process.env.API_Base_Url + endpoints.LOGIN_EP);
    console.log('PASSWORD IS :: ', process.env.API_EmailID + process.env.API_Password);
    // Replace with your actual login API
    const response = await axios.post(process.env.API_Base_Url + endpoints.LOGIN_EP, {
        username: process.env.API_EmailID,
        password: process.env.API_Password
    }, {
        headers: {
            'Content-Type': 'application/json'
        },

    });

    token = response.data.accessToken;
    return JSON.stringify(token);

}

export async function removeToken() {

    let envContent = '';
    if (fs.existsSync(envFilePath)) {
        log("ENV FILE EXIST...");
        envContent = fs.readFileSync(envFilePath, 'utf-8');

        // Remove old token if it exists
        envContent = envContent.replace(/^AccessToken=.*(\r?\n)?/gm, '');
        fs.writeFileSync(envFilePath, envContent, 'utf-8');

    } else {
        throw new error("File Not Found to delete the Access Token")
    }

}
