function Wall(x,y,width,height) {
	this.x=x;
	this.y=y;
	this.width=width;
	this.height=height;
	
	this.draw=function() {
		setColor("#008000");
		rect(this.x,this.y,this.width,this.height,true);
		setColor("#00FF00");
		rect(this.x,this.y,this.width,this.height,false);
	}
}
