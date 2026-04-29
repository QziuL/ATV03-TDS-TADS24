// const axios = require('axios');
// require('dotenv').config();
// const api = `http://localhost:${process.env.PORT || 3000}`;

const sequelize = require('../src/database/sequelize');
const request = require('supertest');
const app = require('../src/app');

var USUARIO;
var LIVRO;
var USUARIO_2;
var LIVRO_2;

beforeAll(async () => {
    await sequelize.sync({ force: true });
    USUARIO = await request(app).post('/usuarios').send({
        nome: "João Silva",
        email: `joao_${Date.now()}@email.com`,
        senha: "123456",
        tipo: "aluno",
    });
    LIVRO = await request(app).post('/livros').send({ titulo: 'Clean Code', autor: 'Martin Code' });

    USUARIO_2 = await request(app).post('/usuarios').send({
        nome: "Paulo Naulo",
        email: `paulo_${Date.now()}@email.com`,
        senha: "123456",
        tipo: "aluno",
    });

    LIVRO_2 = await request(app).post('/livros').send({ titulo: 'Code Clean', autor: 'Code Martin' });
});

afterAll(async () => {
    await sequelize.close();
});

describe("Empréstimos", () => {
    test("deve registrar um novo empréstimo", async () => {
        const res = await request(app).post('/emprestimos').send({
            livro_id: LIVRO.body.id,
            usuario_id: USUARIO.body.id,
            data_devolucao_prevista: '2025-05-01',
        })
        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty("id");

        // await axios.delete(`${api}/emprestimos/${res.data.id}`);
    });

    test("deve retornar uma lista de empréstimos", async () => {
        // const res = await axios.get(`${api}/emprestimos`);
        const res = await request(app).get('/emprestimos');
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    // test("deve deletar um empréstimo", async () => {
    //     const res = await request(app).delete('/emprestimos/1');
    //     expect(res.status).toBe(204);
    // });

    test("deve retornar 404 ao deletar empréstimo inexistente", async () => {
        const res = await request(app).delete('/emprestimos/99');
        expect(res.status).toBe(404);
    });

    test("deve retornar um empréstimo pelo id", async () => {
        const res = await request(app).get('/emprestimos/1');
        expect(res.status).toBe(200);
        expect(res.body.data_devolucao_prevista).toBe("2025-05-01");
    });

    test("deve retornar 404 para empréstimo inexistente", async () => {
        const res = await request(app).get('/emprestimos/99');
        expect(res.status).toBe(404);
    });

    test("deve retornar 400 ao registrar empréstimo sem livro_id", async () => {
        try {
            // await axios.post(`${api}/emprestimos`, {
            //     usuario_id: USUARIO_ID,
            //     data_devolucao_prevista: "2025-05-01",
            // });
            await request(app).post('/emprestimos').send({
                usuario_id: USUARIO.body.id,
                data_devolucao_prevista: '2025-02-02',
            });
        } catch (err) {
            expect(err.response.status).toBe(400);
        }
    });

    test("deve retornar 400 ao registrar empréstimo sem usuario_id", async () => {
        try {
            await request(app).post('/emprestimos').send({
                livro_id: LIVRO.body.id,
                data_devolucao_prevista: '2025-02-02',
            });
        } catch (err) {
            expect(err.response.status).toBe(400);
        }
    });

    test("deve retornar 400 ao registrar empréstimo sem data de devolução", async () => {
        try {
            await request(app).post('/emprestimos').send({
                usuario_id: USUARIO.body.id,
                livro_id: LIVRO.body.id,
            });
        } catch (err) {
            expect(err.response.status).toBe(400);
        }
    });

    test("deve registrar a devolução de um empréstimo", async () => {
        const emprestimo = await request(app).post('/emprestimos').send({
            livro_id: LIVRO_2.body.id,
            usuario_id: USUARIO_2.body.id,
            data_devolucao_prevista: '2025-05-01',
        });

        const res = await request(app).put(`/emprestimos/${emprestimo.body.id}`).send({
            data_devolucao: '2025-05-01',
        });

        expect(res.status).toBe(200);
        expect(res.body.data_devolucao).toBe('2025-05-01');
    });

    test("deve retornar 404 ao devolver empréstimo inexistente", async () => {
        const res = await request(app).put(`/emprestimos/99`).send({
            data_devolucao: '2025-05-01',
        });
        expect(res.status).toBe(404);
    });

    test("deve listar empréstimos de um usuário específico", async () => {
        const emprestimos = await request(app).get('/emprestimos/usuario/1');
        expect(emprestimos.status).toBe(200);
        expect(Array.isArray(emprestimos.body)).toBe(true);
    });

    test("deve retornar 400 ao emprestar livro já emprestado", async () => {
        const emprestimo = await request(app).post('/emprestimos').send({
            livro_id: LIVRO_2.body.id,
            usuario_id: USUARIO.body.id,
            data_devolucao_prevista: '2025-07-01',
        });
        expect(emprestimo.status).toBe(400);
    });
});