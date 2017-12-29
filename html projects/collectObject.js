

$(document).ready(function(){
	var maxX = $(window).width();
	var maxY = $(window).height()-80;
	var basketX = parseInt($(".basket").css("width"))/2;
	var basketY = parseInt($(".basket").css("height"))/2;
	var ballR = 30;
	var score=0;
	var time_per_frame=10;
	var fall_speed;

	$("button#start").click(function(){
		gameStart();
	});
	// $("button#end").click(function(){
	// 	$("body").off();
	// });
	
	function gameStart(){
		var basket_posX;
		var basket_posY;
		basket_posX=300;
		basket_posY=300;

		var c = document.getElementById("myCanvas");
		var ctx = c.getContext("2d");
		$("#myCanvas").attr("width",maxX+"px");
		$("#myCanvas").attr("height",maxY+"px");
		var initialY=0;
		var initialX=Math.floor(Math.random()*(maxX-ballR)+ballR); 
		var frameTime = setInterval(update,time_per_frame);
		var createBall_timer = setInterval(createBall,600);
		// $("body").bind("mousemove",mouseMoving);
		document.body.addEventListener("mousemove",mouseMoving);

		
		// ============================================
		var ballList= new Array();
		function createBall(){
			ballList.push(new myBall());
		}

		function myBall(){
			this.x= Math.floor(Math.random()*(maxX-ballR)+ballR);
			this.y= 0;
			this.draw= function(){drawCircle(this.x,this.y);};
			this.touchGround = function(){
				if (this.y+ballR+3 > maxY){clearInterval(frameTime);}};
			this.touchBall = function(){
				if (ballCollide(basket_posX,basket_posY,this.x-ballR,this.y-ballR)){
					return true;
				} return false; };
		}
		function update(){
			new_coor = detectCollision(basket_posX,basket_posY);
			$(".basket").css({"top":new_coor[1]+"px","left":new_coor[0]+"px"});
			ctx.clearRect(0,0,maxX,maxY);
			fall_speed= Math.floor(score/2)+1;
			for (var i=0; i<ballList.length; i++){
				var ball = ballList[i];
				ball.y += fall_speed;
				ball.draw();
				ball.touchGround();
				if (ball.touchBall()) {ballList.splice(i,1);}
			}
			$("#score").text("score: "+score);
			$("#speed").text("speed: "+fall_speed);
		}

		function mouseMoving (event){
			basket_posX=event.pageX - basketX;
			basket_posY=event.pageY - basketY;
		}

		function ballCollide(x1,y1,x2,y2){
			if ((x1<x2+2*ballR) && (x2<x1+2*basketX) && (y1<y2+2*ballR) && (y2<y1+2*basketY)){
				score++;
				return true;
			}	return false;
		}
		function drawCircle(x,y){
			ctx.beginPath();
			ctx.arc(x,y,ballR,0,2*Math.PI);
			ctx.fillStyle="yellow";
			ctx.fill();
			ctx.stroke();
		}
		function detectCollision(x,y){
			// $("p#demo").text(event.pageX+", "+event.pageY);
			var coor=[x,y];
			if (x<0) { coor[0]=0;} 
			if ((x+2*basketX)>=maxX) { coor[0]=maxX-2*basketX;}
			if (y<0) {coor[1]=0;}
			if ((y+2*basketY)>=maxY) { coor[1]=maxY-2*basketY;}
			// console.log(coor);
			return coor;
		}
	}


});