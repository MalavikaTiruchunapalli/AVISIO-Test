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
      
      cy.get('.sc-fubCfw').click() 
      
      function generate_random_string(string_length) {
          let random_string = '';
          let random_ascii;
          for(let i = 0; i < string_length; i++) {
              random_ascii = Math.floor((Math.random() * 25) + 97);
              random_string += String.fromCharCode(random_ascii)
          }
          return random_string
      }

      var random_string = generate_random_string(8)

      cy.get('#name-der-lagerorte').type(random_string)
      cy.get('#lagerorte-beschreibung').type('new storage location') 
      
      cy.get('.BPfwr')
      .should('exist')
      .click()

      cy.get(':nth-child(8) > .sc-bkzZxe > .sc-iwyYcG > span')
    .should('exist')
    .click()

    }
    
    )

  })
  


})
