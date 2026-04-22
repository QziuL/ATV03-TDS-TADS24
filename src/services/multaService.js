const { Multa } = require('../models');


const criar = async (emprestimo_id, tipo, valor, obs) => {
    if (!emprestimo_id) throw new Error('Emprestimo não encontrado');
    const multa = await Multa.create({ emprestimo_id, tipo, valor, obs });
    return {
        id: multa.id,
        emprestimo_id: multa.emprestimo_id,
        tipo: multa.tipo,
        valor: multa.valor,
        obs: multa.obs,
    };
}

const listar = async () => {
    return await Multa.findAll();
}

const listarUm = async (id) => {
    const multa = await Multa.findByPk(id);
    if (!multa) throw new Error('Multa não encontrada');
    return multa;
}

const listarPorEmprestimos = async (emprestimo_id) => {
    return await Multa.findAll({ where: { emprestimo_id } });
}

const editar = async (id, emprestimo_id, tipo, valor, obs) => {
    const multa = await Multa.findByPk(id);
    if (!multa) throw new Error('Multa não encontrada');

    multa.emprestimo_id = emprestimo_id;
    multa.tipo = tipo;
    multa.valor = valor;
    multa.obs = obs;
    await multa.save();

    return {
        id: multa.id,
        emprestimo_id: multa.emprestimo_id,
        tipo: multa.tipo,
        valor: multa.valor,
        obs: multa.obs,
    };
}

const quitar = async (id) => {
    const multa = await Multa.findByPk(id);
    if (!multa) throw new Error('Multa não encontrada');
    if (multa.quitado) throw new Error('Multa já quitada');
    multa.quitado = true;
    await multa.save();
    return multa;
}

const deletar = async (id) => {
    const multa = await Multa.findByPk(id);
    if (!multa) throw new Error('Multa não encontrada');
    await multa.destroy();
}

module.exports = { criar, listar, listarUm, listarPorEmprestimos, editar, quitar, deletar };