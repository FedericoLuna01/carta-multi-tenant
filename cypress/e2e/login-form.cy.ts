describe('template spec', () => {
  beforeEach(() => {
    cy.request('POST', '/api/auth/login', { email: 'correo@carta.com', password: '12345' })
      .its('body')
      .as('currentUser')
  })
  it('sets auth cookie when logging in via form submission', function () {
    cy.visit('/login')
    cy.get('input[name="email"]')
      .type('correo@carta.com')
      .should('have.value', 'correo@carta.com')

    cy.get('input[name="password"]').type('12345')
    cy.get('[type="submit"]').click()
    cy.url().should('include', '/admin')
    cy.getCookie('auth').should('exist')
  })
})