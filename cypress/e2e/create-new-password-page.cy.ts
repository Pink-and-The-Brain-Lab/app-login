/// <reference types="cypress" />

import { CommonElements } from "cypress/support/elements/CommonElements";
import { NewPasswordElements } from "cypress/support/elements/NewPasswordElements";

const url = Cypress.config('baseUrl') || '';
const validEmail = 'email@mail.com';
const validPassword = 'abcd1234';
const invalidPassword = '1234abcd';

describe('create new password page', () => {
  beforeEach(() => {
    window.localStorage.clear();
    cy.on('uncaught:exception', () => false);
    cy.visit(`${url}/new-password/${validEmail}`);
  });

  it('should show passwords', () => {
    cy.get(NewPasswordElements.eyeIcon1).click();
    cy.get(NewPasswordElements.eyeIcon2).click();
    cy.get(NewPasswordElements.inputText1).should('exist');
    cy.get(NewPasswordElements.inputPassword1).should('not.exist');
    cy.get(NewPasswordElements.inputText2).should('exist');
    cy.get(NewPasswordElements.inputPassword2).should('not.exist');
  });

  it('should show and hide passwords', () => {
    cy.get(NewPasswordElements.eyeIcon1).click();
    cy.get(NewPasswordElements.eyeIcon2).click();
    cy.get(NewPasswordElements.eyeIcon1).click();
    cy.get(NewPasswordElements.eyeIcon2).click();
    cy.get(NewPasswordElements.inputText1).should('not.exist');
    cy.get(NewPasswordElements.inputPassword1).should('exist');
    cy.get(NewPasswordElements.inputText2).should('not.exist');
    cy.get(NewPasswordElements.inputPassword2).should('exist');
  });

  it('should set one password and keep reset password button disbled', () => {
    cy.get(NewPasswordElements.inputPassword1).type(validPassword);
    cy.get(CommonElements.submitButton).should('be.disabled');
  });

  it('should set diferent passwords and keep reset password button disbled', () => {
    cy.get(NewPasswordElements.inputPassword1).type(validPassword);
    cy.get(NewPasswordElements.inputPassword2).type(invalidPassword);
    cy.get(CommonElements.submitButton).should('be.disabled');
  });

  it('should send new password and recieve an error', () => {
    cy.get(NewPasswordElements.inputPassword1).type(invalidPassword);
    cy.get(NewPasswordElements.inputPassword2).type(invalidPassword);
    cy.get(NewPasswordElements.submitButton).click();
    cy.get(CommonElements.toastr).should('have.text', ' Invalid password ');
  });

  it('should send new password and redirect to password reseted page', () => {
    cy.get(NewPasswordElements.inputPassword1).type(validPassword);
    cy.get(NewPasswordElements.inputPassword2).type(validPassword);
    cy.get(NewPasswordElements.submitButton).click();
    cy.get(CommonElements.h3Title).should('have.text', 'Your password has been reset');
  });
});
