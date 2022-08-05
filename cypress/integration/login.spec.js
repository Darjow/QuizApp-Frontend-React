describe("Login failing", () => {
  it("should return username error message", () => {
    cy.visit("http://localhost:3000/login");
    
    cy.intercept("POST", "http://localhost:9000/api/users/*").as("login")

    cy.get("[data-cy=username-input]").type("dario is admin")
    cy.get("[data-cy=password-input]").type("testertest")
    cy.get("[data-cy=submit-login]").click()

    cy.wait("@login")

    cy.get("@login").should(({response}) => {
      expect(response.body.code).to.be.eq("WRONG_CREDENTIALS")
      expect(response.body.message).to.be.eq('Username does not exist.');
    })
  })
  it("should return wrong password message", () => {  
    cy.visit("http://localhost:3000/login");
    
    cy.intercept("POST", "http://localhost:9000/api/users/*").as("login")

    cy.get("[data-cy=username-input]").type("dario admin")
    cy.get("[data-cy=password-input]").type("passwordkjmjlkj")
    cy.get("[data-cy=submit-login]").click()

    cy.wait("@login")

    cy.get("@login").should(({response}) => {
      expect(response.body.code).to.be.eq("WRONG_CREDENTIALS")
      expect(response.body.message).to.be.eq('Password is not valid.');
    })
  })
})
