const { Router } = require('express');
const { criar, listar, listarUm, listarPorEmprestimos, editar, quitar, deletar } = require('../controllers/multasController');

const router = Router();

router.post("/", criar);
router.get("/", listar);
router.get("/:id", listarUm);
router.get("/emprestimo/:id", listarPorEmprestimos);
router.put("/:id", editar);
router.put("/:id/quitar", quitar); // emprestimo_id
router.delete("/:id", deletar);


module.exports = router;