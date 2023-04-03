describe("template spec", () => {
  it("passes", () => {
    cy.visit("http://localhost:3000/");
    cy.get("p").contains("Is empty, please create a contact.");

    cy.get("button").contains("Add Phone").click();
    cy.url().should("contains", "/new");

    cy.get("button").should("be.disabled");
    cy.get('input[placeholder="First name"]').type("This is a text");
    cy.get('input[placeholder="Last name"]').type("This is a second text");
    cy.get('input[placeholder="Number"]').type("31222311232312");

    cy.get("button").should("be.enabled");
    cy.get("button").click();

    cy.get("h1").contains("This is a text").click();
    cy.get('input[placeholder="First name"]').invoke("val", "");
    cy.get('input[placeholder="First name"]').type("This is a edit text");
    cy.get('input[placeholder="Number"]').should(
      "have.value",
      "31222311232312"
    );

    cy.get("button").should("be.enabled");
    cy.get("button").click();

    cy.get("h1").contains("This is a edit text");
    cy.get("button").contains("Delete").click();

    cy.on('window:confirm', () => true);
    cy.get("p").contains("Is empty, please create a contact.");
  });
});
