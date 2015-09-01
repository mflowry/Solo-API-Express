var express = require('express');
var router = express.Router();
var path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../views/index.html'));
});
//__dirname refers to the current working directory

module.exports = router;
//router object has to be exported for Express to use it