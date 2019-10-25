describe('workspace-project App', function() {
    it('should contain the word heroes', function() {
      cy.visit('/');
      cy.contains("Tour of Heroes");
    })
  });