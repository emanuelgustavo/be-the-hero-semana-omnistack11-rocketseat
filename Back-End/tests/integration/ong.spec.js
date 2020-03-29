const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection.js');

describe('ONG', () => {
  beforeEach(async () => {
    await connection.migrate.rollback();
    await connection.migrate.latest();
  });
  it('Should be able to create a new ONG', async () => {
    const response = await request(app)
      .post('/ongs')
      .send({
        name: "APAD2",
        email: "contato@teste.com",
        whatsapp: "4799999999",
        city: "Rio do Sul",
        uf: "SC"
      });
    console.log(response.body);
    expect(response.body).toHaveProperty('id');
    expect(response.body.id).toHaveLength(8);
  });
  afterAll(async () => {
    await connection.destroy();
  });
});