var ctx = document.getElementById("canvas");
var c = ctx.getContext("2d");

c.fillStyle = "red";
c.shadowOffsetX = 40;
c.shadowOffsetY = 4;
c.shadowColor = 'black';
c.shadowBlur = 5;
c.fillRect(10,10,100,100);

// var fillImg = new Image();
// fillImg.src = '/home/lkit/tmp/flower2.jpeg';
// fillImg.onload = function(){
//     var fillPattern = c.createPattern(fillImg, 'repeat');
//     c.fillStyle = fillPattern;
//     c.fillRect(0,0,200,200);
// }

// c.fillStyle = "black";
// c.fillRect(10,10,200,200);
// 
// var gr = c.createLinearGradient(1,1,50,20);
// var gr = c.createRadialGradient(50,50,25,25,25,20);
// gr.addColorStop(0,'rgb(255,0,0)');
// gr.addColorStop(.5,"#0f0");
// gr.addColorStop(1,"#f00");
// c.fillStyle = gr;
// c.fillRect(1,1,50,50);
// 
// c.globalCompositeOperation = "source-over";
// c.fillRect(60,1,50,50);
// 
// c.globalCompositeOperation = "xor";
// c.fillRect(1,60,50,50);
// 
// c.globalAlpha = .5;
// c.globalCompositeOperation = "source-atop";
// c.fillRect(60,60,50,50);


