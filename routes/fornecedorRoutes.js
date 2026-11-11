
const express = require("express");
const router = express.Router();
const banco = require("../utils/jsonDatabase");

router.get("/", (req, res) => {
  const fornecedores = banco.lerDados("fornecedores.json");
  res.render("fornecedor/index", { fornecedores });
});

router.get("/cadastro", (req, res) => {
  res.render("fornecedor/form-cadastro");
});

router.post("/", (req, res) => {
  const fornecedores = banco.lerDados("fornecedores.json");
  const { razao, cnpj, email, tel, cid } = req.body;

  const novoFornecedor = {
    id: banco.gerarId(fornecedores),
    razao,
    cnpj,
    email,
    tel,
    cid
  };

  fornecedores.push(novoFornecedor);
  banco.salvarDados("fornecedores.json", fornecedores);
  res.redirect("/fornecedores");
});

router.get("/excluir/:id", (req, res) => {
  const fornecedores = banco.lerDados("fornecedores.json");
  const id = parseInt(req.params.id);

  const novosFornecedores = fornecedores.filter(f => f.id !== id);

  banco.salvarDados("fornecedores.json", novosFornecedores);
  res.redirect("/fornecedores");
});

router.get("/editar/:id", (req, res) => {
  const fornecedores = banco.lerDados("fornecedores.json");
  const id = parseInt(req.params.id);

  const fornecedor = fornecedores.find(f => f.id === id);

  if (!fornecedor) {
    return res.redirect("/fornecedores");
  }

  res.render("fornecedor/editar", { fornecedor });
});

router.post("/editar/:id", (req, res) => {
  const fornecedores = banco.lerDados("fornecedores.json");
  const id = parseInt(req.params.id);

  const fornecedor = fornecedores.find(f => f.id === id);

  if (!fornecedor) {
    return res.redirect("/fornecedores");
  }

  const { razao, cnpj, email, tel, cid } = req.body;

  fornecedor.razao = razao;
  fornecedor.cnpj = cnpj;
  fornecedor.email = email;
  fornecedor.tel = tel;
  fornecedor.cid = cid;

  banco.salvarDados("fornecedores.json", fornecedores);
  res.redirect("/fornecedores");
});

module.exports = router;
