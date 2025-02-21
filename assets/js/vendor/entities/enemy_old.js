/* enemy entities */

SpikeEnemy = function() {
	
	this.data = {
		
		sprite: null,
		name: 'Spike',
		id:0,
		row:0,
		column:0,
		room:null,
		movement_intervall_id:0,
		is_moving:false,
		attack_x:0,
		attack_y:0,
		start_x:0,
		start_y:0,
		movement_speed:16,
		return_speed:4,
		state:'idle',
		cooldown: 0,
		cooldown_time:50,
		
		
	}
	
	this.createEnemySprite = function(x,y) {
		
		enemytexture = PIXI.utils.TextureCache['assets/sprites/dungeon/enemy.png'];
		enemySprite = new PIXI.Sprite(enemytexture);
		
		enemySprite.x = x;
		enemySprite.y = y;
		
		this.data.start_x = x;
		this.data.start_y = y;
		
		enemySprite.anchor.x = 0.5;
		enemySprite.anchor.y = 0.5;
		
		this.data.sprite = enemySprite;

		
	}
	
	this.updateEnemy = function() { 
			
		//check the status of the enemy
		switch(this.data.state) {
			
			case 'idle':
				break;
			
			case 'start':
				break;
				
			case 'attack':
				this.moveEnemy();
				break;
				
			case 'return':
				this.moveEnemy();
				break;
				
			case 'returned':
				this.moveEnemy();
				break;
			
			
		}
			
	}
	
	this.moveEnemy = function() {
		
		
		if((this.data.sprite.x !== this.data.attack_x || this.data.sprite.y !== this.data.attack_y) && this.data.state === 'attack') {
		
			if(this.data.sprite.x > this.data.attack_x) {
				this.data.sprite.x -= this.data.movement_speed;
	
			}
			if(this.data.sprite.x < this.data.attack_x) {
			
				this.data.sprite.x += this.data.movement_speed;
	
			}
			
			if(this.data.sprite.y > this.data.attack_y) {
				this.data.sprite.y -= this.data.movement_speed;
	
			}
			if(this.data.sprite.y < this.data.attack_y) {
				this.data.sprite.y += this.data.movement_speed;
	
			}
			
		}
		else if((this.data.sprite.x === this.data.attack_x || this.data.sprite.y === this.data.attack_y) && this.data.state === 'attack') {
		
			this.data.state = 'return';
			
			//console.log('returning');
		}
		
		if((this.data.sprite.x !== this.data.start_x || this.data.sprite.y !== this.data.start_y) && this.data.state === 'return') {
			
			if(this.data.sprite.x > this.data.start_x) {
				this.data.sprite.x -= this.data.return_speed;
	
			}
			if(this.data.sprite.x < this.data.start_x) {
				this.data.sprite.x += this.data.return_speed;
	
			}
			
			if(this.data.sprite.y > this.data.start_y) {
				this.data.sprite.y -= this.data.return_speed;
	
			}
			if(this.data.sprite.y < this.data.start_y) {
				this.data.sprite.y += this.data.return_speed;
	
			}
			
		}
		else if((this.data.sprite.x === this.data.start_x || this.data.sprite.y === this.data.start_y) && this.data.state === 'return') {
			
			//console.log('returned');
			this.data.state = 'returned';

		}
		else if(this.data.state === 'returned' && this.data.cooldown >= this.data.cooldown_time) {
			//console.log('ended');
			this.data.is_moving = false;
			this.data.state = 'idle';
			this.data.cooldown = 0;
		}
		else if(this.data.state === 'returned' && this.data.cooldown < this.data.cooldown_time) {
			this.data.cooldown++;
		}
		
	}
		
}


/* KNIGHT */

KnightEnemy = function() {
	
	this.data = {
		
		sprite: null,
		name: 'Knight',
		id:0,
		row:0,
		column:0,
		room:null,
		movement_intervall_id:0,
		is_moving:false,
		attack_x:0,
		attack_y:0,
		start_x:0,
		start_y:0,
		movement_speed:16,
		return_speed:4,
		state:'idle',
		cooldown: 0,
		cooldown_time:50,
		
		
	}
	
	this.createEnemySprite = function(x,y) {
		
		enemytexture = PIXI.utils.TextureCache['assets/sprites/dungeon/enemy.png'];
		enemySprite = new PIXI.Sprite(enemytexture);
		
		enemySprite.x = x;
		enemySprite.y = y;
		
		this.data.start_x = x;
		this.data.start_y = y;
		
		enemySprite.anchor.x = 0.5;
		enemySprite.anchor.y = 0.5;
		
		this.data.sprite = enemySprite;

		
	}
	
	this.updateEnemy = function() { 
			
		//check the status of the enemy
/*
		switch(this.data.state) {
			
			case 'idle':
				break;
			
			case 'start':
				break;
				
			case 'attack':
				this.moveEnemy();
				break;
				
			case 'return':
				this.moveEnemy();
				break;
				
			case 'returned':
				this.moveEnemy();
				break;
			
			
		}
*/
			
	}
	
	this.moveEnemy = function() {
		
		
		
		
	}
		
}
