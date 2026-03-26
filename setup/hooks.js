const playwright = require('@playwright/test');
const { BeforeAll, Before, After, AfterAll , Status } = require('@cucumber/cucumber');

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


After(async function (scenario) {
    // 1. Check if the scenario actually failed
    if (scenario.result?.status === Status.FAILED) {        
        // 2. Take a screenshot of the failure
          const image = await this.page.screenshot({ 
            path: `./reports/screenshots/${scenario.pickle.name}.png`,
            fullPage: true 
        });
        // 3. ATTACH it to the Cucumber HTML report
        // This is the step that tells the HTML formatter: "Hey, this failed!"
        await this.attach(image, 'image/png');        
        console.log(`\n ❌ Scenario Failed: ${scenario.pickle.name} - Screenshot captured.`);
    }
  }); 

/* After(async function (scenario) {
  if (scenario.result.status === Status.FAILED) {
    var buffer = await global.page.screenshot({ path: `reports/${scenario.pickle.name}.png`, fullPage: true })
    this.attach(buffer, 'image/png');
  }
}); */