/// <reference types="cypress" />

import { CommonElements } from "cypress/support/elements/CommonElements";
import { SignupElements } from "cypress/support/elements/SignupElements";

const url = Cypress.config('baseUrl') || '';
const validEmail = 'email@mail.com';
const invalidEmail = 'error@mail.com';
const validPassword = 'abcd1234';
const invalidPassword = '12345';

describe('signup page', () => {
  beforeEach(() => {
    window.localStorage.clear();
    cy.on('uncaught:exception', () => false);
    cy.visit(`${url}/sign-up`);
  });

  it('should redirect to login page', () => {
    cy.get(CommonElements.buttonButton).click();
    cy.get(CommonElements.h3Title).should('have.text', 'Welcome!');
  });

  it('should put an invalid email and keep continue button disabled', () => {
    cy.get(SignupElements.inputEmail).type('email');
    cy.get(SignupElements.inputFullname).type('Andre test');
    cy.get(SignupElements.inputPassword).type(validPassword);
    cy.get(SignupElements.inputConfirmPassword).type(validPassword);
    cy.get(CommonElements.submitButton).should('be.disabled');
  });

  it('should put only one password and keep continue button disabled', () => {
    cy.get(SignupElements.inputEmail).type(validEmail);
    cy.get(SignupElements.inputFullname).type('Andre test');
    cy.get(SignupElements.inputPassword).type(validPassword);
    cy.get(CommonElements.submitButton).should('be.disabled');
  });

  it('should put diferents passwords and keep continue button disabled', () => {
    cy.get(SignupElements.inputEmail).type(validEmail);
    cy.get(SignupElements.inputFullname).type('Andre test');
    cy.get(SignupElements.inputPassword).type(validPassword);
    cy.get(SignupElements.inputConfirmPassword).type(validEmail);
    cy.get(CommonElements.submitButton).should('be.disabled');
  });

  it('should put invalid passwords and keep continue button disabled', () => {
    cy.get(SignupElements.inputEmail).type(validEmail);
    cy.get(SignupElements.inputFullname).type('Andre test');
    cy.get(SignupElements.inputPassword).type(invalidPassword);
    cy.get(SignupElements.inputConfirmPassword).type(invalidPassword);
    cy.get(CommonElements.submitButton).should('be.disabled');
  });

  it('should show passwords', () => {
    cy.get(SignupElements.eyeIcon1).click();
    cy.get(SignupElements.eyeIcon2).click();
    cy.get(SignupElements.inputText1).should('exist');
    cy.get(SignupElements.inputText2).should('exist');
    cy.get(SignupElements.inputPassword).should('not.exist');
    cy.get(SignupElements.inputConfirmPassword).should('not.exist');
  });

  it('should show and hide passwords', () => {
    cy.get(SignupElements.eyeIcon1).click();
    cy.get(SignupElements.eyeIcon2).click();
    cy.get(SignupElements.eyeIcon1).click();
    cy.get(SignupElements.eyeIcon2).click();
    cy.get(SignupElements.inputText1).should('not.exist');
    cy.get(SignupElements.inputText2).should('not.exist');
    cy.get(SignupElements.inputPassword).should('exist');
    cy.get(SignupElements.inputConfirmPassword).should('exist');
  });

  it('should send dat and receive an error', () => {
    cy.get(SignupElements.inputEmail).type(invalidEmail);
    cy.get(SignupElements.inputFullname).type('Andre test');
    cy.get(SignupElements.inputPassword).type(validPassword);
    cy.get(SignupElements.inputConfirmPassword).type(validPassword);
    cy.get(SignupElements.submitButton).click();
    cy.get(CommonElements.toastr).should('have.text', ' User already exists ');
  });

  it('should send dat and redirect to validate email page', () => {
    cy.get(SignupElements.inputEmail).type(validEmail);
    cy.get(SignupElements.inputFullname).type('Andre test');
    cy.get(SignupElements.inputPassword).type(validPassword);
    cy.get(SignupElements.inputConfirmPassword).type(validPassword);
    cy.get(SignupElements.submitButton).click();
    cy.get(CommonElements.h3Title).should('have.text', 'Please, check your email');
  });
});
