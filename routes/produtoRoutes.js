
const express = require('express');
const router = express.Router();

// Importa as funções para trabalhar com JSON
const banco = require('../utils/jsonDatabase');

// Listar produtos
router.get('/', (req, res) => {
  const produtos = banco.lerDados('produtos.json');

  res.render('produtos/index', { produtos });
});

// Formulário de cadastro
router.get('/cadastro', (req, res) => {
  res.render('produtos/form-cadastro');
});

// Cadastrar novo produto
router.post('/', (req, res) => {
  const produtos = banco.lerDados('produtos.json');

  const { nome, descricao, preco, estoque, categoria } = req.body;

  const novoProduto = {
    id: banco.gerarId(produtos),
    nome,
    descricao,
    preco: Number(preco),
    estoque: Number(estoque),
    categoria
  };

  produtos.push(novoProduto);

  banco.salvarDados('produtos.json', produtos);

  res.redirect('/produtos');
});

// Excluir produto
router.get('/excluir/:id', (req, res) => {
  const produtos = banco.lerDados('produtos.json');
  const id = parseInt(req.params.id);

  const novosProdutos = produtos.filter(p => p.id !== id);

  banco.salvarDados('produtos.json', novosProdutos);

  res.redirect('/produtos');
});

// Formulário de edição
router.get('/editar/:id', (req, res) => {
  const produtos = banco.lerDados('produtos.json');
  const id = parseInt(req.params.id);

  const produto = produtos.find(p => p.id === id);

  if (!produto) {
    return res.redirect('/produtos');
  }

  res.render('produtos/editar', { produto });
});

// Salvar edição
router.post('/editar/:id', (req, res) => {
  const produtos = banco.lerDados('produtos.json');
  const id = parseInt(req.params.id);

  const index = produtos.findIndex(p => p.id === id);

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

    banco.salvarDados('produtos.json', produtos);
  }

  res.redirect('/produtos');
});

module.exports = router;
