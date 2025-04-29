import { log } from "console";
import path = require("path");

const fs = require("fs-extra");

try {

    fs.ensureDir("cucumber-report");
    fs.emptyDir("cucumber-report");
    fs.ensureDir("reports");
    fs.emptyDir("reports");
    fs.ensureDir("run-meta/");
    fs.emptyDir("run-meta/");
    
} catch (error) {

    log("Folder not created.. " + error);
    
}