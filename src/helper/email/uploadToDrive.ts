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



