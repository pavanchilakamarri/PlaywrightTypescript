import { log } from "console";
import { getDurationInSeconds, readRunMeta } from "../email/custom-reporter";
import { getEnv } from "../../helper/env/env";
const fs = require("fs")
const pathReport = require('path');

export default class reports {

  public static generateReport() {

    getEnv();
    let browserName = process.argv[2];
    const metadata = readRunMeta(`./run-meta/API-run-meta.json`);
    const os = require('node:os');
    const report = require('multiple-cucumber-html-reporter');
    //log("date is :: "+ START_TIME)
    report.generate({
      jsonDir: `./reports/API/`,
      reportPath: `./reports/report/API/`,
      reportName: "The Playwright Typescript Project Report",
      pageTitle: "The Playwright",
      //saveCollectedJSON: true,s
      displayDuration: true,
      openReportInBrowser: false,
      displayReportTime: true,
      metadata: {
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
          { label: "Total Execution Time", value: getDurationInSeconds(metadata.startTime, metadata.endTime) + " hh:mm:ss(format)" },
        ],
      },
    });
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

