describe("Appointments", () => {

  beforeEach(() => {
    // Reset DB
    cy.request('GET', '/api/debug/reset');
    // Default checks
    cy.visit('/');
    cy.contains('Monday');
  });

  it('should book an interview', () => {
    // Press add button
    cy.get('[alt="Add"]')
      .first()
      .click();

    // Type in student name
    cy.get('[data-testid="student-name-input"]')
      .type('Lydia Miller-Jones');

    // Select interviewer
    cy.get('[alt="Sylvia Palmer"]')
      .click();

    // Click Save button
    cy.contains('Save')
      .click();

    // Renders the interview with student and interviewer names
    cy.contains('.appointment__card--show', "Lydia Miller-Jones");
    cy.contains('.appointment__card--show', "Sylvia Palmer");
  });

  it('should edit an interview', () => {
    // Force click Edit button
    cy.get('[alt="Edit"]')
      .first()
      .click({ force: true });

    // Select new interviewer
    cy.get('[alt="Tori Malcolm"]').click();
    // Clear input and type new  student name
    cy.get('[data-testid="student-name-input"]').clear().type("Lydia Miller-Jones");

    // Save changes
    cy.contains('Save').click();

    // Renders the interview with new student and interviewer names
    cy.contains('.appointment__card--show', "Lydia Miller-Jones");
    cy.contains('.appointment__card--show', "Tori Malcolm");
  });

  it('should cancel an interview', () => {
    // Force click Delete button
    cy.get('[alt="Delete"]')
      .click({ force: true });

    // Click confirm button
    cy.contains('Confirm').click()
    // Shows deleting indicator
    cy.contains('Deleting');
    // Deleting indicator disappeared 
    cy.contains('Deleting').should('not.exist');
    // Student's name disappeared
    cy.contains('.appointment__card--show', "Archie Cohen").should('not.exist')
  });
});