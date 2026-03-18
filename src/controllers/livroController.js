const { criarLivro } = require('../services/livroService');
const { listar: listarLivro } = require('../services/livroService');
const { listarUm: listarUmLivro } = require('../services/livroService');

const criar = async (req, res) => {
    const { titulo, autor } = req.body;

    if (!titulo || !autor) return res.status(400)
        .json({ erro: 'titulo e autor são obrigatórios'})

    const livro = await criarLivro(titulo, autor);
    res.status(201).json(livro);
}

const listar = async (req, res) => {
    res.status(200).json(await listarLivro())
}

const listarUm = async (req, res) => {
    res.status(200).json(await listarUmLivro(req.params.id))
}

module.exports = { criar, listar, listarUm };