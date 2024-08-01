import { cy } from 'cypress';
import BaseClass from '../BaseClass';
import UtilityClass from '../utilityClass';
import LoginPage from '../LoginPage';

describe('Login Test', () => {
  before(() => {
    BaseClass.readExcel();
  });

  it('Login Test', () => {
    cy.visit('https://example.com/login');
    UtilityClass.login(BaseClass.username, BaseClass.password);
    cy.contains('Welcome').should('be.visible');
  });

  after(() => {
    BaseClass.closeBrowser();
  });
});