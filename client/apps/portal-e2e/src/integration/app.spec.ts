import { getGreeting } from '../support/app.po';

describe('portal', () => {
  beforeEach(() => cy.visit('/users'));

  it('should display app title in the toolbar', () => {
    getGreeting().contains('Portal');
  });
});
