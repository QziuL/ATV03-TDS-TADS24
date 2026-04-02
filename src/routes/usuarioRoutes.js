const { Router } = require('express');
const { criar, listar, listarUm, editar, deletar } = require('../controllers/usuarioController');

const router = Router();

router.post("/", criar);
router.get("/", listar);
router.get("/:id", listarUm);
router.put("/:id", editar);
router.delete("/:id", deletar);

module.exports = router;