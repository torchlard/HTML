
var count=0;

$(document).ready(function(){
// 	var txt = $("<hr>");
// 	$("section .faq-lists ul p").append(txt);
// });

	var txt = $("<hr>");
	var pp= $("article .faq-lists ul p");
	var li = $("article .faq-lists ul li");

	li.append("<i class='fa-angle-down'></i>");
	// li.append("<i class='fa-angle-up'></i>");
	pp.after("<hr>");
	li.click(function(){
		$(this).children("i").toggleClass("rotation");
		$(this).next("p").slideToggle();
	});

	var footer_p = $("footer .footer-right p");
	// footer_p.before("<hr>");
	// $("footer .footer-right hr").addClass("css_cell");
	footer_p.addClass("css_cell_hr");

});





