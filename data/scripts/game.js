var fps=60;
var player;
var enemies=[];
var bullets=[];
var walls=[];
var explosions=[];
var animationInterval;

function setup() {
	setSize(500,500);
	
	player=new Player(width/2,height/2,10,0);
	
	for(var j=0;j<6;j++) {
		for(var i=0;i<6;i++) {
			var x=(i*2+1)*40;
			var y=(j*2+1)*40;
			walls.push(new Wall(x,y,20,20));
		}
	}

	for(var j=0;j<5;j++) {
		for(var i=0;i<5;i++) {
			if(i!=2 || j!=2) {
				var x=i*2*40+90;
				var y=j*2*40+90;
				enemies.push(new Enemy(x,y,10,radians(Math.floor(Math.random()*360))));
			}
		}
	}
		
	animationInterval=setInterval(animation,1000/fps);
}

function update() {

	player.update(enemies,walls);
		
	for(var i=0;i<enemies.length;i++) {
		enemies[i].update(player,walls);
	}

	for(var i=0;i<enemies.length;i++) {
		if(!enemies[i].active) {
			enemies.splice(i,1);
		}
	}
	
	for(var i=0;i<bullets.length;i++) {
		bullets[i].update(enemies,walls,explosions);
	}
	
	for(var i=0;i<bullets.length;i++) {
		if(!bullets[i].active) {
			var radiusMin=0;
			var radiusMax=bullets[i].radius*2;
			explosions.push(new Explosion(bullets[i].x,bullets[i].y,radiusMin,radiusMax));
			bullets.splice(i,1);
			var explosionSound=new Audio("data/sounds/explosion.wav");
			explosionSound.play();			
		}
	}

	for(var i=0;i<explosions.length;i++) {
		explosions[i].update();
	}
	
	for(var i=0;i<explosions.length;i++) {
		if(!explosions[i].active) {
			explosions.splice(i,1);
		}
	}

	
}

function draw() {

	setColor("black");
	
	rect(0,0,width,height,true);

	for(var i=0;i<walls.length;i++) {
		walls[i].draw();
	}

	for(var i=0;i<bullets.length;i++) {
		bullets[i].draw();
	}

	for(var i=0;i<enemies.length;i++) {
		enemies[i].draw();
	}

	for(var i=0;i<explosions.length;i++) {
		explosions[i].draw();
	}

	player.draw();	
}

function animation() {
	update();
	draw();
}

setup();
