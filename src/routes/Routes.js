const { Router } = require("express");
const livroRoutes = require("./livroRoutes");
const usuarioRoutes = require("./usuarioRoutes")
const emprestimoRoutes = require("./emprestimosRoutes");
const multasRoutes = require("./multasRoutes");

const router = Router();
router.use("/livros", livroRoutes);
router.use("/usuarios", usuarioRoutes);
router.use("/emprestimos", emprestimoRoutes);
router.use("/multas", multasRoutes);

module.exports = router;