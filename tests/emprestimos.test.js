// const axios = require('axios');
const sequelize = require('../src/database/sequelize');
const request = require('supertest');
const app = require('../src/app');
require('dotenv').config();
const api = `http://localhost:${process.env.PORT || 3000}`;

// Altere para ids que existem no seu banco
var USUARIO;
var LIVRO;

beforeAll(async () => {
    await sequelize.sync({ force: true });
    USUARIO = await request(app).post('/usuarios').send({
        nome: "João Silva",
        email: `joao_${Date.now()}@email.com`,
        senha: "123456",
        tipo: "aluno",
      });
    LIVRO = await request(app).post('/livros').send({ titulo: 'Clean Code', autor: 'Martin Code'});
});

afterAll(async () => {
    await sequelize.close();
});

describe("Empréstimos", () => {
    test("deve registrar um novo empréstimo", async () => {
        console.log(LIVRO.body);
        console.log(USUARIO.body);
        const res = await request(app).post('/emprestimos').send({
            livro_id: LIVRO.body.id,
            usuario_id: USUARIO.body.id,
            data_devolucao_prevista: '2025-05-01',
        })
        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty("id");

        // await axios.delete(`${api}/emprestimos/${res.data.id}`);
    });

    // test("deve retornar uma lista de empréstimos", async () => {
    //     const res = await axios.get(`${api}/emprestimos`);
    //     expect(res.status).toBe(200);
    //     expect(Array.isArray(res.data)).toBe(true);
    // });

    // test("deve deletar um empréstimo", async () => {
    //     // criar o teste
    // });

    // test("deve retornar 404 ao deletar empréstimo inexistente", async () => {
    //     // criar o teste
    // });

    // test("deve retornar um empréstimo pelo id", async () => {
    //     // criar o teste
    // });
    
    // test("deve retornar 404 para empréstimo inexistente", async () => {
    //     // criar o teste
    // });

    // test("deve retornar 400 ao registrar empréstimo sem livro_id", async () => {
    //     try {
    //         await axios.post(`${api}/emprestimos`, {
    //             usuario_id: USUARIO_ID,
    //             data_devolucao_prevista: "2025-05-01",
    //         });
    //     } catch (err) {
    //         expect(err.response.status).toBe(400);
    //     }
    // });

    // test("deve retornar 400 ao registrar empréstimo sem usuario_id", async () => {
    //     // criar o teste
    // });

    // test("deve retornar 400 ao registrar empréstimo sem data de devolução", async () => {
    //     // criar o teste
    // });

    // test("deve registrar a devolução de um empréstimo", async () => {
    //     // criar o teste
    // });

    // test("deve retornar 404 ao devolver empréstimo inexistente", async () => {
    //     // criar o teste
    // });

    // test("deve listar empréstimos de um usuário específico", async () => {
    //     // criar o teste
    // });

    // test("deve retornar 400 ao emprestar livro já emprestado", async () => {
    //     // criar o teste
    // });
});