const sequelize = require('../src/database/sequelize');
const request = require('supertest');
const app = require('../src/app');
require('dotenv').config();
const api = `http://localhost:${process.env.PORT || 3000}`;

const EMPRESTIMO_ID = 444;

describe("Multas", () => {
    test("deve registrar uma nova multa", async () => {

    });

    test("deve retornar uma lista de multas", async () => {

    });

    test("deve deletar uma multa", async () => {

    });

    test("deve retornar 404 ao deletar multa inexistente", async () => {

    });

    test("deve retornar uma multa pelo id", async () => {

    });

    test("deve retornar 404 para multa inexistente", async () => {

    });

    test("deve retornar 400 ao registrar multa sem emprestimo_id", async () => {

    });

    test("deve quitar uma multa e retornar 200", async () => {

    });

    test("deve retornar 201 ao atualizar uma multa", async () => {

    });

    test("deve retornar 404 ao tentar quitar multa quitada", async () => {

    });

    test("deve listar multas de um emprestimo específico", async () => {

    });
});