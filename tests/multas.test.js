const sequelize = require('../src/database/sequelize');
const request = require('supertest');
const app = require('../src/app');

var USUARIO;
var LIVRO;
var EMPRESTIMO;
var MULTA;

beforeAll(async () => {
    await sequelize.sync({ force: true });

    USUARIO = await request(app).post('/usuarios').send({
        nome: "João Silva",
        email: `joao_${Date.now()}@email.com`,
        senha: "123456",
        tipo: "aluno",
    });

    LIVRO = await request(app).post('/livros').send({
        titulo: 'Clean Code',
        autor: 'Martin Code'
    });

    EMPRESTIMO = await request(app).post('/emprestimos').send({
        livro_id: LIVRO.body.id,
        usuario_id: USUARIO.body.id,
        data_devolucao_prevista: '2025-05-01',
    })
});

afterAll(async () => {
    await sequelize.close();
});

describe("Multas", () => {
    test("deve registrar uma nova multa", async () => {
        const res = await request(app).post('/multas').send({
            emprestimo_id: EMPRESTIMO.body.id,
            quitado: false,
            tipo: 'atraso',
            valor: 10.00,
            obs: 'criatura humana atrasou a devolução da unidade'
        });
        MULTA = res;
        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty("id");
    });

    test("deve retornar uma lista de multas", async () => {
        const res = await request(app).get('/multas');
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    test("deve retornar uma multa pelo id", async () => {
        const res = await request(app).get('/multas/1');
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty("id");
    });

    test("deve retornar 404 para multa inexistente", async () => {
        const res = await request(app).get('/multas/99');
        expect(res.status).toBe(404);
    });

    test("deve retornar 400 ao registrar multa sem emprestimo_id", async () => {
        const res = await request(app).post('/multas').send({
            quitado: false,
            tipo: 'atraso',
            valor: 10.00,
            obs: 'criatura humana atrasou a devolução da unidade'
        });
        expect(res.status).toBe(400);
    });

    test("deve quitar uma multa e retornar 200", async () => {
        const res = await request(app).put(`/multas/${EMPRESTIMO.body.id}/quitar`).send({
            quitado: true,
        });
        expect(res.status).toBe(200);
        expect(res.body.quitado).toBe(true);
    });

    test("deve retornar 201 ao atualizar uma multa", async () => {
        const res = await request(app).put(`/multas/${MULTA.body.id}`).send({
            emprestimo_id: EMPRESTIMO.body.id,
            tipo: 'dano',
            valor: 10.00,
            obs: 'criatura humana danificou a unidade'
        });
        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty("id");
    });

    test("deve retornar 400 ao tentar quitar multa quitada", async () => {
        const res = await request(app).put(`/multas/${EMPRESTIMO.body.id}/quitar`).send({
            quitado: true,
        });
        expect(res.status).toBe(400);
    });

    test("deve listar multas de um emprestimo específico", async () => {
        const res = await request(app).get(`/multas/emprestimo/${EMPRESTIMO.body.id}`);
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    test("deve deletar uma multa", async () => {
        const res = await request(app).delete(`/multas/${MULTA.body.id}`);
        expect(res.status).toBe(204);
    });

    test("deve retornar 404 ao deletar multa inexistente", async () => {
        const res = await request(app).delete('/multas/99');
        expect(res.status).toBe(404);
    });
});