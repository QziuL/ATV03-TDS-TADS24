const { criar: criarService, listar: listarService, listarUm: listarUmService, editar: editarService, deletar: deletarService, listarUmPeloEmail } = require('../services/usuarioService');
const bcrypt = require('bcrypt');


const criar = async (req, res) => {
    const { nome, email, senha, tipo } = req.body;

    if (!nome || !email || !senha || !tipo)
        return res.status(400).json({erro: "Verificar dados."});
    if (await listarUmPeloEmail(email)) return res.status(400).json({erro: "Email já cadastrado."});
    try {
        res.status(201).json(await criarService(nome, email, await bcrypt.hash(senha, 10), tipo));
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ erro: 'Erro ao criar usuario'});
    }
}

const listar = async (req, res) => {  
    try {
        res.status(200).json(await listarService())
    } catch (error) {
        return res.status(500).json({ erro: 'Erro ao listar usuarios' });
    }
}

const listarUm = async (req, res) => {
    try {
        res.status(200).json(await listarUmService(req.params.id))
    } catch (error) {
        return res.status(404).json({ erro: 'Usuário não encontrado' });
    }
}

const editar = async (req, res) => {   
    const { nome, email, senha, tipo } = req.body;

    try {
        res.status(200).json(await editarService(req.params.id, nome, email, senha ? await bcrypt.hash(senha, 10) : undefined, tipo));
    } catch (error) {
        if (error.message === 'Usuário não encontrado')
            return res.status(404).json({ erro: error.message });
        return res.status(500).json({ erro: 'Erro ao editar usuário' });

    }
}

const deletar = async (req, res) => { 
    try {
        await deletarService(req.params.id);
        res.status(204).json({ mensagem: 'Usuário deletado com sucesso' });
    } catch (error) {
        if (error.message === 'Usuário não encontrado')
            return res.status(404).json({ erro: error.message });
        return res.status(500).json({ erro: 'Erro ao deletar usuário' });
    }
}

module.exports = { criar, editar, deletar, listar, listarUm };