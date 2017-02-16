function Enemy(x,y,radius,heading) {
	this.x=x;
	this.y=y;
	this.radiusMin=radius;
	this.radius=radius;
	this.heading=heading;
	this.time=0;
	this.lifeMax=10;
	this.life=this.lifeMax;
	this.active=true;
	
	this.update=function(player,walls) {
		if(this.active) {
			this.radius=this.radiusMin+Math.sin(radians(this.time));
			this.time+=360/60;
			if(this.time>=360) this.time=0;
		}
	}
	
	this.draw=function() {
		if(this.active) {
			setColor("#202020");
			circle(this.x,this.y,this.life/this.lifeMax*this.radius,true);
			setColor("#505050");
			circle(this.x,this.y,this.radius,false);
		}
	}
}

function enemyWallHit(enemy,wall) {
	var distX = Math.abs(enemy.x - wall.x-wall.width/2);
	var distY = Math.abs(enemy.y - wall.y-wall.height/2);

	if (distX > (wall.width/2 + enemy.radius)) { return false; }
	if (distY > (wall.height/2 + enemy.radius)) { return false; }

	if (distX <= (wall.width/2)) { return true; } 
	if (distY <= (wall.height/2)) { return true; }

	var dx=distX-wall.width/2;
	var dy=distY-wall.height/2;
	return (dx*dx+dy*dy<=(enemy.radius*enemy.radius));
}
