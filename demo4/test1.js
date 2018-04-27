var http = require('http');
var server = http.createServer(function(req,res){
	res.end('Hello World');
}).listen(3000,function(){
	console.log('启动监听');
});