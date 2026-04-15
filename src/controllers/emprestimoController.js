const {criar} = require("../services/emprestimoService");

const criarEmprestimo = async (req, res) => {
    console.log(req.body);
    const {livro_id, usuario_id, data_prevista_devolucao} = req.body;

    try {
        res.status(201).json(await criar(livro_id,usuario_id,data_prevista_devolucao));
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({error: "Erro ao criar emprestimo"})
    }
}

module.exports = {criarEmprestimo}