var http = require('http');
var fs = require('fs');

function badError(err,res){
	console.error(err);
	res.end('Server Error');
}

function getTemplate(title,res){
	fs.readFile('./template.html',function(err,data){
		if(err)return badError(err,res);
		formatHtml(title,data,res);
	})
}

function formatHtml(title,tmpl,res){
	var titles = JSON.parse(title.toString());
	var html = tmpl.toString().replace("%",titles.join('</li><li>'));
	res.writeHead(200,{'Content-Type':'text/html'});
	res.end(html);
}

http.createServer(function(req,res){
	if(req.url == '/'){
		fs.readFile('./title.json',function(err,data){
			if(err)return badError(err,res);
			getTemplate(data,res);
		});
	}
}).listen(8000,function(){
	console.log("項目2已經啓動");
});