function showdrop(num) {
    document.getElementById(("Dropdown"+num)).classList.toggle("show");
};
// Close the dropdown if the user clicks outside of it
function removeDrop(){
  window.onclick = function(e) {
  for (var num=1; num<=3; num++){
    if (!e.target.matches(('.dropbtn'+num))){
      var dropdowns = document.getElementsByClassName(("dropdown-content"+num));
      // console.log(dropdowns);
      for (var d = 0; d < dropdowns.length; d++) {
        var openDropdown = dropdowns[d];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
      }}}
  }}
};

$(document).ready(function(){
	$("#bars").click(function(){
		$("ul.side-bar").toggle();
	});
});

$(document).scroll(function(){
	var pos = $(document).scrollTop();
	var nav_pos = 70-pos;
	var sidebar_pos = 110-pos;
	// $("#change").text(nav_pos);
	if (nav_pos > 0 ){
		$("ul.nav").css({ "top":nav_pos.toString()+"px" });
		$("ul.side-bar ,.dropdown").css({ "top":sidebar_pos.toString()+"px" });
	} else {
		$("ul.nav").css({ "top":"0px" });
		$("ul.side-bar ,.dropdown").css({ "top":"40px" });
	}
	
	removeDrop();

});

// console.log(document.getElementById("try").classList.length);


// function showdrop(){
// 	document.getElementById("myDropdown").classList.toggle("show");
// }

// window.onclick = function(e){
// 	if (!e.target.matches(".dropbtn")){
// 		var dropdowns = document.getElementsByClassName("dropdown-content");
// 		for (var d=0; d<dropdowns.length; d++){
// 			var openDropdown = dropdowns[d];
// 			if (openDropdown.classList.contains("show")){
// 				openDropdown.classList.remove("show");
// 			}
// 		}
// 	}
// }








