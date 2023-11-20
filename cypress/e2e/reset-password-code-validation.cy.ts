/// <reference types="cypress" />

import { CommonElements } from "cypress/support/elements/CommonElements";
import { ResetPasswordCodeValidationElements } from "cypress/support/elements/ResetPasswordCodeValidationElements";

const url = Cypress.config('baseUrl') || '';
const validEmail = 'email@mail.com';

describe('reset password code validation page', () => {
  beforeEach(() => {
    window.localStorage.clear();
    cy.on('uncaught:exception', () => false);
    cy.visit(`${url}/reset-password/code-validation/${validEmail}`);
  });

  it('should back to reset validation page', () => {
    cy.get(CommonElements.buttonButton).click();
    cy.get(CommonElements.h3Title).should('have.text', 'Reset Password');
  });

  it('should send a token and return an error', () => {
    cy.get(ResetPasswordCodeValidationElements.input1).type('0');
    cy.get(ResetPasswordCodeValidationElements.input2).type('0');
    cy.get(ResetPasswordCodeValidationElements.input3).type('0');
    cy.get(ResetPasswordCodeValidationElements.input5).type('0');
    cy.get(ResetPasswordCodeValidationElements.input6).type('0');
    cy.get(ResetPasswordCodeValidationElements.input7).type('0');
    cy.get(CommonElements.submitButton).click();
    cy.get(CommonElements.toastr).should('have.text', ' Invalid code ');
  });

  it('should send a token and redirect to create new password page', () => {
    cy.get(ResetPasswordCodeValidationElements.input1).type('1');
    cy.get(ResetPasswordCodeValidationElements.input2).type('1');
    cy.get(ResetPasswordCodeValidationElements.input3).type('1');
    cy.get(ResetPasswordCodeValidationElements.input5).type('1');
    cy.get(ResetPasswordCodeValidationElements.input6).type('1');
    cy.get(ResetPasswordCodeValidationElements.input7).type('1');
    cy.get(CommonElements.submitButton).click();
    cy.get(CommonElements.h3Title).should('have.text', 'Reset Password');
  });
});
