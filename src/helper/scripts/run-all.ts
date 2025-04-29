// src/scripts/run-all.ts
import { execSync } from 'child_process';

const browser = process.argv[2] || 'chrome'; // default browser
const steps = process.argv.slice(3); // additional steps (optional)

const stepMap: { [key: string]: string } = {
  aftertest: `npm run aftertest -- ${browser}`,
  summary: `npm run summary -- ${browser}`,
  report: `npm run send-report -- ${browser}`
};

// If no specific steps are passed, run all by default
const toRun = steps.length > 0 ? steps : ['aftertest', 'summary', 'report'];

try {
  console.log(`▶️ Running for browser: ${browser}`);
  toRun.forEach(step => {
    if (stepMap[step]) {
      console.log(`➡️ Running step: ${step}`);
      execSync(stepMap[step], { stdio: 'inherit' });
    } else {
      console.warn(`⚠️ Unknown step: ${step}`);
    }
  });
  console.log('✅ All selected steps completed.');
} catch (err) {
  console.error('❌ Error in running scripts:', err);
  process.exit(1);
}
