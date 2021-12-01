describe("Tickets", () => {

    beforeEach(() => cy.visit("https://bit.ly/2XSuwCW"));

    it("fills all the text input fields", () => {

        const firstName = "Everton"
        const lastName = "Silva"
        cy.get("#first-name").type(firstName);
        cy.get("#last-name").type(lastName);
        cy.get("#email").type("emailteste@gmail.com");
        cy.get("#requests").type("Vegatariano");
        cy.get("#signature").type(`${firstName} ${lastName}`)
    })

    it("select two tickets", () =>{
        cy.get("#ticket-quantity").select("2");
    })

    it("select 'vip' ticket tyoe", () => {
        cy.get("#vip").check();
    })

    it("select 'social media' checkbox", () =>{
        cy.get("#social-media").check();
    })


    it("select 'friend' and 'publication', then unckeck 'friend'", () =>{
        cy.get("#friend").check();
        cy.get("#publication").check();
        cy.get("#friend").uncheck();
    })

    it("has 'TICKETBOX' header's heading", () =>{
        cy.get("header h1").should("contain", "TICKETBOX" );
    });

    it("alerts on invalid email", () => {
        cy.get("#email").type("emailemailteste-gmail.com");

        cy.get("#email.invalid").should("exist");
    })

    it("alerts on invalid email", () => {
        cy.get("#email")
          .as("email")
          .type("emailteste-gmail.com");

        cy.get("#email.invalid").should("exist");

        cy.get("@email") // coloca o @ para identificar o apelido
          .clear()
          .type("emailteste@gmail.com");

        cy.get("#email.invalid").should("not.exist");
    });
    
    
    it("fills and reset the form", () =>{
        const firstName = "Everton";
        const lastName = "Silva";
        const fullName = `${firstName} ${lastName}`

        cy.get("#first-name").type(firstName);
        cy.get("#last-name").type(lastName);
        cy.get("#email").type("emailteste@gmail.com");
        cy.get("#ticket-quantity").select("2");
        cy.get("#vip").check();
        cy.get("#friend").check();
        cy.get("#requests").type("Suco natural e sushi");

        cy.get(".agreement p").should("contain", `I, ${fullName}, wish to buy 2 VIP tickets.`);

        cy.get("#agree").click();
        cy.get("#signature").type(fullName);

        cy.get("button[type='submit']")
          .as("submitButton")
          .should("not.be.disabled");

        cy.get("button[type='reset']").click();

        cy.get("@submitButton").should("be.disabled");
    });


    it("fills mandatory fields using support command", () =>{
        const customer = {
            firstName: "Marcela",
            lastName: "Silva",
            email: "marcelasilva@exemplo.com"
        };

        cy.fillMandatoryFields(customer);

        cy.get("button[type='submit']")
          .as("submitButton")
          .should("not.be.disabled");

        cy.get("#agree").uncheck();

        cy.get("@submitButton").should("be.disabled");
    })
});