var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  global.db.findAllCategoria((e, docs) => {
      if(e) { return console.log(e); }
      res.render('index', { title: 'Lista de Categorias', docs: docs });
  })
})

router.get('/show_categoria', function(req, res) {
  global.db.findCategorias((e, docs) => {
      if(e) { return console.log(e); }
      res.render('show_categoria', { title: 'Lista de Categorias', docs: docs });
  })
})

router.get('/create_categoria', function(req, res, next) {
  res.render('create_categoria', { title: 'Novo Cadastro', doc: {"nome":"", "unidade_medida":""}, action: '/create_categoria' });
});


router.post('/create_categoria', function(req, res) {
  var nome = req.body.nome;
  var unidade_medida = req.body.unidade_medida;
  global.db.insertCategoria({nome, unidade_medida}, (err, result) => {
          if(err) { return console.log(err); }
          res.redirect('/');
      })
})

router.get('/edit_categoria/:id', function(req, res, next) {
  var id = req.params.id;
  global.db.findCategoria(id, (e, docs) => {
      if(e) { return console.log(e); }
      res.render('create_categoria', { title: 'Edição de Categoria', doc: docs[0], action: '/edit_categoria/' + docs[0]._id });
    });
})

router.post('/edit_categoria/:id', function(req, res) {
  var id = req.params.id;
  var nome = req.body.nome;
  var unidade_medida = req.body.unidade_medida;
  global.db.updateCategoria(id, {nome, unidade_medida}, (e, result) => {
        if(e) { return console.log(e); }
        res.redirect('/');
    });
});

router.get('/delete_categoria/:id', function(req, res) {
  var id = req.params.id;
  global.db.deleteCategoria(id, (e, r) => {
        if(e) { return console.log(e); }
        res.redirect('/');
      });
});

router.get('/:pagina?', async function(req, res) {
  const pagina = parseInt(req.params.pagina || "1");
  const docs = await global.db.findCategorias(pagina);
  const count = await global.db.countAllCategoria();
  const qtdPaginas = Math.ceil(count / global.db.TAMANHO_PAGINA);
  res.render('show_categoria', { title: 'Lista de Categoria', docs, count, qtdPaginas, pagina });
})

router.get('/show_produto', function(req, res) {
  global.db.findProdutos((e, docs) => {
      if(e) { return console.log(e); }
      res.render('show_produtos', { title: 'Lista de Produtos', docs: docs });
  })
})

router.get('/create_produto', function(req, res, next) {
  res.render('create_produto', { title: 'Novo Cadastro', doc: {"nome":"", "unidade_medida":""}, action: '/create_produto' });
});


router.post('/create_produto', function(req, res) {
  var nome = req.body.nome;
  var unidade_medida = req.body.unidade_medida;
  global.db.insertProduto({nome, unidade_medida}, (err, result) => {
          if(err) { return console.log(err); }
          res.redirect('/');
      })
})

router.get('/edit_produto/:id', function(req, res, next) {
  var id = req.params.id;
  global.db.findProduto(id, (e, docs) => {
      if(e) { return console.log(e); }
      res.render('create_produto', { title: 'Edição de Produto', doc: docs[0], action: '/edit_produto/' + docs[0]._id });
    });
})

router.post('/edit_produto/:id', function(req, res) {
  var id = req.params.id;
  var nome = req.body.nome;
  var unidade_medida = req.body.unidade_medida;
  global.db.updateProduto(id, {nome, unidade_medida}, (e, result) => {
        if(e) { return console.log(e); }
        res.redirect('/');
    });
});

router.get('/delete_produto/:id', function(req, res) {
  var id = req.params.id;
  global.db.deleteProduto(id, (e, r) => {
        if(e) { return console.log(e); }
        res.redirect('/');
      });
});

router.get('/:pagina?', async function(req, res) {
  const pagina = parseInt(req.params.pagina || "1");
  const docs = await global.db.findProdutos(pagina);
  const count = await global.db.countAllProdutos();
  const qtdPaginas = Math.ceil(count / global.db.TAMANHO_PAGINA);
  res.render('show_produto', { title: 'Lista de Categoria', docs, count, qtdPaginas, pagina });
})

module.exports = router;
