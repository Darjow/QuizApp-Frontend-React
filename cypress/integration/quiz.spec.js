beforeEach(() => {
  cy.login("dario admin", "testertest")
});
describe("create a quiz", () => {
  describe("failed creating a quiz", () => {
    it("should display errors", () => {
      cy.visit("http://localhost:3000/create");


      cy.get("[data-cy=question-input]").type("Too small");
      cy.get("[data-cy=false_answer_1-input]").type("25");
      cy.get("[data-cy=false_answer_2-input]").type("25");

      cy.get("[data-cy=submit-create_quiz").click();

      
      cy.get("[data-cy=labelinput_error]").should("be.visible");
      cy.get("[data-cy=labelinput_error]").eq(0).contains("The question is too small")
      cy.get("[data-cy=labelinput_error]").eq(1).contains("Required")
      cy.get("[data-cy=labelinput_error]").eq(2).contains("Required")
      cy.get("[data-cy=labelinput_error]").eq(3).contains("Required")
      cy.get("[data-cy=labelinput_error]").eq(4).contains("False answers cannot be the same")
    })
  })

  describe("succesfully created a quiz", () => {
    it("should succesfully create a quiz", () => {
  
      cy.visit("http://localhost:3000/create");
      
      cy.intercept("POST","http://localhost:9000/api/quiz").as("create")
  
      cy.get("[data-cy=question-input]").type("What is 9+10?");
      cy.get("[data-cy=category-input]").select("General Knowledge");
      cy.get("[data-cy=difficulty-input]").select("easy");
      cy.get("[data-cy=correct_answer-input]").type("19");
      cy.get("[data-cy=false_answer_1-input]").type("25");
      cy.get("[data-cy=false_answer_2-input]").type("23");
      cy.get("[data-cy=false_answer_3-input]").type("1238");
      cy.get("[data-cy=submit-create_quiz").click();
      
      cy.wait("@create")
      cy.get("@create").should(({response}) => {
        expect(response.statusCode).to.eq(201)
      })
    });
  })
  describe("added to approve quizes", () => {
    it("should be displayed at approve quizes page", () => {

      cy.visit("http://localhost:3000/quizes/approve")

      cy.get("[data-cy=quiz_question]").eq(-1).contains("What is 9+10?")

    })
  })
})

describe("admin methods", () => {
  describe("approve quiz", () => {
    it("should return a statuscode 200", () => {

      cy.visit("http://localhost:3000/quizes/approve");
      cy.intercept("POST", "http://localhost:9000/api/quiz/admin/*").as("approve")
  
      cy.get("[data-cy=submit_approve_quiz]").eq(-1).click();
  
  
      cy.wait("@approve")
      
      cy.get("@approve").should(({response}) => {
        expect(response.statusCode).to.eq(200);
        expect(response.body[0]).to.be.a("Object").and.to.have.keys([ 'approved', 'author', 'category', 'correct_answer', 'difficulty', 'id', 'incorrect_answers', 'question' ])
        expect(response.body[0]).to.deep.include({approved:1})
      })      
    })
  })

    describe("deny quiz", () => {
      it("should return a 204", () => {
        cy.visit("http://localhost:3000/quizes/approve");
        cy.intercept("DELETE", "http://localhost:9000/api/quiz/*").as("deny")
    
        cy.get("[data-cy=submit_deny_quiz]").eq(-1).click();
    
    
        cy.wait("@deny")
        
        cy.get("@deny").should(({response}) => {
          expect(response.statusCode).to.eq(204);
        })  
      })
    })
  })

