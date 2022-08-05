describe("create a quiz", () => {
  it("should add a quiz with approved 0", () => {
    cy.visit("http://localhost:3000/create");

    cy.get("[data-cy=question-input]").type("What is 9+10?")
    cy.get("[data-cy=category-input]").select("General Knowledge")
    cy.get("[data-cy=difficulty-input]").select("easy")
    cy.get("[data-cy=correct_answer-input]").type("19")
    cy.get("[data-cy=false_answer_1-input]").type("25")
    cy.get("[data-cy=false_answer_2-input]").type("23")
    cy.get("[data-cy=false_answer_3-input]").type("1238")
    cy.get("[data-cy=submit-create_quiz").click();

    cy.get("[data-cy=quiz_question]").last().contains("What is 9-10?")



  })
})