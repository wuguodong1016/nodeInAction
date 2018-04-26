function run(callback){
	setTimeout(callback,200);
}
var color = 'blue';
run(function(){
	console.log('The color is '+color);
});

//实现一个闭包
(function(color){
	run(function(){
		console.log('The async is '+color);
	})
})(color);
color = 'green';