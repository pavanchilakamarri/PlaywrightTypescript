import * as nodemailer from 'nodemailer';
const fs = require("fs-extra");
import path = require("path")
import { log } from 'console';
import { getEnv } from '../env/env';


const reportPath = path.join('./cucumber-report/report/index.html');

async function sendEmail() {
    getEnv();
    log("REPORT :: " + reportPath)
  if (!fs.existsSync(reportPath)) {
    console.error('❌ Report file not found. :: ' + reportPath);
    return;
  }

  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT || '465'),
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"Test Reports" <${process.env.EMAIL_USER}>`,
    to: process.env.TO_EMAIL,
    subject: '✅ Playwright Test Report',
    html: '<p>Attached is the latest Playwright test report.</p>',
    attachments: [
      {
        filename: 'report.html',
        path: reportPath,
      },
    ],
  };

  try {
    console.info("SENDING EMAIL... ");
    const info = await transporter.sendMail(mailOptions);
    console.log('📧 Email sent:', info.messageId, info.email);
  } catch (error) {
    console.error('❌ Error sending email:', error);
  }
}

sendEmail();
