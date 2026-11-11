
const express = require("express");
const router = express.Router();
const banco = require("../utils/jsonDatabase");

router.get("/", (req, res) => {
  const categorias = banco.lerDados("categorias.json");
  res.render("categorias/index", { categorias });
});

router.get("/cadastro", (req, res) => {
  res.render("categorias/form-cadastro");
});

router.post("/", (req, res) => {
  const categorias = banco.lerDados("categorias.json");
  const { nome, descricao } = req.body;

  const novaCategoria = {
    id: banco.gerarId(categorias),
    nome,
    descricao
  };

  categorias.push(novaCategoria);
  banco.salvarDados("categorias.json", categorias);
  res.redirect("/categorias");
});

router.get("/excluir/:id", (req, res) => {
  const categorias = banco.lerDados("categorias.json");
  const id = parseInt(req.params.id);

  const novasCategorias = categorias.filter(c => c.id !== id);

  banco.salvarDados("categorias.json", novasCategorias);
  res.redirect("/categorias");
});

router.get("/editar/:id", (req, res) => {
  const categorias = banco.lerDados("categorias.json");
  const id = parseInt(req.params.id);

  const categoria = categorias.find(c => c.id === id);

  if (!categoria) {
    return res.redirect("/categorias");
  }

  res.render("categorias/editar", { categoria });
});

router.post("/editar/:id", (req, res) => {
  const categorias = banco.lerDados("categorias.json");
  const id = parseInt(req.params.id);

  const categoria = categorias.find(c => c.id === id);

  if (!categoria) {
    return res.redirect("/categorias");
  }

  const { nome, descricao } = req.body;

  categoria.nome = nome;
  categoria.descricao = descricao;

  banco.salvarDados("categorias.json", categorias);
  res.redirect("/categorias");
});

module.exports = router;
