const request = require('supertest');
const app = require('../src/app');
// const Livro  = require('../src/models/Livro');

// test('POST /livros cria um livro', async () => {
//     const res = await request(app).post('/livros').send({ titulo: 'Clean Code', autor: 'Martin Code'});
//     expect(res.status).toBe(201);
//     expect(res.body.titulo).toBe('Clean Code');
// });

// test('GET /livros retorna todos os livros', async () => {
//     const res = await request(app).get('/livros')
//     expect(res.status).toBe(200)
//     expect(res.body).toBeInstanceOf(Array)
//     expect(res.body.length).toBeGreaterThan(0);
// })

test('GET:id /livros:id retorna um livro', async () => {
    const res = await request(app).get('/livros/1')
    expect(res.status).toBe(200)
    expect(res.body.id).toBe(1)
    expect(res.body.titulo).toBe("Clean Code")

    // expect(await Livro.findByPk(res.body.id)).toBeInstanceOf(Livro) 
})
