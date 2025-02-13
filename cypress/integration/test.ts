["ie11", "esm", "umd"].forEach(file => {
  describe(file.toLocaleUpperCase(), () => {
    before(() => {
      cy.setup(`./example/${file}.html`);
      cy.wait(1000);
    });

    beforeEach(() => {
      cy.get("#line_1").clear();
      cy.get("#line_2").clear();
      cy.get("#post_town").clear();
      cy.get("#postcode").clear();
    });

    describe("Lookup", () => {
      it("select", () => {
        cy.get(".idpc-input").clear().type("SW15 2BF");
        cy.get(".idpc-button").click({force: true});
        cy.wait(1000);
        cy.get(".idpc-select").select("2");
        cy.wait(1000);
        cy.get("#line_1").should('have.value', 'L L Consultancy Ltd');
        cy.get("#line_2").should('have.value', '2 Stamford Square');
        cy.get("#post_town").should('have.value', 'London');
        cy.get("#postcode").should('have.value', 'SW15 2BF');
        cy.wait(1000);
      });
    });
  });
});
