const { Given, When , Then } = require('@cucumber/cucumber');
const { LoginPage } = require('../../page-objects/login-page');

Given('I am on the login screen', async function() {
  const loginPage = new LoginPage(this.page); 
  await loginPage.navigateToLoginScreen(this.BASE_URL);
  await loginPage.verifyLoginPageIsDisplayed();
});

When('I fill the login form with username {string} and password {string}', 
  async function(username, password) { 
  const loginPage = new LoginPage(this.page);
  await loginPage.fillLoginForm(username, password);
}); 

When('I click on submit button', async function() {
  const loginPage = new LoginPage(this.page);
  await loginPage.clickSubmitButton();
});

Then('I should be able to see the home screen', async function() {
  const loginPage = new LoginPage(this.page);
  await loginPage.verifySuccesfulLogin();
}); 

Then('I should see error {string}', async function(errorMsg) {
  const loginPage = new LoginPage(this.page);
  await loginPage.verifyErrorMsg(errorMsg);
}); 




  

  
  