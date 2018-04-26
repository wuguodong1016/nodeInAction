var net = require('net');

var server = net.createServer(function(socket){
	socket.on('connect',function(){
		console.log('come on');
	});
	socket.once('data',function(data){
		console.log(data);
		socket.write(data);

	});
});

server.listen(8888,function(){
	console.log("this is the first day");
});