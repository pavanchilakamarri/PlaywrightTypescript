import { log } from "console";
import { getDurationInSeconds, readRunMeta } from "../email/custom-reporter";
import { getEnv } from "../../helper/env/env";
const fs = require("fs")
const pathReport = require('path');



export default class reports {

  public static generateReport() {

    getEnv();
    let browserName = process.argv[2];
    const metadata = readRunMeta(`./run-meta/${process.argv[2]}-run-meta.json`);
    let browser;
    log("BROESER is :: ", browserName)
    if (browserName == 'webkit')
      browser = 'safari';
    else
      browser = browserName;

    log("META DATA file location is :: ", metadata);
    log("Browser Name is :: ", browser);
    log("BROWSER VERSION is :: ", metadata.browserVersion)

    const os = require('node:os');
    const report = require('multiple-cucumber-html-reporter');
    const duration = getDurationInSeconds(metadata.startTime, metadata.endTime);
    log("DURATIONN is :: ", duration)
    //log("date is :: "+ START_TIME)
    if (!fs.existsSync(metadata)) {

      try {
        report.generate({
          jsonDir: `./reports/${browserName}/`,
          reportPath: `./reports/report/${browserName}/`,
          reportName: "The Playwright Project Report",
          pageTitle: "The Playwright",
          //saveCollectedJSON: true,
          displayDuration: true,
          openReportInBrowser: false,
          displayReportTime: true,
          metadata: {
            browser: {
              name: "browser",
              version: "metadata.browserVersion",
            },
            device: 'Desktop',
            platform: {
              name: mapOsIcon(os.type()),
              version: mapOs(os.type())

            },
          },
          customData: {
            title: "Run info",
            data: [
              { label: "Project", value: "The Playwright Project" },
              { label: "Release", value: "June Release" },
              { label: "Environment", value: metadata.env },
              { label: 'Execution Start Time', value: metadata.startTime },
              { label: "Execution End Time", value: metadata.endTime },
              { label: "Total Execution Time", value:  duration + " hh:mm:ss(format)" },
            ],
          },
        });
        console.log("REPORT GOT CREATED SUCCESSFULLY...")
      } catch(error){
        console.error('❌ Error during test report creation:', error);
      }
    } else {
      throw new Error(`Metadata file not found: ${metadata}`);
    }
  }


}


const mapOs = (os) => {
  if (os.startsWith('win')) {
    return 'windows';
  } else if (os.startsWith('osx')) {
    return 'osx';
  } else if (os.startsWith('linux')) {
    return 'linux';
  } else if (os.startsWith('ubuntu')) {
    return 'ubuntu';
  } else if (os.startsWith('android')) {
    return 'android';
  } else if (os.startsWith('ios')) {
    return 'ios';
  } else if (os.startsWith('Dar')) {
    return 'mac';
  }
};

const mapOsIcon = (os) => {
  if (os.startsWith('win')) {
    return 'windows';
  } else if (os.startsWith('osx')) {
    return 'osx';
  } else if (os.startsWith('linux')) {
    return 'linux';
  } else if (os.startsWith('ubuntu')) {
    return 'ubuntu';
  } else if (os.startsWith('android')) {
    return 'android';
  } else if (os.startsWith('ios')) {
    return 'ios';
  } else if (os.startsWith('Dar')) {
    return 'osx';
  }
};



reports.generateReport();

