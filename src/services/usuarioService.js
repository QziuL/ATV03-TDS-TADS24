const {Usuario} = require('../models');

const criar = async (nome, email, senha, tipo) => {
    const usuario = await Usuario.create({nome, email, senha, tipo});
    return {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        senha: usuario.senha,
        tipo: usuario.tipo,
    };
}

const listar = async () => {
    return await Usuario.findAll();
}

const listarUm = async (id) => {
    return await Usuario.findByPk(id);
}

const listarUmPeloEmail = async (email) => {
    return await Usuario.findOne({ where: { email } });
}

const editar = async (id, nome, email, senha, tipo) => {
    const usuario = await Usuario.findByPk(id);
    if (!usuario) throw new Error('Usuário não encontrado');

    if (nome) usuario.nome = nome;
    if (email) usuario.email = email;
    if (senha) usuario.senha = senha;
    if (tipo) usuario.tipo = tipo;
    
    await usuario.save();
    return {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        senha: usuario.senha,
        tipo: usuario.tipo,
    }
}   

const deletar = async (id) => {
    const usuario = await Usuario.findByPk(id);
    if (!usuario) throw new Error('Usuário não encontrado');

    await usuario.destroy();
}

module.exports = {criar, listar, listarUm, listarUmPeloEmail, editar, deletar};