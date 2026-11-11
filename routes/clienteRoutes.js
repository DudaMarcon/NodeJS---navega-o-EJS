
const express = require("express");
const router = express.Router();

// Importa as funções do banco JSON
const banco = require("../utils/jsonDatabase");

// Listar clientes
router.get("/", (req, res) => {
  const clientes = banco.lerDados("clientes.json");

  res.render("clientes/index", { clientes });
});

// Formulário de cadastro
router.get("/cadastro", (req, res) => {
  res.render("clientes/form-cadastro");
});

// Cadastrar cliente
router.post("/", (req, res) => {
  const clientes = banco.lerDados("clientes.json");

  const { nome, email, tel, cid } = req.body;

  const novoCliente = {
    id: banco.gerarId(clientes),
    nome,
    email,
    tel,
    cid
  };

  clientes.push(novoCliente);

  banco.salvarDados("clientes.json", clientes);

  res.redirect("/clientes");
});

// Excluir cliente
router.get("/excluir/:id", (req, res) => {
  const clientes = banco.lerDados("clientes.json");
  const id = parseInt(req.params.id);

  const novosClientes = clientes.filter(c => c.id !== id);

  banco.salvarDados("clientes.json", novosClientes);

  res.redirect("/clientes");
});

// Formulário de edição
router.get("/editar/:id", (req, res) => {
  const clientes = banco.lerDados("clientes.json");
  const id = parseInt(req.params.id);

  const cliente = clientes.find(c => c.id === id);

  if (!cliente) {
    return res.redirect("/clientes");
  }

  res.render("clientes/editar", { cliente });
});

// Salvar edição
router.post("/editar/:id", (req, res) => {
  const clientes = banco.lerDados("clientes.json");
  const id = parseInt(req.params.id);

  const clienteEncontrado = clientes.find(c => c.id === id);

  if (!clienteEncontrado) {
    return res.redirect("/clientes");
  }

  const { nome, email, tel, cid } = req.body;

  clienteEncontrado.nome = nome;
  clienteEncontrado.email = email;
  clienteEncontrado.tel = tel;
  clienteEncontrado.cid = cid;

  banco.salvarDados("clientes.json", clientes);

  res.redirect("/clientes");
});

module.exports = router;
