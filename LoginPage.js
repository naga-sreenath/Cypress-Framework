class LoginPage {
  static usernameLocator = 'input[name="username"]';
  static passwordLocator = 'input[name="password"]';
  static submitButtonLocator = 'button[type="submit"]';

  static enterUsername(username) {
    cy.get(LoginPage.usernameLocator).type(username);
  }

  static enterPassword(password) {
    cy.get(LoginPage.passwordLocator).type(password);
  }

  static submit() {
    cy.get(LoginPage.submitButtonLocator).click();
  }
}

export default LoginPage;
