
window.onload = function(){

var mx,my,oldMx,oldMy;
var transX, transY;
var step=100;
var start_drag;
var text = document.getElementById('text');
var svg = document.getElementById('svg');
var framing = document.getElementById('framing');
var fontsize;
var frame_width= parseInt($(".svg_frame").css('width'));
var frame_height=parseInt($(".svg_frame").css('height'));

start_drag = false;
fontsize=parseInt(text.getAttribute('font-size'));

$("button#large").click(function(){text.setAttribute('font-size',fontsize+=5);})
$("button#small").click(function(){text.setAttribute('font-size',fontsize-=5);})
setCenter();
svg.addEventListener('mousemove',function(event){traceMouse(event);},false);
document.body.addEventListener('mousewheel',function(event){
	var flag; traceMouse(event);enlargeSVG(event);},false);
svg.addEventListener('mousedown',dragStart,false);
document.body.addEventListener('mouseup',dragEnd,false);

function setCenter(){
	var box_height = parseInt(svg.getAttribute('height'));
	var box_width = parseInt(svg.getAttribute('width'));
	transX = frame_width/2-box_width/2;
	transY = frame_height/2-box_height/2;
	svg.style.transform = "translate("+transX+"px,"+transY+"px)";
}
function traceMouse(event){
	var svg_coor = svg.getBoundingClientRect();
	var framing_coor = framing.getBoundingClientRect();
	mx = event.clientX - svg_coor.left;	
	my = event.clientY - svg_coor.top;
	if (start_drag==true){
		var frameX = event.clientX - framing_coor.left;
		var frameY = event.clientY - framing_coor.top;
		transX = frameX - oldMx;
		transY = frameY - oldMy;
		svg.style.transform = "translate("+transX+"px,"+transY+"px)";
	}

}

function enlargeSVG(e){
	var size,scale; 
	var oldTransX = transX;  var oldTransY = transY;
	size = parseInt(svg.getAttribute('height'));
	var delta = Math.max(-1,Math.min(1,(e.wheelDelta || -e.detail))); 	// -1 to 1
	size = Math.max(200, Math.min(1500,size+delta*step));
	svg.setAttribute('height',size);
	svg.setAttribute('width',size);
	if (size!=200 && size!=1500) {flag=true;}
	if (flag == true){
		if (delta==1) scale = size/(size-step);
		else if (delta==-1) scale = size/(size+step);
		var dx = (scale-1)*mx;	// find distance moved for chosen point
		var dy = (scale-1)*my;
		transX = oldTransX-dx;
		transY = oldTransY-dy;

		svg.style.transform = "translate("+transX+"px,"+transY+"px)";
		if (size==200 || size==1500) {flag=false;}
	}
} 

function dragStart(){
	start_drag = true;
	oldMx = mx;  oldMy=my;
}
function dragEnd(){
	start_drag = false;
}

};