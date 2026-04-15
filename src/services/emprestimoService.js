const { Emprestimo } = require("../models")

const criar = async (livro_id, usuario_id, data_devolucao_prevista) => {
  const emprestimo = await Emprestimo.create({ livro_id, usuario_id, data_devolucao_prevista });
  return {
    id: emprestimo.id,
    livro_id: emprestimo.livro_id,
    usuario_id: emprestimo.usuario_id,
    data_devolucao_prevista: emprestimo.data_devolucao_prevista,
  };
};

module.exports = { criar };