$(document).ready(function(){
	var count=300;
	var target = $("ul li#remain");
	target.text(count/100);

	$("svg").click(function(){
		var countDown=3;
		var begin = setInterval(begin_time,1000);

		function begin_time(){
			$("text").attr("x","95");
			$("text").text(countDown+" ..");
			countDown--;
			// start detect click
			if (countDown<0){
				clearInterval(begin);
				$("text").text("Start!");
				$("text").attr("x","75");
				// begin game after 300ms
				setTimeout(gameBegin,300);
			}
		}
		// game loop
		function gameBegin(){
			var mytime = setInterval(count_time,10);
			var clicktime=0;
			$("text").text("Start!");

			// total time=300unit, every 10ms reduce 1 unit
			function count_time(){
				target.text(count/100);
				count--;
				if (count<-1) { gameEnd();}
			}

			// end game effect
			function gameEnd(){
				clearInterval(mytime);
				$("ul").text("Game End.");
				$("ul").css("padding-left","90px");
				$("svg").off('click');
				$("body").append("<div class='gameEnd'></div>");
			}

			$("svg").off().on('click',function(){
				clicktime++;
				$("text").text("Click: "+clicktime);
			});

		}



	});
});