const { Emprestimo } = require("../models")

const criar = async (livro_id, usuario_id, data_devolucao_prevista) => {
  const emprestado = await Emprestimo.findOne({where: {livro_id: livro_id}});

  if (emprestado) throw new Error('Livro não disponivel');

  const emprestimo = await Emprestimo.create({ livro_id, usuario_id, data_devolucao_prevista });
  return {
    id: emprestimo.id,
    livro_id: emprestimo.livro_id,
    usuario_id: emprestimo.usuario_id,
    data_devolucao_prevista: emprestimo.data_devolucao_prevista,
  };
};

const listar = async () => {
  return await Emprestimo.findAll();
}

const listarPorUsuario = async (usuario_id) => {
  return await Emprestimo.findAll({where: {usuario_id: usuario_id}});
}

const listarPorId = async(id) => {
  const emprestimo = await Emprestimo.findByPk(id);
  if (!emprestimo) throw new Error("Emprestimo não encontrado");
  return emprestimo;
}

const editarPorId = async (id, data_devolucao) => {
  const emprestimo = await Emprestimo.findByPk(id);
  if (!emprestimo) 
    throw new Error("Emprestimo não encontrado");
  
  if (!data_devolucao)
    throw new Error("Valores nulos");

  emprestimo.data_devolucao = data_devolucao;
  
  await emprestimo.save();
  return emprestimo;
}

const deletar = async (id) => {
  const emprestimo = await Emprestimo.findByPk(id);
  if (!emprestimo) throw new Error("Emprestimo não encontrado");
  await emprestimo.destroy();
}

module.exports = { criar, listar, deletar, listarPorId, editarPorId, listarPorUsuario };