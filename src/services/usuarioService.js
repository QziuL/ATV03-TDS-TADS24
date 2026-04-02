const {Usuario} = require('../models');

const criarUsuario = async (nome, email, senha, tipo) => {
    const usuario = await Usuario.create({nome, email, senha, tipo});
    return {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        senha: usuario.senha,
        tipo: usuario.tipo,
    };
}

const listarUsuario = async () => {
    return await Usuario.findAll();
}

const listarUmUsuario = async (id) => {
    return await Usuario.findByPk(id);
}

const listarUmUsuarioEmail = async (email) => {
    return await Usuario.findOne({ where: { email } });
}

const editarUsuario = async (id, nome, email, senha, tipo) => {
    const usuario = await Usuario.findByPk(id);
    console.log("usuario -> "+usuario);
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

module.exports = {criarUsuario, listarUsuario, listarUmUsuario, listarUmUsuarioEmail, editarUsuario};