const { criarLivro } = require('../services/livroService');
const { listar: listarLivro, listarUm: listarUmLivro, deletar: deletarUm, editar: editarUm } = require('../services/livroService');

const criar = async (req, res) => {
    const { titulo, autor } = req.body;

    if (!titulo || !autor) return res.status(400)
        .json({ erro: 'titulo e autor são obrigatórios'})
    try {
        res.status(201).json(await criarLivro(titulo, autor));
    } catch (error) {
        return res.status(500).json({ erro: 'Erro ao criar livro' });
    }
}

const listar = async (req, res) => {
    try {
        res.status(200).json(await listarLivro())
    } catch (error) {
        return res.status(500).json({ erro: 'Erro ao listar livros' });
    }
}

const listarUm = async (req, res) => {
    try {
        res.status(200).json(await listarUmLivro(req.params.id))
    } catch (error) {
        return res.status(500).json({ erro: 'Erro ao listar livro' });
    }
}

const editar = async (req, res) => {
    const { titulo, autor } = req.body;

    if (!titulo || !autor) return res.status(400)
        .json({ erro: 'titulo e autor são obrigatórios' });
    try {
        res.status(200).json(await editarUm(req.params.id, titulo, autor));
    } catch (error) {
        return res.status(500).json({ erro: 'Erro ao editar livro' });
    }
}

const deletar = async (req, res) => {
    try {
        await deletarUm(req.params.id);
        res.status(204).json({ mensagem: 'Livro deletado com sucesso' });
    } catch (error) {
        return res.status(500).json({ erro: 'Erro ao deletar livro' });
    }
}

module.exports = { criar, listar, listarUm, editar, deletar };