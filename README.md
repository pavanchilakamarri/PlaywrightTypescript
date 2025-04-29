<b><h2>Introduction:</b></h2>

This Test Automation Framework is created using Playwright + Typescript + Cucumber + POM. Which can be used across different web/api based applications. In this approach, the endeavor is to build a lot of applications independent reusable components so that they can directly used for another web application/modules without spending any extra effort.


<h3>Prerequisites:</h3>

Visual studio</br>
Maven</br>
Cucumber</br>
Git</br></br>

Run below command to get all the dependencies related to Playwright Typescript.

    npx ct-test-automation 
    or
    npx playwright install

<br><h2>Configuring Cucumber to Visual Studio </h2>

<h3>Installing cucumber plugin</h3>

go to --> Extension --> search for cucumber --> install cucumber plugin<b>(Please find below video for reference)</b> <br>

Run below command<br>
npm i @cucumber/cucumber -D <br>

Now add below paths in cucumber settings

click on manage(right side bottom) --> click settings --> search for cucumber --> click on edit in settings.json<b>(Please find below video for reference)</b>

<b>cucumber.json file</b> is where we do the cucumber configurations.<br><br>
<ul>
<li><b>default</b> is used for Web automation related configuration<br>
<li><b>api</b> is used for API automation related configuration<br>
<li><b>rerun</b> is used for rerunning failed test cases<br>
</ul>


<h3>Report:</h3>
We are using <b><i>Multiple Cucumber HTML Reporter</i></b> as part of this framework<br><br>

Multiple Cucumber HTML Reporter is a reporting module for Cucumber to parse the JSON output to a beautiful report. The difference between all the other reporting modules on the market is that this module has:

1. a quick overview of all tested features and scenarios
2. a features overview that can hold multiple runs of the same feature / runs of the same feature on different browsers / devices
3. a features overview that can be searched / filtered / sorted
4. a feature(s) overview with metadata of the used browser(s) / devices</br></br>

Run below command for installing Multiple Cucumber HTML Reporter:(If NEEDED)</br>
Save to dependencies or dev-dependencies:

    npm install multiple-cucumber-html-reporter --save-dev

<h4>Steps to create report:</h4>
1. add the dependencies in package.json</br>
2. create report.ts file under helper class</br>
3. create a cucumber-report folder</br></br>

<b>init.ts file:</b> <br>

    This file is for creating the Cucumber-report folder dynamically(if folder is not created before) through program to store the results:

1. Add below dependency to the devDependencies(if needed)</br>
        npm i fs-extra -D // this will get added to devDependencies</br>

2. in package.json file, added init.ts file as pre-requiste so whenever the test cases execution ran this script will automatically get executed.

<b>Environment setup:</b></br>
dotenv<br>
cross-env is for executing scripts in different machines


<b>LOGGER:</b></br>
    installed below dependency<br>
    npm i winston -D


<h1> ✨ Google Drive Integration with Playwright + TypeScript + Cucumber + POM </h1>

This guide helps you upload your test execution report to Google Drive and email the shareable link using Nodemailer in a Playwright + TypeScript + Cucumber + Page Object Model (POM) project.

✅ 1. Enable Google Drive API
       
        * Go to Google Cloud Console.

        * Create a new project (or select an existing one).

        * In the left sidebar, go to APIs & Services → Library.

        * Search for Google Drive API and click Enable.

✅ 2. Create a Service Account

        * Navigate to APIs & Services → Credentials.

        * Click Create Credentials → Service Account.

        * Provide a name and description.

        * Click Create and Continue (you can skip granting roles for basic access).

        * Once the account is created, go to the Keys tab.

        * Click Add Key → Create new key → JSON.

        * Download the JSON file — this is your service account credentials.

✅ 3. Share a Drive Folder with Service Account

        * Go to Google Drive.

        * Create a folder (e.g., AutomationReports).

        * Right-click the folder → Share.

        * Share it with the client_email from the service account JSON (e.g., your-service-name@your-project-id.iam.gserviceaccount.com).

        * Give Editor access.

        * Under General Access --> choose Anyone with the link option and save it

✅ 4. Add JSON Key to Your Framework

        * Place the downloaded .json key in a and store in below path: ./service-account.json


