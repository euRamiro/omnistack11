const req = require("supertest");
const app = require("../../src/app");
const connection = require("../../src/database/connection");

describe("ONG", () => {
  //executa antes de cada test
  beforeEach(async () => {
    //roda as migrations no database de test
    await connection.migrate.rollback();
    await connection.migrate.latest();
  });

  afterAll(async () => {
    await connection.destroy();
  });

  it("deve cadastrar nova ONG", async () => {
    const res = await req(app)
      .post("/ongs")
      .send({
        name: "ONG MS",
        email: "ongms@ongms.com.br",
        whatsApp: "67999769237",
        city: "Campo Grande",
        uf: "MS"
      });
    expect(res.body).toHaveProperty("id");
    expect(res.body.id).toHaveLength(8);
  });
});
