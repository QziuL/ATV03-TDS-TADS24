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

const editar = async (id, titulo, autor) => {
  const livro = await Livro.findByPk(id);
  if (!livro) throw new Error('Livro não encontrado');

  livro.titulo = titulo;
  livro.autor = autor;
  await livro.save();

  return {
    id: livro.id,
    titulo: livro.titulo,
    autor: livro.autor,
  };
}

const deletar = async (id) => {
  const livro = await Livro.findByPk(id);
  if (!livro) throw new Error('Livro não encontrado');

  await livro.destroy();
}

module.exports = { criarLivro, listar, listarUm, editar, deletar };