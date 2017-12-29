var brick_width=100;	var brick_height=25;	var padding=10;
var ballR=10;	var vx=5;  var vy=5;
var wall_width=1300; var wall_height=1200;  var wall_thick=20;
var board_length=110;  var board_height=10;
var maxX = $(window).width();
var maxY = $(window).height();
var brickArray = new Array();
var ball;		var board;

$(document).ready(function(){
	var c=document.getElementById("myCanvas");
	var ctx=c.getContext("2d");
	$("#myCanvas").attr("width",maxX+"px");
	$("#myCanvas").attr("height",maxY+"px");
	$("#result").text("Click to Start");
	drawBoundary();

	$("#myCanvas").click(function(){
		initialBrick(11,6);
		ball= new Ball(500,500,-3*3,-3*3);
		board = new Board(500);		

		$("#result").text("");
		document.addEventListener("keydown",boardMoving,false);
		document.addEventListener("mousemove",mouseMoving,false);
		var gameframe = setInterval(gameLoop,30);	

	function gameLoop(){
		gameOver();
		ctx.clearRect(0,0,maxX,maxY);
		ball_wall();
		board_wall();	
		ball_board(); 
		ball_brick();
		ball.draw();
		board.draw();
		drawBoundary();
	}
// =======================================
	function boardMoving(event){
		var keyPressed = String.fromCharCode(event.keyCode);
		if (keyPressed=="J")	{ board.x-=50; }
		else if (keyPressed=="L")  {board.x+=50;}
		board.draw();
	}
	function mouseMoving(event){
		board.x=event.pageX-(board_length/2)-50;
		board.draw();
	}
	function Board(x){
		this.x=x; this.y=maxY-100;
		this.draw = function(){
			ctx.beginPath();
			ctx.fillStyle="#505050";
			ctx.fillRect(this.x,this.y,board_length,board_height);
	
			// console.log(this.x);
		}
	}
	function Ball(x,y,vx,vy){
		this.x=x; this.y=y; this.vx=vx; this.vy=vy;
		this.draw = function(){
			this.x += this.vx;  this.y += this.vy;

			ctx.beginPath();   //very important!!!!!
			ctx.arc(this.x,this.y,ballR,0,2*Math.PI);
			ctx.fillStyle="#5050ff";
			ctx.fill();
		}
	}

	function Brick(x,y){
		this.x=x; this.y=y;
		this.draw = function(){
			ctx.fillStyle="#e00000";
			ctx.fillRect(this.x,this.y,brick_width,brick_height); }
	}
	function initialBrick(row,column){
		for (var i=0; i<row; i++){
			for (var j=0; j<column; j++){
				var ix = i*(brick_width+padding)+50;
				var iy = j*(brick_height+padding)+100;
				brickArray.push([ix,iy]);
	}}}

	function board_wall(){
		if (board.x < 30+5) {board.x=30;}
		else if ((board.x+board_length)>=wall_width-5) {board.x=wall_width-board_length;}
	}
	function ball_wall(){
		if ((wall_thick>ball.x-ballR)||((wall_width)<(ball.x+ballR))){
			ball.vx=-ball.vx;
		} else if ((ball.y+ballR)<(wall_thick)){ball.vy=-ball.vy; }
	}
	function ball_brick(){
		var a=ball.y-ballR; var b=ball.x-ballR; var c=ball.x+ballR; var d=ball.y+ballR;
		for (var index=brickArray.length-1; index>=0; index--){
			var brick = new Brick((brickArray[index])[0],(brickArray[index])[1]);
			var e=brick.y; var f=brick.x; var g=brick.x+brick_width; var h=brick.y+brick_height;
			if (c>=f && b<=g && ((a<=e && d>=e)||(a<=h && d>=h))) {
				ball.vy=-ball.vy;  brickArray.splice(index,1);}
				// console.log("hit"); console.log(ball.vy);}
			else if (d>=e && a<=h && ((b<=f && c>=f)||(c>=g && b<=g))) {
				// console.log("hit");
				ball.vx=-ball.vx;  brickArray.splice(index,1);}
			else { brick.draw();}
		}
	}
	function ball_board(){
		var a=ball.y-ballR; var b=ball.x-ballR; var c=ball.x+ballR; var d=ball.y+ballR;
		var e=board.y; var f=board.x; var g=board.x+board_length; var h=board.y+board_height;
		if (c>f && b<g && a<e && d>e) {
			ball.vy = -Math.abs(ball.vy);
			var parm = (ball.x-(board_length/2+board.x))/(board_length/2);
			if (parm >= 0.7 || parm<=-0.7 )	{ball.vx = parm*8;}
			// console.log(ball.vx);
		}
		// else if (d>e && a<h && ((b<f && c>f)||(c>g && b<g))) {ball.vx=-ball.vx;}
	}
	function gameOver(){
		if (ball.y>(board.y+30)) {all();  $("p#result").text("You lose!");}
		else if (brickArray.length==0) 
			{all();  $("p#result").text("You Win!");}
		function all(){
			clearInterval(gameframe);
			document.removeEventListener("keydown",boardMoving,false);
			document.removeEventListener("mousemove",mouseMoving,false);
		}
	}
	});
	function drawBoundary(){
		ctx.fillStyle="#000000";
		ctx.fillRect(0,0,wall_thick,wall_height);
		ctx.fillRect(0,0,wall_width,wall_thick);
		ctx.fillRect(wall_width,0,wall_thick,wall_height);
	}

});