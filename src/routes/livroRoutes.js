const { Router } = require('express');
const { criar } = require('../controllers/livroController');
const { listar } = require('../controllers/livroController');
const { listarUm } = require('../controllers/livroController');

const router = Router();

router.post("/", criar);
router.get("/", listar);
router.get("/:id", listarUm);

module.exports = router;