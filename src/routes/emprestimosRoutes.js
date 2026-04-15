const { Router } = require('express');
const {criarEmprestimo} = require('../controllers/emprestimoController')

const router = Router();

router.post("/", criarEmprestimo);
// router.get("/", listar);
// router.get("/:id", listarUm);
// router.put("/:id", editar);
// router.delete("/:id", deletar);

module.exports = router;