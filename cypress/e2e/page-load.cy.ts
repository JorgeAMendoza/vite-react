/// <reference types="cypress" />

describe('Page load', () => {
  it('should load the page', () => {
    cy.visit('/')
  })
})
