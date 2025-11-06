Cypress.Commands.add('login', (email, password) => {
    cy.get('[data-test="username"]').clear().type(email);
    cy.get('[data-test="password"]').clear().type(password);
    cy.get('[data-test="submit"]').click();
  });
  
  Cypress.Commands.add('logout', () => {
    cy.get('span.material-icons-outlined')
    .contains('keyboard_arrow_down')
    .click({ force: true });

    cy.get('span.p-menuitem-text', { timeout: 5000 })
    .contains('Sair')
    .click({ force: true });
  });
  
  Cypress.Commands.add('verificarMensagem', (mensagem) => {
    cy.contains(mensagem, { timeout: 5000 }).should('be.visible');
  });
  