import { LaunchOptions, chromium, firefox, webkit } from "playwright/test";

const options: LaunchOptions = {
    headless: true
}

export const invokeBrowser = () => {

    const browserType = process.env.BROWSER;

    switch (browserType.toLowerCase()) {

        case "chrome":
            return chromium.launch(options);
        case "firefox":
            return firefox.launch(options);
        case "webkit":
            return webkit.launch(options);
        default:
            throw new Error("Please provide browser for execution");
    }


}
