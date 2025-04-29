import { log } from 'console';
import { google } from 'googleapis';
const fs = require("fs-extra");
const path = require('path');
require('dotenv').config({ override: true })

const SCOPES = ['https://www.googleapis.com/auth/drive'];

//async function uploadFileToDrive(filePath: string, fileName: string): Promise<string | null> {
const auth = new google.auth.GoogleAuth({
  keyFile: "./service-account.json",
  scopes: SCOPES,
});

/* 
const drive = google.drive({ version: 'v3', auth });
const folderId = process.env.GDRIVE_FOLDER_ID!;
const reportFilePath = path.join('./cucumber-report/report/index.html');
log("PATH is :: ", reportFilePath);
if (!fs.existsSync(reportFilePath)) {
  console.error('HTML report not found.');
  return null;
}

const fileMetadata = {
  name: `Test_Report_${new Date().toISOString().replace(/[:.]/g, '-')}.html`,
  parents: [folderId],
};

const media = {
  mimeType: 'text/html',
  body: fs.createReadStream(reportFilePath),
};

const response = await drive.files.create({
  requestBody: fileMetadata,
  media: media,
  fields: 'id, webViewLink',
}); */

export async function uploadFileToDrive(filePath: string, fileName: string): Promise<string | null> {
  const drive = google.drive({ version: 'v3', auth });

  const fileMetadata = {
    name: fileName,
  };

  const media = {
    mimeType: 'text/html',
    body: fs.createReadStream(filePath),
  };

  const res = await drive.files.create({
    requestBody: fileMetadata,
    media: media,
    fields: 'id',
  });

  const fileId = res.data.id;
  if (!fileId) return null;

  // Make the file public
  await drive.permissions.create({
    fileId,
    requestBody: {
      role: 'reader',
      type: 'anyone',
    },
  });

  const fileLink = `https://drive.google.com/uc?id=${fileId}&export=download`;
  console.log('✅ File uploaded:', fileLink);

  return fileLink;
}


// Example usage



