const { Livro } = require('../models');

const criarLivro = async (titulo, autor) => {
  const livro = await Livro.create({ titulo, autor });
  return {
    id: livro.id,
    titulo: livro.titulo,
    autor: livro.autor,
  };
};

const listar = async () => {
  return await Livro.findAll();
}

const listarUm = async (id) => {
  return await Livro.findByPk(id);
}

module.exports = { criarLivro, listar, listarUm };