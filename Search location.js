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
         
         cy.get(':nth-child(5) > .sc-fKFyDc > .sc-bkzZxe > svg').click()  
         cy.get(':nth-child(3) > .sc-iwyYcG > .sc-kLgntA').click()    
              //click on storage locations
         


         cy.get('#table-search').type('Default')
             .should('exist')

             cy.get(':nth-child(8) > .sc-bkzZxe > .sc-iwyYcG > span')
             .should('exist')
             .click()
         
    }
    
    )

  })
  
})