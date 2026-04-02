const { criarUsuario, listarUsuario, listarUmUsuario, listarUmUsuarioEmail, editarUsuario } = require('../services/usuarioService');
const bcrypt = require('bcrypt');


const criar = async (req, res) => {
    const { nome, email, senha, tipo } = req.body;

    if (!nome || !email || !senha || !tipo)
        return res.status(400).json({erro: "Verificar dados."});
    if (await listarUmUsuarioEmail(email))
        return res.status(400).json({erro: "Email já cadastrado."});
    try {
        res.status(201).json(await criarUsuario(nome, email, await bcrypt.hash(senha, 10), tipo));
    } catch (error) {
        return res.status(500).json({ erro: 'Erro ao criar usuario'});
    }
}

const listar = async (req, res) => {  
    try {
        res.status(200).json(await listarUsuario())
    } catch (error) {
        return res.status(500).json({ erro: 'Erro ao listar usuarios' });
    }
}

const listarUm = async (req, res) => {
    try {
        res.status(200).json(await listarUmUsuario(req.params.id))
    } catch (error) {
        return res.status(404).json({ erro: 'Usuário não encontrado' });
    }
}

const editar = async (req, res) => {   
    const { nome, email, senha, tipo } = req.body;

    try {
        res.status(200).json(await editarUsuario(req.params.id, nome, email, senha ? await bcrypt.hash(senha, 10) : undefined, tipo));
    } catch (error) {
        return res.status(500).json({ erro: 'Erro ao editar usuário' });

    }
}

module.exports = { criar, listar, listarUm, editar };