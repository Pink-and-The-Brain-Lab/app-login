/// <reference types="cypress" />

import { CommonElements } from "cypress/support/elements/CommonElements";
import { ResetPasswordElements } from "cypress/support/elements/ResetPasswordElements";

const url = Cypress.config('baseUrl') || '';
const validEmail = 'email@mail.com';
const invalidEmail = 'error@mail.com';

describe('reset password page', () => {
  beforeEach(() => {
    window.localStorage.clear();
    cy.on('uncaught:exception', () => false);
    cy.visit(`${url}/reset-password`);
  });

  it('should back to login page', () => {
    cy.get(ResetPasswordElements.backToLoginButton).click();
    cy.get(CommonElements.h3Title).should('have.text', 'Welcome!');
  });

  it('shoud sent email to reset password and receive an error', () => {
    cy.get(ResetPasswordElements.inputEmail).type(invalidEmail);
    cy.get(ResetPasswordElements.sendCodeButton).click();
    cy.get(CommonElements.toastr).should('have.text', ' Invalid email ');
  });

  it('shoud sent email to reset password and redirect to validate code page', () => {
    cy.get(ResetPasswordElements.inputEmail).type(validEmail);
    cy.get(ResetPasswordElements.sendCodeButton).click();
    cy.get(CommonElements.h3Title).should('have.text', 'Please, check your email');
  });
});
