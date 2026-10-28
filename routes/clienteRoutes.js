const express = require("express");

const router = express.Router();

// ========================================
// DADOS
// ========================================

let clientes = [
  {
    id: 1,
    nome: "Informática",
    email : "emailcliente@gmail.com",
    tel : "(19) 99999-9999",
    cid : "São Paulo - SP"
  },
  {
    id: 2,
    nome: "Pneus Do zé",
    email : "pneusdoze@gmail.com",
    tel : "(19) 99999-9999",
    cid : "Itu - SP"
  },
  {
    id: 3,
    nome: "Hospital",
    email : "hospitalsc@gmial.com",
    tel : "(11) 99999-9999",
    cid : "Salto - SP"
  }
];

router.get("/", (req, res) =>{
    res.render("clientes/index", {
        clientes: clientes
    });
});

router.get("/cadastro", (req, res) => {
  res.render("clientes/form-cadastro")
});

router.post("/", (req, res) => {
  const {nome, email, tel, cid} = req.body;
  const novocliente ={
    id: clientes.length + 1,
    nome: nome,
    email : email,
    tel : tel,
    cid : cid
  };
  clientes.push(novocliente);
  res.redirect('/clientes');
})

// excluir 

router.get("/excluir/:id", (req, res) => {

  let id = parseInt(req.params.id);

  clientes = clientes.filter(c => c.id !== id);

  res.redirect("/clientes");
});

//editar - form - GET
router.get("/editar/:id", (req, res)=> {
  let id = parseInt(req.params.id);
  let cliente = clientes.find(c => c.id === id)

  if(!cliente){
    return res.redirect("/clientes");
  }

  res.render("clientes/editar", { cliente });
});

//editar - efetiva - POST

router.post("/editar/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const clienteEncontrada = clientes.find(c => c.id === id);

  if (!clienteEncontrada) {
    return res.redirect("/clientes");
  }

  const { nome, email, tel, cid } = req.body;

  clienteEncontrada.nome = nome;
  clienteEncontrada.email = email;
  clienteEncontrada.tel = tel;
  clienteEncontrada.cid = cid;

  res.redirect("/clientes");
});

module.exports = router;
