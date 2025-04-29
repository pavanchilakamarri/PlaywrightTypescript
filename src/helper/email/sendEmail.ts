import * as nodemailer from 'nodemailer';
import { getEnv } from '../env/env';
import { log } from 'console';
import { ReportStats, getDurationInSeconds } from './custom-reporter';
import path = require('path');
import axios from 'axios';
import { WebClient } from '@slack/web-api';
const fs = require("fs")

const slackWebhookUrl = 'https://hooks.slack.com/services/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'; // your webhook

export async function sendEmail(reportLink: string) {
  getEnv();
  /*  log("REPORT :: ", process.env.EMAIL_HOST);
   log("REPORT :: ", process.env.EMAIL_PORT);
   log("REPORT :: ", process.env.EMAIL_USER);
   log("REPORT :: ", process.env.EMAIL_PASS);
   log("REPORT :: ", process.env.TO_EMAIL);
   log("REPORT :: ", reportLink); */

  const transporter = nodemailer.createTransport({
    service: "gmail",
    port: parseInt(process.env.EMAIL_PORT || '465'),
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"The Playwright Automation Reports" <${process.env.EMAIL_USER}>`,
    to: process.env.TO_EMAIL,
    subject: 'Test Automation Report',
    html: `
      <h2>📊 The Playwright Automation Execution Report Summary</h2>
      ${generateHTMLTable()}
      <p>📎 For complete test execution details, please click on below link which dowloads the test report</p>
      <a href="${reportLink}" target="_blank">⬇️ Download Test Report</a>
    `,
  };

  try {
    console.log("SENDING EMAIL... ");
    const info = await transporter.sendMail(mailOptions);
    console.log('📧 Email sent:', info.messageId, info.email);
  } catch (error) {
    console.error('❌ Error sending email:', error);
  }
}
let combinedMeta;

function getCombinedMetaData() {
  const metaDir = './run-meta';
  const metaFiles = fs.readdirSync(metaDir).filter(file => file.endsWith('-meta.json'));

  combinedMeta = metaFiles.map(file => {
    const filePath = path.join(metaDir, file);
    console.log("SEND MAIL", filePath);

    const content = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(content);
  });
}

function generateHTMLTable() {
  const headers = ['Browser', 'Environment', 'Features', 'Scenarios', 'Passed', 'Failed', 'Skipped', 'Execution Start Time', 'Execution End Time', 'Total Executions Time'];

  getCombinedMetaData();
  const metaData = combinedMeta;
  const rows = metaData.map(meta => `
      <tr>
        <td>${meta.browser}</td>
        <td>${meta.env}</td>
        <td>${meta.totalFeatures}</td>
        <td>${meta.totalScenarios}</td>
       <td>${meta.passedScenarios}</td>
        <td>${meta.failedScenarios}</td>
        <td>${meta.skippedScenarios}</td>
        <td>${meta.startTime}</td>
        <td>${meta.endTime}</td>
        <td>${getDurationInSeconds(meta.startTime, meta.endTime)}</td>
       
      </tr>`).join('');

  return `
      <table border="1" cellpadding="5" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px;">
        <thead style="background-color: #f2f2f2;">
          <tr>${headers.map(h => `<th>${h}</th>`).join('')}</tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>`;
}


export async function sendSlackReportMessage(reportLink: string) {
  const slackToken = process.env.SlackToken; //process.env.SLACK_BOT_TOKEN || 'xoxb-your-token-here';
  const channelId = process.env.SlackChannelId; // your channel ID

  const web = new WebClient(slackToken);

  try {
    /* const response = await axios.post(slackWebhookUrl, message);
    console.log('Slack message sent:', response.status); */
    const res = await web.chat.postMessage({
      channel: channelId,
      text: `The Playwright Automation Execution Report Summary`,
      blocks: [
        {
          type: 'header',
          text: {
            type: 'plain_text',
            text: '📊 The Playwright Automation Execution Report Summary',
            emoji: true
          }
        },
        {
          type: 'divider',
        },
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: generateSummaryTable(),
          }
        },
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `For complete test execution details please click on below link which dowloads the test report\n🔗 <${reportLink}|Download Test Report>`
          }
        },
        {
          type: 'divider',
        },
        {
          type: 'divider',
        },
        {
          type: 'context',
          elements: [
            {
              type: 'mrkdwn',
              text: '*Best regards,*\nC&T QA Team',
            },
          ],
        },
      ]
    });
  } catch (error) {
    console.error('Error sending message to Slack:', error);
  }
}

function generateSummaryTable(): string {
  const header = `Browser    Env   Features  Scenarios   Passed  Failed  Skipped  ExecTime\n--------   ----  --------  ----------  ------  ------  -------  --------`;

  getCombinedMetaData();
  const metaData = combinedMeta;
  const rows = metaData.map(meta => {
    return `${meta.browser.padEnd(11)}${meta.env.padEnd(6)}${String(meta.totalFeatures).padEnd(10)}${String(meta.totalScenarios).padEnd(12)}${String(meta.passedScenarios).padEnd(8)}${String(meta.failedScenarios).padEnd(8)}${String(meta.skippedScenarios).padEnd(9)}${getDurationInSeconds(meta.startTime, meta.endTime)}`;
  });

  return `\`\`\`\n${header}\n${rows.join('\n')}\n\`\`\``;
}
