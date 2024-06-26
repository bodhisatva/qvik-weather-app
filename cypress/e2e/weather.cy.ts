beforeEach(() => {
  cy.visit('http://localhost:3000', {
    onBeforeLoad({ navigator }) {
      cy.stub(navigator.geolocation, 'getCurrentPosition').callsFake((callback) => {
        return callback({ coords: { latitude: 60.1754572, longitude: 24.7808413 } })
      })
    }
  })
})

describe('Weather', () => {
  it('should have a user location and current temperature for the location', () => {
    cy.dataCy('current-location').should(($el) => {
      expect($el).to.contain.text('Espoo, FI')
    })
    cy.dataCy('current-temperature').should('be.visible')
    cy.dataCy('current-city').should('be.visible').and('contain.text', 'Espoo')
  })

  it('should not remove weather data when user clicks on search combo box', () => {
    cy.get("[type='text']").type('Muurame')
    cy.get('div[class*="option"]').first().click()

    cy.dataCy('current-temperature').should('be.visible')
    cy.dataCy('current-city').should('be.visible').and('contain.text', 'Muurame')

    cy.get("[type='text']").click()

    cy.dataCy('current-temperature').should('exist')
    cy.dataCy('current-city').should('exist')
  })
})
