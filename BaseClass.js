const XLSX = require("xlsx");
const fs = require("fs");
const AllureReporter = require("@shelex/allure-reporter");

class Base {
  constructor() {
    this.allure = new AllureReporter();
  }

  // a) Invoke Chrome browser
  invokeBrowser() {
    cy.visit("https://www.example.com", {
      reporter: this.allure.cypressReporter(),
    });
  }

  // b) Read excel file which has username and password
  readExcel(fileName) {
    const workbook = XLSX.readFile(fileName);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });
    return data;
  }

  // c) Read config.properties file for env variables
  readConfig(fileName) {
    const config = fs.readFileSync(fileName, "utf-8");
    const lines = config.split("\n");
    let properties = {};
    lines.forEach((line) => {
      const parts = line.split("=");
      if (parts.length === 2) {
        properties[parts[0].trim()] = parts[1].trim();
      }
    });
    return properties;
  }

  // d) Add logs and listeners for each action performed
  addLogsAndListeners() {
    cy.log("Performing action...");
    cy.on("log:added", (attributes, log) => {
      if (attributes.name === "Performing action...") {
        this.allure.step(`Performing action: ${log.getMessage()}`, () => {});
      }
    });
  }

  // e) Generate allure reports after the test execution
  generateAllureReport() {
    this.allure.writeResults();
  }
}

module.exports = Base;
