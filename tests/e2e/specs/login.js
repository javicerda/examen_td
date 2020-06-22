describe('login', () => {
it('Redirecciona al home si el login es exitoso', () => {
    cy.visit('http://localhost:8080/login')
    cy.get('#email').type('javicerda.z@gmail.com')
    cy.get('#password').type('test2020')
    cy.get('.button.is-primary').click()
    cy.get('#navbarMenu').contains('Hola!')
})
})