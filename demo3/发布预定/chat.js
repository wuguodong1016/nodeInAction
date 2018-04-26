var events = require('events');
var net = require('net');
var channel = new events.EventEmitter();

channel.clients = {};
channel.subscriptions = {};

channel.on('join',function(id,client){
	console.log('id');
	this.clients[id] = function(senderId,message){
		console.log('senderId='+senderId);
		//忽略发送广告的用户
		if(id != senderId){
			this.clients[id].write(message);
		}
	}
	this.on('broadcast',this.subscriptions[id]);
});

var server = net.createServer(function(client){
	var id = client.remoteAddress + ':'+client.remotePort;
	console.log(id);
	client.on('connect',function(){
		console.log('come on');
		channel.emit('join',id,client);
	});
	client.on('data',function(data){
		data = data.toString();
		channel.emit('broadcast',id,data);
	});
});

server.listen(8888,function(){
	console.log('127.0.0.1 8888');
});