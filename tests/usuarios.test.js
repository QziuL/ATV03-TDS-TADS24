const axios = require('axios');
const sequelize = require('../src/database/sequelize');
const app = require('../src/app');
const request = require('supertest');

require('dotenv').config();
const api = `http://localhost:${process.env.PORT || 3000}`;

beforeAll(async () => {
  await sequelize.sync({force: true});
});

afterAll(async () => {
  await sequelize.close();
});

describe("Usuários", () => {
  test("deve criar um novo usuário", async () => {
    // const res = await axios.post(`${api}/usuarios`, {
    //   nome: "João Silva",
    //   email: `joao_${Date.now()}@email.com`,
    //   senha: "123456",
    //   tipo: "aluno",
    // });
    const res = await request(app).post('/usuarios').send({
      nome: "João Silva",
      email: `joao_${Date.now()}@email.com`,
      senha: "123456",
      tipo: "aluno",
    });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("id");
  });

  test("deve retornar uma lista de usuários", async () => {
    // const res = await axios.get(`${api}/usuarios`);
    const res = await request(app).get('/usuarios');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test("deve retornar um usuário pelo id", async () => {
    // const res = await axios.get(`${api}/usuarios/1`);
    const res = await request(app).get('/usuarios/1');
    expect(res.status).toBe(200);
    expect(res.body.id).toBe(1);
    expect(res.body.nome).toBe("João Silva");
    expect(res.body.tipo).toBe("aluno");
  });

  test("deve retornar 404 para usuário inexistente", async () => {
    try {
      // await axios.get(`${api}/usuarios/99999`);
      await request(app).get('/usuarios/99999');
    } catch (err) {
      expect(err.response.status).toBe(404);
    }
  });
0
  test("deve retornar 400 ao criar usuário sem nome", async () => {
    try {
      // await axios.post(`${api}/usuarios`, {
      //   email: "joao@email.com",
      //   senha: "123456",
      //   tipo: "aluno",
      // });
      await request(app).post('/usuarios').send({
        email: "joao@email.com",
        senha: "123456",
        tipo: "aluno",
      });
    } catch (err) {
      expect(err.response.status).toBe(400);
    }
  });

  test("deve retornar 400 ao criar usuário sem email", async () => {
    try {
      await axios.post(`${api}/usuarios`, {
        nome: "João Silva",
        senha: "123456",
        tipo: "aluno",
      });
    } catch (err) {
      expect(err.response.status).toBe(400);
    }
  });

  test("deve retornar 400 ao criar usuário com email já cadastrado", async () => {
    const email = `duplicado_${Date.now()}@email.com`;
    // await axios.post(`${api}/usuarios`, { nome: "Maria Souza", email, senha: "123456", tipo: "aluno" });
    await request(app).post('/usuarios').send({ nome: "Maria Souza", email, senha: "123456", tipo: "aluno" });

    try {
      // await axios.post(`${api}/usuarios`, { nome: "Carlos Lima", email, senha: "abcdef", tipo: "aluno" });
      await request(app).post('/usuarios').send({ nome: "Carlos Lima", email, senha: "abcdef", tipo: "aluno" });

    } catch (err) {
      expect(err.response.status).toBe(400);
    }
  });

  test("deve atualizar os dados de um usuário", async () => {
    const criado = await request(app).post('/usuarios').send({
      nome: "Pedro Antigo",
      email: `pedro_${Date.now()}@email.com`,
      senha: "123456",
      tipo: "aluno",
    });
    const res = await request(app).put(`/usuarios/${criado.body.id}`).send({ nome: "Pedro Novo" });
    
    expect(res.status).toBe(200);
    expect(res.body.nome).toBe("Pedro Novo");
  });

  // test("deve retornar 404 ao atualizar usuário inexistente", async () => {
  //   try {
  //     await axios.put(`${api}/usuarios/99999`, { nome: "Ninguém" });
  //   } catch (err) {
  //     expect(err.response.status).toBe(404);
  //   }
  // });

  // test("deve remover um usuário", async () => {
  //   const criado = await axios.post(`${api}/usuarios`, {
  //     nome: "Para Deletar",
  //     email: `deletar_${Date.now()}@email.com`,
  //     senha: "123456",
  //     tipo: "aluno",
  //   });

  //   const res = await axios.delete(`${api}/usuarios/${criado.data.id}`);
  //   expect(res.status).toBe(200);
  // });

  // test("deve retornar 404 ao deletar usuário inexistente", async () => {
  //   try {
  //     await axios.delete(`${api}/usuarios/99999`);
  //   } catch (err) {
  //     expect(err.response.status).toBe(404);
  //   }
  // });
});