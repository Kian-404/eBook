var mongoose = require('mongoose')

var DB_URL = 'mongodb://118.89.227.245:27017/book'

mongoose.connect(DB_URL)

mongoose.connection.on('connected', function(){
	console.log('connected success');
})

mongoose.connection.on('error', function(){
	console.log('connect error');
})

mongoose.connection.on('disconnected', function(){
	console.log('mongoose disconnected')
})

var schema=mongoose.Schema

var BookSchema = new schema({
	name:{type: String},
	cover:{type:String},
	href:{type:String}
})

var book = mongoose.model('book', BookSchema)

module.exports = book