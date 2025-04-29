import path = require("path");
const fs = require("fs")

export const saveRunMeta = (
  browser: string,
  startTime: string,
  endTime: string,
  env: string,
  browserVersion: string
) => {
  const outputFolder = path.join('run-meta');
  if (!fs.existsSync(outputFolder)) {
    fs.mkdirSync(outputFolder);
  }

  const filePath = path.join(outputFolder, `${browser}-run-meta.json`);
  const runMeta = {
    browser,
    startTime,
    endTime,
    env,
    browserVersion
  };

  fs.writeFileSync(filePath, JSON.stringify(runMeta, null, 2));
  console.log(`✅ Metadata saved: ${filePath}`);
};
