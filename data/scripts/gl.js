var canvas=document.getElementById("canvas");
var context=canvas.getContext("2d");
var width=0,height=0;
var mouseX=0,mouseY=0,mouseButton=-1;
var mouseButtonLeftIsDown=false;
var mouseButtonRightIsDown=false;

function distance(p1,p2) {
	return Math.sqrt(Math.pow(p2.x-p1.x,2)+Math.pow(p2.y-p1.y,2));
}

function radians(degrees) {
	return degrees*Math.PI/180;
}

function setSize(w,h) {
	canvas.width=w;
	canvas.height=h;
	width=w;
	height=h;
}

function setColor(style) {
	context.fillStyle=style;
	context.strokeStyle=style;
}

function plot(x,y) {
	context.fillRect(x,y,1,1);
}

function line(x1,y1,x2,y2) {
	context.beginPath();	
	context.moveTo(x1,y1);
	context.lineTo(x2,y2);
	context.stroke();
	context.closePath();
}

function circle(x,y,radius,filled) {
	if(filled) {
		context.beginPath();
		context.arc(x,y,radius,0,2*Math.PI);
		context.fill();
	} else {
		context.beginPath();
		context.arc(x,y,radius,0,2*Math.PI);
		context.stroke();
	}
}

function rect(x,y,width,height,filled) {
	if(filled) {
		context.fillRect(x,y,width,height);
	} else {
		context.rect(x,y,width,height);
		context.stroke();
	}
}

function getMousePos(e) {
	var rect=canvas.getBoundingClientRect();
	return {
		x:e.clientX-rect.left,
		y:e.clientY-rect.top
	};
}

function mouseDown(e) {
	mouseButton=e.button;
	switch(mouseButton) {
		case 0: mouseButtonLeftIsDown=true; break;
		case 2: mouseButtonRightIsDown=true; break;
	}
}

function mouseUp(e) {
	mouseButton=e.button;
	switch(mouseButton) {
		case 0: mouseButtonLeftIsDown=false; break;
		case 2: mouseButtonRightIsDown=false; break;
	}
}

function mouseMove(e){
	var mousePos=getMousePos(e);
	mouseX=mousePos.x;
	mouseY=mousePos.y;
}

canvas.addEventListener("mousedown",mouseDown);
canvas.addEventListener("mouseup",mouseUp);
canvas.addEventListener("mousemove",mouseMove);
canvas.addEventListener("contextmenu",function(e){e.preventDefault();});			
