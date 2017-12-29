
var ctx = document.getElementById("canvas");
var c = ctx.getContext("2d");

// clip
c.save();
c.rect(0,0,150,150);
c.clip();

c.strokeStyle = "black";
c.lineWidth = 5 ;
c.beginPath();
// c.arc(100,100,20,(Math.PI/180)*0,(Math.PI/180)*270, true );
c.moveTo(150,0);
c.bezierCurveTo(50,125,300,175,150,300);
c.stroke();
c.closePath();

c.fillStyle="red";
c.fillRect(50,125,5,5);
c.fillStyle="green";
c.fillRect(300,175,5,5);
c.fillStyle="#00F";
c.fillRect(150,300,5,5);

c.restore();
c.beginPath();
c.rect(0,0,1000,1000);
c.clip();
c.beginPath();
c.arc(200,200,200,(Math.PI/180)*0,(Math.PI/180)*360, true);
c.stroke();
c.closePath();

// c.lineCap = "round";
// c.lineJoin = "bevel";
// c.beginPath();
// c.moveTo(0,0);
// c.lineTo(25,0);
// c.lineTo(25,25);
// c.stroke();
// c.closePath();
// 
// c.beginPath();
// c.moveTo(10,50);
// c.lineTo(35,50);
// c.lineTo(35,75);
// c.stroke();
// c.closePath();
// 
// c.lineJoin = "miter";
// c.lineCap = "square";
// c.beginPath();
// c.moveTo(10,100);
// c.lineTo(35,100);
// c.lineTo(35,125);
// c.stroke();
// c.closePath();

