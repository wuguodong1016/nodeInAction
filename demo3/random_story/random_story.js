//根据txt中的rss路径获取文件中的标题头和路径
var fs = require('fs');
var request = require('request');
var htmlparser = require('htmlparser');
var configFilename = './rss_feeds2.txt';

//检查文件是否存在
function checkForRSSFile(){
	fs.exists(configFilename,function(exists){
		if(!exists)return next(new Error('Missing RSS file:'+configFilename));
			next(null,configFilename);
	});
}

//读取文件内容，随机选择一个标题头
function readRSSFile(configFilename){
	console.log(configFilename);
	fs.readFile(configFilename,function(err,feedList){
		if(err)return next(err);
		feedList = feedList.toString()
				.replace(/^\s+|\s+$/g,'')
				.split('\n');
		var random = Math.floor(Math.random()*feedList.length);
		console.log(random);
		next(null,feedList[random]);
	});
}

//请求地址，并获取body
function downloadRSSFeed(feedUrl){
	console.log(feedUrl);
	request({uri:feedUrl},function(err,res,body){
		if(err)return next(err);
		if(res.statusCode != 200)return next(new Error('Abnormal response status code'))
		next(null,body);
	})
}

//解析body 获取关键字段
function parseRSSFeed(rss){
	var handler = new htmlparser.RssHandler();
	var parser = new htmlparser.Parser(handler);
	parser.parseComplete(rss);

	if(!handler.dom.items.length)return next(new Error('No RSS items found'));
	var items = handler.dom.items;
	for(var i=0;i<items.length;i++){
		console.log(items[i].title);
		console.log(items[i].link);
	}
}

var tasks = [checkForRSSFile,readRSSFile,downloadRSSFeed,parseRSSFeed];

function next(err,result){

	if(err)throw err;
	var currentTask = tasks.shift();
	if(currentTask){
		currentTask(result);
	}
}
next();