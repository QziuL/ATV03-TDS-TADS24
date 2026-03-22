const request = require('supertest');
const app = require('../src/app');
const sequelize = require('../src/database/sequelize');

beforeAll(async () => {
    await sequelize.sync({ force: true });
});

afterAll(async () => {
    await sequelize.close();
});

test('POST /livros cria um livro', async () => {
    const res = await request(app).post('/livros').send({ titulo: 'Clean Code', autor: 'Martin Code'});
    expect(res.status).toBe(201);
    expect(res.body.titulo).toBe('Clean Code');
});

test('GET /livros retorna todos os livros', async () => {
    const res = await request(app).get('/livros')
    expect(res.status).toBe(200)
    expect(res.body).toBeInstanceOf(Array)
    expect(res.body.length).toBeGreaterThan(0);
})

test('GET:id /livros:id retorna um livro', async () => {
    const res = await request(app).get('/livros/1')
    expect(res.status).toBe(200)
    expect(res.body.id).toBe(1)
    expect(res.body.titulo).toBe("Clean Code")
})

test('PUT /livros:id atualiza um livro', async () => {
    const res = await request(app).put('/livros/1').send({ titulo: 'Clean Code 2 - Update', autor: 'Martin Code'});
    expect(res.status).toBe(200);
    expect(res.body.titulo).toBe('Clean Code 2 - Update');
});

test('DELETE /livros:id deleta um livro', async () => {
    const res = await request(app).delete('/livros/1');
    expect(res.status).toBe(204);
});
