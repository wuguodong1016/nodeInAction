var http = require('http');
var url = require('url');
var items = [];

var server = http.createServer(function(req,res){
	switch(req.method){
		case 'POST':
			var item = '';
			req.setEncoding('utf8');
			req.on('data',function(chunk){
				item += chunk;
			});
			req.on('end',function(){
				items.push(item);
				res.end('ON\n');
			});
			break;
		case 'GET':
			var body = items.map(function(item,i){
				return i+')'+item;
			}).join('\n');
			res.setHeader('Content-Length',Buffer.byteLength(body));
			res.setHeader('Content-Type','text/plain;charset="utf-8"');
			res.end(body);
			break;
		case 'DELETE':
			console.log('delete in');
			break;
		case 'PUT':
			req.on('data',function(chunk){
				console.log('put : '+chunk);
			});
			break;
	}
}).listen(3000,function(){
	console.log('start 127.0.0.1:3000');
});