const express = require('express');
const router = express.Router();

// ========================================
// DADOS
// ========================================
let produtos = [
  { id: 1, nome: 'Notebook', descricao: 'Notebook para uso profissional', preco: 3500, estoque: 10, categoria: 'Informática' },
  { id: 2, nome: 'Celular', descricao: 'Celular para uso Pessoal', preco: 1500, estoque: 18, categoria: 'Informática' },
  { id: 3, nome: 'Caderno', descricao: 'caderno para anotacções em bom estado', preco: 350000, estoque: 10990, categoria: 'Papelária' }
];

// Listar produtos
router.get('/', (req, res) => {
  res.render('produtos/index', { produtos: produtos });
});

// Formulário de cadastro (GET)
router.get('/cadastro', (req, res) => {
  res.render('produtos/form-cadastro');
});

// Cadastrar novo produto (POST)
router.post('/', (req, res) => {
  const { nome, descricao, preco, estoque, categoria } = req.body;
  const novoProduto = {
    id: produtos.length > 0 ? produtos[produtos.length - 1].id + 1 : 1,
    nome,
    descricao,
    preco: Number(preco),
    estoque: Number(estoque),
    categoria
  };
  produtos.push(novoProduto);
  res.redirect('/produtos');
});

// Excluir produto (GET)
router.get('/excluir/:id', (req, res) => {
  const id = parseInt(req.params.id);
  produtos = produtos.filter(c => c.id !== id);
  res.redirect('/produtos');
});

// Formulário de edição - GET
router.get('/editar/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const produto = produtos.find(c => c.id === id);
  if (!produto) {
    return res.redirect('/produtos');
  }
  res.render('produtos/editar', { produto });
});

// Salvar edição - POST (Implementado)
router.post('/editar/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = produtos.findIndex(c => c.id === id);
  
  if (index !== -1) {
    const { nome, descricao, preco, estoque, categoria } = req.body;
    produtos[index] = {
      id,
      nome,
      descricao,
      preco: Number(preco),
      estoque: Number(estoque),
      categoria
    };
  }
  res.redirect('/produtos');
});

router.post("/editar/:id", (req, res) => {
  let id = parseInt(req.params.id);
  let produto = produtos.find(c => c.id === id);
 
  if (!produto) {
    return res.redirect("/produtos");
  }
 
  const { nome, descricao, preco, estoque, categoria } = req.body;
 
  produto.nome = nome;
  produto.descricao = descricao;
  produto.preco = preco;
  produto.estoque = estoque;
  produto.categoria = categoria;
 
  res.redirect("/produtos");
});

module.exports = router;
