export {};


declare global {
    namespace NodeJS {
        interface ProcessEnv {
            browser: "chrome" | "firefox" | "webkit";
            ENV: "dev" | "qa" | "staging" | "prod";
            Type: "Web" | "API";
            BaseUrl: string;
            EmailID: string;
            Password: string;
            Token: string;
            API_Base_Url: string;
            AccessToken: string;
            HEADLESS: string;
            START_TIME: string;
            END_TIME: string;
            EMAIL_HOST: string;
            EMAIL_PORT: string;
            EMAIL_USER: string;
            EMAIL_PASS: string;
            TO_EMAIL: string;
            SendEmail: string;
            Slack: string;
        }
    }
}