describe('When: I use the reading list feature', () => {
  beforeEach(() => {
    cy.startAt('/');
  });

  it('Then: I should see my reading list', () => {
    cy.get('[data-testing="toggle-reading-list"]').click();

    cy.get('[data-testing="reading-list-container"]').should(
      'contain.text',
      'My Reading List'
    );
  });
});

describe('When I undo book addition to my reading list', () => {

  it('Then: I should not see anything in my reading list', () => {
    cy.get('[data-testing="reading-list-container"]').should('be.empty');
  });
  
});

describe('When I undo book removal to my reading list', () => {

  it('Then: I should see my reading list', () => {
    cy.get('[data-testing="reading-list-container"]').should('contain.text');
  })
  
});

describe('When I mark a book as read', () => {
  it('Then: finished date should appear', () => {
    cy.get('[data-testing="finished-date"]').should('be.visible');
  })
});