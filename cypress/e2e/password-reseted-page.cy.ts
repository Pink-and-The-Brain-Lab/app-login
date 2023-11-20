/// <reference types="cypress" />

import { CommonElements } from "cypress/support/elements/CommonElements";

const url = Cypress.config('baseUrl') || '';

describe('passwrod reseted page', () => {
  beforeEach(() => {
    window.localStorage.clear();
    cy.on('uncaught:exception', () => false);
    cy.visit(`${url}/password-reseted`);
  });

  it('should redirect to login', () => {
    cy.get(CommonElements.buttonButton).click();
    cy.get(CommonElements.h3Title).should('have.text', 'Welcome!');
  });
});
