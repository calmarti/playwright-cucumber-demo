const playwright = require('playwright');
const { BeforeAll, Before, After, AfterAll , Status } = require('@cucumber/cucumber');
const cucumber = require('../cucumber');

// Launch options.
const options = {
  headless: false,
  slowMo: 100
};

let browser;

// Create a browser engine for the entire test suite
BeforeAll(async function () {
  console.log('before all ...');
  browser = await playwright['chromium'].launch(options);
});

AfterAll(async function () {
  console.log('after all ...');
  await browser.close();
});

// Create a fresh browser context and page for each test
Before(async function () {
  console.log('before ...');
  this.context = await browser.newContext();
  this.page = await this.context.newPage();
});

// Close the page and context after each test
After(async function () {
  console.log('after pass...');
  await this.page.close();
  await this.context.close();
});


/* After(async function (scenario) {
  if (scenario.result.status === Status.FAILED) {
    var buffer = await global.page.screenshot({ path: `reports/${scenario.pickle.name}.png`, fullPage: true })
    this.attach(buffer, 'image/png');
  }
}); */