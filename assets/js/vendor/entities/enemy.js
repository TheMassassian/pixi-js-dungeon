/* enemy entities */

Enemy = function() {
	
	this.data = {
		
		id:0,
		type:'',
		name:'',
		health: 100,
		sprite: null,
		path: []
		
	};
	
	this.createEnemySprite = function(x,y) {
		
		enemytexture = PIXI.utils.TextureCache['assets/sprites/dungeon/enemy.png'];
		enemySprite = new PIXI.Sprite(enemytexture);
		
		enemySprite.x = x;
		enemySprite.y = y;
		
/*
		this.data.start_x = x;
		this.data.start_y = y;
*/
		
		enemySprite.anchor.x = 0.5;
		enemySprite.anchor.y = 0.5;
		
		this.data.sprite = enemySprite;

		
	}
	
	this.updateEnemy = function() {
		
		if(this.data.health <= 0) {
			
			console.log('Enemy defeated');
			
		}
		
		
	}
		
}

KnightEnemy = function() {

	Enemy.apply(this,arguments)
	
	this.talk = function(){
		
		console.log('hi I\'m the Knight');
		
	}
	
	this.calculatePath = function() {
		
		//get the position of the player
		player_pos = player.data.display_container.position;
		
		//enemey position
		enemy_pos = this.data.sprite.position;
		
		console.log(player_pos);
		console.log(enemy_pos);
		
		x_diff = player_pos.x - enemy_pos.x;
		y_diff = player_pos.y - enemy_pos.y;
		
		console.log(x_diff);
		console.log(y_diff);
		
	}
	
	
	
}



