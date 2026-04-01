const { criarUsuario } = require('../services/usuarioService');
const bcrypt = require('bcrypt');


const criar = async (req, res) => {
    const { nome, email, senha, tipo } = req.body;

    if (!nome || !email || !senha || !tipo)
        return res.status(400).json({erro: "Verificar dados."});
    try {
        res.status(201).json(await criarUsuario(nome, email, await bcrypt.hash(senha, 10), tipo));
    } catch (error) {
        return res.status(500).json({ erro: 'Erro ao criar usuario'});
    }
}

module.exports = { criar };