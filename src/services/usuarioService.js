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

module.exports = {criarUsuario};