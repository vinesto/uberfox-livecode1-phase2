var express = require('express');
var router = express.Router();
const {register,login, getItemBySearch, createItem} = require('../controllers/index')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/register', register)
router.post('/request_token', login)


router.get('/items/', getItemBySearch)
router.post('/items', createItem)

module.exports = router;
