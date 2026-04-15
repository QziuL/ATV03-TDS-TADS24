const { Router } = require('express');
const {criarEmprestimo, listarTodos, deletarUm, listarUm, editar, listarPorUsuarioId} = require('../controllers/emprestimoController')

const router = Router();

router.post("/", criarEmprestimo);
router.get("/", listarTodos);
router.get("/:id", listarUm);
router.put("/:id", editar);
router.delete("/:id", deletarUm);
router.get("/usuario/:usuario_id", listarPorUsuarioId);

module.exports = router;