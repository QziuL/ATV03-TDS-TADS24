const {criar,listar,deletar, listarPorId, editarPorId, listarPorUsuario} = require("../services/emprestimoService");

const criarEmprestimo = async (req, res) => {
    const {livro_id, usuario_id, data_devolucao_prevista} = req.body;

    if (!livro_id || !usuario_id || !data_devolucao_prevista) 
        return res.status(400).json({error: "Valores nulos"})

    try {
        return res.status(201).json(await criar(livro_id,usuario_id,data_devolucao_prevista));
    } catch (error) {
        console.log(error.message);
        return (error.message == 'Livro não disponivel')
            ? res.status(400).json(error) 
            : res.status(500).json({error: "Erro ao criar emprestimo"})
    }
}

const listarTodos = async (req,res) => {
    try {
        return res.status(200).json(await listar());
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({error: "Erro ao listar emprestimos"})
    }
}

const listarUm = async (req, res) => {
    try {
        return res.status(200).json(await listarPorId(req.params.id));
    } catch (error) {
        return (error.message == 'Emprestimo não encontrado')
            ? res.status(404).json(error)
            : res.status(500).json({error: "Erro ao listar emprestimo"});
    }
}

const listarPorUsuarioId = async (req, res) => {
    try {
        return res.status(200).json(await listarPorUsuario(req.params.usuario_id));
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({error: "Erro ao listar emprestimos"})
    }
}

const editar = async (req, res) => {
    const {data_devolucao} = req.body;
    try {
        return res.status(200).json(await editarPorId(req.params.id, data_devolucao));
    } catch(error) {
        return (error.message == 'Emprestimo não encontrado')
            ? res.status(404).json(error)
            : (error.message == 'Valores nulos')
                ? res.status(400).json(error)
                : res.status(500).json({error: "Erro ao editar emprestimo"});
    }
}

const deletarUm = async (req,res) => {
    try {
       return res.status(204).json(await deletar(req.params.id));
    } catch (error) {
        console.log(error.message);
        return (error.message == 'Emprestimo não encontrado')
            ? res.status(404).json(error)
            : res.status(500).json({error: "Erro interno ao deletar emprestimo"});
    }
}

module.exports = {criarEmprestimo, listarTodos, deletarUm, listarUm, editar, listarPorUsuarioId}