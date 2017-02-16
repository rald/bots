function Player(x,y,radius,heading) {
	this.x=x;
	this.y=y;
	this.px=x;
	this.py=y;
	this.radius=radius;
	this.heading=heading;
	this.hold=false;
	this.nextBulletCounter=0;
	this.nextBulletCounterMax=10;

	this.update=function(enemies,walls) {
		this.heading=Math.atan2(mouseY-this.y,mouseX-this.x);
		if(mouseButtonLeftIsDown) {
			this.nextBulletCounter++;
			if(this.nextBulletCounter>=this.nextBulletCounterMax) {
				this.nextBulletCounter=0;
				var bulletRadius=2;
				var bulletSpeed=4;
				var x=this.x+(this.radius+bulletRadius/2)*Math.cos(this.heading);
				var y=this.y+(this.radius+bulletRadius/2)*Math.sin(this.heading);
				bullets.push(new Bullet(x,y,bulletRadius,this.heading,bulletSpeed));
				var shotSound=new Audio("data/sounds/shot.wav");
				shotSound.play();
				this.hold=true;
			}
		}
		if(mouseButtonRightIsDown) {
			this.px=this.x; this.py=this.y;
			this.x+=Math.cos(this.heading);
			this.y+=Math.sin(this.heading);
			for(var i=0;i<walls.length;i++) {
				if(playerWallHit(this,walls[i])) {
					this.x=px;
					this.y=py;
				}
			}
			for(var i=0;i<enemies.length;i++) {
				if(playerEnemyHit(this,enemies[i])) {
					this.x=px;
					this.y=py;
				}
			}
		}
	}
	
	this.draw=function() {
		setColor("#008000");
		circle(this.x,this.y,this.radius,true);
		setColor("#00FF00");
		circle(this.x,this.y,this.radius,false);
		var x=this.x+this.radius*Math.cos(this.heading);
		var y=this.y+this.radius*Math.sin(this.heading);
		line(this.x,this.y,x,y);
	}
}

function playerWallHit(player,wall) {
	var distX = Math.abs(player.x - wall.x-wall.width/2);
	var distY = Math.abs(player.y - wall.y-wall.height/2);
	if (distX > (wall.width/2 + player.radius)) { return false; }
	if (distY > (wall.height/2 + player.radius)) { return false; }
	if (distX <= (wall.width/2)) { return true; } 
	if (distY <= (wall.height/2)) { return true; }
	var dx=distX-wall.width/2;
	var dy=distY-wall.height/2;
	return (dx*dx+dy*dy<=(player.radius*player.radius));
}

function playerEnemyHit(player,enemy) {
	return distance(player,enemy)<player.radius+enemy.radius;
}
