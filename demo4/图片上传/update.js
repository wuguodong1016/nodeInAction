var http = require('http');
var formidable = require('formidable');
var server = http.createServer(function(req,res){
	switch(req.method){
		case 'GET':
			show(req,res);
			break;
		case 'POST':
			upload(req,res);
			break;
	}
});

server.listen(3000,function(){
	console.log("127.0.0.1:3000");
})

function show(req,res){
	var html ='<html><head><title>Todo List</title></head><body>'
		+'<h1>Todo List</h1><ul>'
		+'</ul>'+'<form method="post" action="/" enctype="multipart/form-data">'
		+'<p><input type="text" name="item" /></p>'
		+'<p><input type="file" name="file" /></p>'
		+'<p><input type= "submit" value="Add Item" /></p>'
		+'</form></body></html>';
		res.setHeader('Content-Type','text/html');
		res.setHeader('Content-Length',Buffer.byteLength(html));
		res.end(html);
}

function upload(req,res){
	if(!isFormData(req)){
		res.statusCode = 400;
		res.end('Bad Request: expecting multipart/form-data')
		return;
	}
	var form = new formidable.IncomingForm();
	form.on('field',function(field,value){
		console.log('field: '+field);
		console.log('value: '+value);
	});
	form.on('file',function(name,file){
		console.log(name);
		console.log(file);
	});
	form.on('end',function(){
		res.end('upload complete');
	})
	form.parse(req);
}

function isFormData(req){
	var type = req.headers['content-type']||'';
	return 0 == type.indexOf('multipart/form-data');
}