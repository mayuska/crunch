import { getGreeting } from '../support/app.po';

describe.skip('e2e', () => {
  beforeEach(() => cy.visit('/'));

  it('should display home message', () => {
    // Custom command example, see `../support/commands.ts` file
    cy.login('my-email@something.com', 'myPassword');

    // Function helper example, see `../support/app.po.ts` file
    getGreeting().contains(/Welcome/);
  });
});
