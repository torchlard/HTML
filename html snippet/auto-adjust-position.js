function resized(){
	var widths = $(window).width();
	// console.log(widths);
	if (widths < 750){
		$("#side").css({"display":"none"});
		$("#content").removeClass("margin-left");
	} else{
		$("#side").css({"display":"block"});
		$("#content").addClass("margin-left");
	}
};

$(document).ready(function(){resized();}); // only run once

$(window).on('resize',function(){resized();});








