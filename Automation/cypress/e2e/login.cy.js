/// <reference types="cypress" />

describe('Funcionalidade: Login', () => {
  let userData;
  const MSG_CREDENCIAIS_INVALIDAS = 'Acesso negado. Verifique as credenciais.';

  before(() => {
    cy.fixture('loginData').then((data) => {
      userData = data;
    });
  });

  beforeEach(() => {
    cy.visit('/login');
  });

  it('CT-LOGIN-001 - Login com credenciais válidas', () => {
    cy.login(userData.validUser.email, userData.validUser.password);

    cy.url({ timeout: 10000 }).should('include', '/home');
    cy.get('[data-test="navega-main-menu-hamburger"]').should('be.visible');
    cy.screenshot('CT-LOGIN-001');
  });

  it('CT-LOGIN-002 - Login com e-mail incorreto', () => {
    cy.login(userData.incorrectUser.email, userData.validUser.password);
    cy.verificarMensagem(MSG_CREDENCIAIS_INVALIDAS);
    cy.url().should('include', '/login');
    cy.screenshot('CT-LOGIN-002');
  });

  it('CT-LOGIN-003 - Login com senha incorreta', () => {
    cy.login(userData.validUser.email, userData.incorrectUser.password);
    cy.verificarMensagem(MSG_CREDENCIAIS_INVALIDAS);
    cy.url().should('include', '/login');
    cy.screenshot('CT-LOGIN-003');
  });

  it('CT-LOGIN-004 - Login com campos vazios', () => {
    cy.get('[data-test="username"]').clear();
    cy.get('[data-test="password"]').clear();
    cy.get('[data-test="submit"]').click();

    cy.get('[data-test="username"]')
      .should('have.class', 'ng-invalid')
      .and('not.have.class', 'ng-valid');

    cy.screenshot('CT-LOGIN-004');
  });

  it('CT-LOGIN-005 - Login com e-mail inválido (sem @)', () => {
    cy.login(userData.invalidUser.email, userData.validUser.password);
    cy.get('[data-test="username"]')
      .should('have.class', 'ng-invalid')
      .and('not.have.class', 'ng-valid');
    cy.screenshot('CT-LOGIN-005');
  });

  it('CT-LOGIN-006 - Logout do usuário logado', () => {
    cy.login(userData.validUser.email, userData.validUser.password);
    cy.logout();
    cy.url().should('include', '/login');
    cy.screenshot('CT-LOGIN-006');
  });
});
