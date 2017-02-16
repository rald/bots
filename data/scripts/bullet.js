function Bullet(x,y,radius,heading,speed) {
	this.x=x;
	this.y=y;
	this.speed=speed;
	this.radius=radius;
	this.heading=heading;
	this.active=true;

	this.update=function(enemies,walls,explosions) {
		if(this.active) {
			this.x+=speed*Math.cos(this.heading);
			this.y+=speed*Math.sin(this.heading);
			if(this.x<0 || this.x>=width-1 || this.y<0 || this.y>=height-1) {
				this.active=false;
			}
			for(var i=0;i<walls.length;i++) {
				if(bulletWallHit(this,walls[i])) {
					this.active=false;
					break;
				}
			}			
			for(var i=0;i<enemies.length;i++) {
				if(bulletEnemyHit(this,enemies[i])) {
					enemies[i].life--;
					if(enemies[i].life<=0) {
						var radiusMin=0;
						var radiusMax=enemies[i].radius*2;
						explosions.push(new Explosion(enemies[i].x,enemies[i].y,radiusMin,radiusMax));
						var explosionSound=new Audio("data/sounds/explosion.wav");
						explosionSound.play();			
						enemies[i].active=false;
					}
					this.active=false;
					break;
				}
			}			
		}
	}
	
	this.draw=function() {
		if(this.active) {
			setColor("#00FF00");
			circle(this.x,this.y,this.radius,true);
		}
	}
}

function bulletWallHit(bullet,wall) {
	var distX = Math.abs(bullet.x - wall.x-wall.width/2);
	var distY = Math.abs(bullet.y - wall.y-wall.height/2);

	if (distX > (wall.width/2 + bullet.radius)) { return false; }
	if (distY > (wall.height/2 + bullet.radius)) { return false; }

	if (distX <= (wall.width/2)) { return true; } 
	if (distY <= (wall.height/2)) { return true; }

	var dx=distX-wall.width/2;
	var dy=distY-wall.height/2;
	return (dx*dx+dy*dy<=(bullet.radius*bullet.radius));
}

function bulletEnemyHit(bullet,enemy) {
	return distance(bullet,enemy)<bullet.radius+enemy.radius;
}
