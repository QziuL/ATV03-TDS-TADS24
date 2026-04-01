const { Router } = require('express');
const { criar } = require('../controllers/usuarioController');

const router = Router();

router.post("/", criar);

module.exports = router;