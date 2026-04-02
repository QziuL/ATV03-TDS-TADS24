const { Router } = require('express');
const { criar, listar, listarUm, editar } = require('../controllers/usuarioController');

const router = Router();

router.post("/", criar);
router.get("/", listar);
router.get("/:id", listarUm);
router.put("/:id", editar);

module.exports = router;