describe('Logout button', () => {
  it('should logout the user', () => {
    const email = 'correo@carta.com'
    const password = '12345'
    cy.visit('/login')
    cy.get('input[name="email"]')
      .type(email)
      .should('have.value', email)
    cy.get('input[name="password"]').type(password)
    cy.get('[type="submit"]').click()
    cy.url().should('include', '/admin')
    cy.getCookie('auth').should('exist')
    cy.get('[data-test="logout-button"]').click()
    cy.url().should('include', '/')
    cy.getCookie('auth').should('not.exist')
  })
})