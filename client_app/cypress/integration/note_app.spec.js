describe('Note App', () => {
  beforeEach(() => {
    cy.request('POST', 'http://localhost:3001/api/testing/reset');
    const user = {
      name: 'Clark Kent',
      username: 'ckent',
      password: 'superman',
    };

    cy.request('POST', 'http://localhost:3001/api/users', user);
    cy.visit('http://localhost:3000');
  });

  it('front page can be opened', () => {
    cy.contains('Notes');
    cy.contains('Note app 2021');
  });

  it('login form can be opened', () => {
    cy.get('#btn-login').click();
  });

  it('user can log in', () => {
    cy.get('#btn-login').click();
    cy.get('#username').type('ckent');
    cy.get('#password').type('superman');
    cy.get('#btn-login').click();
    cy.contains('ckent is logged in.');
  });

  describe('when logged in', () => {
    beforeEach(() => {
      cy.login({ username: 'ckent', password: 'superman' });
    });

    it('a new note can be created and made important', () => {
      cy.get('#input-new-note').type('This is a test note.');
      cy.contains('Save').click();
      cy.contains('This is a test note.');

      cy.contains('This is a test note.')
        .contains('make important')
        .click();

      cy.contains('This is a test note.')
        .contains('make not important');
    });
  });

  it('login fails with wrong password', () => {
    cy.get('#btn-login').click();
    cy.get('#username').type('ckent');
    cy.get('#password').type('batman');

    cy.get('.error')
      .should('contain', 'Wrong credentials.')
      .and('have.css', 'border-style', 'solid');

    cy.get('html').should('not.contain', 'ckent is logged in.');
  });
});
