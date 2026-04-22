const multaService = require('../services/multaService');

const criar = async (req, res) => {
    try {
        const { emprestimo_id, tipo, valor, obs } = req.body
        const multa = await multaService.criar(emprestimo_id, tipo, valor, obs);
        res.status(201).json(multa);
    } catch (error) {
        return (error.message == 'Emprestimo não encontrado')
            ? res.status(400).json({ error: error.message })
            : res.status(500).json({ error: error.message });
    }
}

const listar = async (req, res) => {
    try {
        const multas = await multaService.listar();
        res.status(200).json(multas);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const listarUm = async (req, res) => {
    try {
        const multa = await multaService.listarUm(req.params.id);
        res.status(200).json(multa);
    } catch (error) {
        return (error.message == 'Multa não encontrada')
            ? res.status(404).json({ error: error.message })
            : res.status(500).json({ error: error.message });
    }
}

const listarPorEmprestimos = async (req, res) => {
    try {
        const multas = await multaService.listarPorEmprestimos(req.params.id);
        res.status(200).json(multas);
    } catch (error) {
        return (error.message == 'Multa não encontrada')
            ? res.status(404).json({ error: error.message })
            : res.status(500).json({ error: error.message });
    }
}

const editar = async (req, res) => {
    try {
        const { emprestimo_id, tipo, valor, obs } = req.body;
        const multa = await multaService.editar(req.params.id, emprestimo_id, tipo, valor, obs);
        return res.status(201).json(multa);
    } catch (error) {
        return (error.message == 'Multa não encontrada')
            ? res.status(404).json({ error: error.message })
            : res.status(500).json({ error: error.message });
    }
}

const quitar = async (req, res) => {
    try {
        const multa = await multaService.quitar(req.params.id);
        return res.status(200).json(multa);
    } catch (error) {
        return (error.message == 'Multa não encontrada')
            ? res.status(404).json({ error: error.message })
            : (error.message == 'Multa já quitada')
                ? res.status(400).json({ error: error.message })
                : res.status(500).json({ error: error.message });
    }
}

const deletar = async (req, res) => {
    try {
        await multaService.deletar(req.params.id);
        return res.status(204).json();
    } catch (error) {
        return (error.message == 'Multa não encontrada')
            ? res.status(404).json({ error: error.message })
            : res.status(500).json({ error: error.message });
    }
}


module.exports = { criar, listar, listarUm, editar, quitar, deletar, listarPorEmprestimos };