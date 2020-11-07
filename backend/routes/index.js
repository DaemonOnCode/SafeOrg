var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/users',function(req,res,next){
  res.send([{"name": "nishant","id":1},{"name":"ria","id": 2}]);
})

module.exports = router;
