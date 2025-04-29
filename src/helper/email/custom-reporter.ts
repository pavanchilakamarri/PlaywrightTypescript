import { log } from "console";
import { getEnv } from "../env/env";

const fs = require('fs');
const path = require('path');

export interface ReportStats {
  totalFeatures: number;
  totalScenarios: number;
  passedScenarios: number;
  failedScenarios: number;
  skippedScenarios: number;
  executionStartTime: string;
  executionEndTime: string;
  duration: string
}


export function extractStats() {

  getEnv()

  const metaFiles:string[] = getMetaFiles(process.argv[2]);
  metaFiles.forEach(file => {


    console.log("PATH IS :::::::::: " + file);
    const metadata = readRunMeta(file);
    const reportPath = path.join(`./reports/${metadata.browser}/cucumber-report.json`);

    if (!fs.existsSync(reportPath)) {
      console.error('❌ cucumber-report.json or meta.json not found.', reportPath);
      process.exit(1);
    }


    const reportData = JSON.parse(fs.readFileSync(reportPath, 'utf-8'));

    let totalFeatures = 0;
    let totalScenarios = 0;
    let passedScenarios = 0;
    let failedScenarios = 0;
    let skippedScenarios = 0;
    let executionStartTime = metadata.startTime;
    let executionEndTime = metadata.endTime;
    let duration = getDurationInSeconds(executionStartTime, executionEndTime);

    reportData.forEach((feature: any) => {
      totalFeatures++;

      const scenarios = feature.elements || [];

      scenarios.forEach((scenario: any) => {
        totalScenarios++;

        const steps = scenario.steps || [];
        const hasFailed = steps.some((step: any) => step.result?.status === 'failed');
        const hasSkipped = steps.every((step: any) => step.result?.status === 'skipped');

        if (hasFailed) {
          failedScenarios++;
        } else if (hasSkipped) {
          skippedScenarios++;
        } else {
          passedScenarios++;
        }
      });
      log(`📊 Test Execution Summary`);
      log(`----------------------------`);
      log(`Features:                  ${totalFeatures}`);
      log(`Scenarios Total:           ${totalScenarios}`);
      log(`✅ Passed:                 ${passedScenarios}`);
      log(`❌ Failed:                 ${failedScenarios}`);
      log(`⚠️ Skipped:                 ${skippedScenarios}`);
      log(`Execution start time:      ${executionStartTime}`);
      log(`Execution end time:        ${executionEndTime}`);
      log(`Total Duration:            ${duration}`);
    });

    const data = JSON.parse(fs.readFileSync(file, 'utf-8'));
    data.totalFeatures = totalFeatures;
    data.totalScenarios = totalScenarios;
    data.passedScenarios = passedScenarios;
    data.failedScenarios = failedScenarios;
    data.skippedScenarios = skippedScenarios;
    fs.writeFileSync(file, JSON.stringify(data, null, 2));

    //return { totalFeatures, totalScenarios, passedScenarios, failedScenarios, skippedScenarios, executionStartTime, executionEndTime, duration };

  });
}

export function getDurationInSeconds(startISO: string, endISO: string): string {
  const start = new Date(startISO);
  const end = new Date(endISO);

  const diffMs = end.getTime() - start.getTime(); // milliseconds
  const totalSeconds = Math.floor(diffMs / 1000);

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const pad = (num: number) => String(num).padStart(2, '0');

  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

export const readRunMeta = (file: string) => {
 
  if (!fs.existsSync(file)) {
    throw new Error(`Metadata file not found: ${file}`);
  }

  const fileContent = fs.readFileSync(file, 'utf-8');
  return JSON.parse(fileContent);
};


const metaDir = './run-meta';

function getMetaFiles(browser: string): string[] {
  const files = fs.readdirSync(metaDir);

  if (browser === 'all') {
    log("CAME to IF for multiple files...")
    return files
      .filter(file => file.endsWith('-run-meta.json'))
      .map(file => path.join(metaDir, file));
  } else {
    const targetFile = `${browser}-run-meta.json`;
    const fullPath = path.join(metaDir, targetFile);
    return fs.existsSync(fullPath) ? [fullPath] : [];
  }
}
