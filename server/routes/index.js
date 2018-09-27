var express = require('express');
var router = express.Router();
var book = require('../db/db.js')

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
 book.collection('book').find({}).toArray(function(err, result){
 	if(err){
 		throw err;
 	}else{
 		console.log(result);
 	}
 })
  
});

module.exports = router;
