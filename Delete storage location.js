
import 'cypress-wait-until'; // add the import 
/// < reference types = "Cypress" />

describe('Login process', () => {
    beforeEach(() => {
      cy.intercept('GET', '**/api/me/').as('my-api')
      cy.intercept('GET', '**/api/order/dashboard/?period=year').as('ordersDashboard')
      cy.intercept('GET', '**/api/order/**').as('pageLoadOrders')
    })
  
    describe('User can log in to app', () => {
  
      it('login and open Dashboard', () => {
        cy.visit('https://demo.avisio.ai/login')
        
        cy.get('[name="email"]').type('malavika.kunuku@gmail.com')
        cy.get('[name="password"]').type('Interview2021')
        
        cy.get('button[type="primary"]')
          .should('exist')
          .click()

          cy.wait(['@my-api', '@ordersDashboard', '@pageLoadOrders'])
          cy.get('.MainLayout__PageContent h1')
           .should('exist')
           .and('contain', 'Dashboard')
        
         
        cy.get(':nth-child(5) > .sc-fKFyDc > .sc-bkzZxe > svg').click()  
        cy.get(':nth-child(3) > .sc-iwyYcG > .sc-kLgntA').click()    
             //click on storage locations

             cy.get('.sc-gGmIRh').should('contain.text','new')  
             cy.get('.sc-gGmIRh').then( $elems => {
                // using Lodash to invoke the callback N times
                Cypress._.times($elems.length, () => {
                  cy.get('.sc-gGmIRh:last').find(':nth-child(17) > :nth-child(1) > .jLSpZM > .sc-gsxnyZ > .sc-GTWni').click()
                    // ensure we wait for the element to be actually removed from DOM
                    //  before continuing
                    cy.get('.sc-bXDlPE > :nth-child(2) > .sc-iqHYGH').click()
                    cy.get('.eZsmOB').click()
                    .should('not.exist');
                    cy.log('Storage location is deleted ------')
                    
                    cy.get(':nth-child(8) > .sc-bkzZxe > .sc-iwyYcG > span')
                    .should('exist')
                    .click()
  
      }
      
      )
  
    })
    
  })
})
})