class Utility {
    // Login function
    login(username, password) {
      cy.get("#username").type(username);
      cy.get("#password").type(password);
      cy.get("#loginButton").click();
    }
  }
  
  module.exports = Utility;
  