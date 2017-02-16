function Explosion(x,y,radiusMin,radiusMax) {
	this.x=x;
	this.y=y;
	this.radiusMin=radiusMin;
	this.radiusMax=radiusMax;	
	this.radius=radiusMin;
	this.speed=1;
	this.active=true;
	
	this.update=function() {
		if(this.active) {
			this.radius+=this.speed;
			if(this.speed>0 && this.radius>=this.radiusMax) this.speed=-this.speed;
			if(this.speed<0 && this.radius<=this.radiusMin) {
				this.active=false;
			}
		}
	}
	
	this.draw=function() {
		if(this.active) {
			setColor("yellow");
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
