// run.ts
import { log } from "console";
import { sendEmail, sendSlackReportMessage } from "./sendEmail";
import { extractStats } from "./custom-reporter";
import { uploadFileToDrive } from "./uploadToDrive";
import { getEnv } from "../env/env";
const AdmZip = require('adm-zip');

(async () => {
    getEnv()
    const browser = process.argv[2];
    if (browser.toLowerCase() == 'all')
        zipFolder(`./reports/report/`, './cucumber-report/Cucumber-report.zip');
    else
        zipFolder(`./reports/report/${browser}/`, './cucumber-report/Cucumber-report.zip');

    const reportLink = await uploadFileToDrive('./cucumber-report/Cucumber-report.zip', 'TestReport.zip');
    const stats = extractStats();
    if (
        (process.env.SendEmail?.trim().toLowerCase() === 'true') ||
        (process.env.Slack?.trim().toLowerCase() === 'true')
    ) {
        if (reportLink) {
            if ((process.env.SendEmail).trim().toLowerCase() === 'true') {
                console.log("process.env.SendEmail", process.env.SendEmail)
                await sendEmail(reportLink);
            }
            if ((process.env.Slack).trim().toLowerCase() === 'true') {
                console.log("process.env.Slack", process.env.Slack)
                await sendSlackReportMessage(reportLink);
            }
        } else {
            log("report link", reportLink)
            console.error('Failed to upload report.');
        }
    } else {
        console.log("BOTH SEND EMAIL AND SEND SLACK MESSAGE ARE SET TO DISABLE...")
    }
})();

function zipFolder(folderPath: string, outputZipPath: string) {
    const zip = new AdmZip();
    zip.addLocalFolder(folderPath);
    zip.writeZip(outputZipPath);
    console.log('📦 Folder zipped:', outputZipPath);
}

