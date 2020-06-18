describe('Landing Page', () => {
    it('Togles the hamburguer button', () => {
        cy.viewport('iphone-6')
        cy.visit('/')
        cy.get('#navbarMenu').should('not.have.css', 'display', 'block')
    })
})