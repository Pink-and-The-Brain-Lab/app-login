/// <reference types="cypress" />

import { CommonElements } from "cypress/support/elements/CommonElements";
import { LoginPasswordElements } from "cypress/support/elements/LoginPasswordElements";
import { ResetPasswordElements } from "cypress/support/elements/ResetPasswordElements";

const url = Cypress.config('baseUrl') || '';
const validEmail = 'email@mail.com';

describe('login page, set password', () => {
  beforeEach(() => {
    window.localStorage.clear();
    cy.on('uncaught:exception', () => false);
    cy.visit(`${url}/password/${validEmail}`);
  });

  it('should redirect to signup page', () => {
    cy.get(LoginPasswordElements.signupButton).click();
    cy.get(CommonElements.h3Title).should('have.text', 'Sign up Millez')
  });

  it('should redirect to reset password page', () => {
    cy.get(LoginPasswordElements.forgotPassword).click();
    cy.get(ResetPasswordElements.resetPasswordPageTitle).should('have.text', 'Reset Password');
  });

  it('should show password', () => {
    cy.get(LoginPasswordElements.eyeButton).click();
    cy.get(LoginPasswordElements.textInput).should('exist');
  });

  it('should show and hidden password', () => {
    cy.get(LoginPasswordElements.eyeButton).click();
    cy.get(LoginPasswordElements.eyeButton).click();
    cy.get(LoginPasswordElements.passwordInput).should('exist');
  });
});
