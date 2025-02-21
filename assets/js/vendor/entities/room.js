/* Room Entity */

Room = function(){
	
	this.data = {
		
		name: '',
		row_start:0,
		row_end:0,
		column_start:0,
		column_end:0,
		x_start:0,
		x_end:0,
		y_start:0,
		y_end:0,
		type: 'normal', //types are normal, enemies, boss, item, puzzle
		puzzle: null,
		item: null,
		enemies: null,
		north_door: null,
		east_door: null,
		south_door: null,
		west_door: null,
		display_container: new PIXI.Container(),
		player_in_room: false,
		walls: [],
		doors: [],
		items:[],
		enemies:[],
		north_room: null,
		east_room: null,
		south_room: null,
		west_room: null,
		
	}
	
	this.setNeighbourRooms = function() {
		
/*
		console.log(this.data.x_start);
		console.log(this.data.y_start);
*/
		
		//north
		northRoom = dungeon.getRoomByColumnAndRow(this.data.column_end, this.data.row_start-1);	
		if(northRoom) {	
			this.data.north_room = northRoom;		
		}

		//east
		eastRoom = dungeon.getRoomByColumnAndRow(this.data.column_end+1, this.data.row_start);	
		if(eastRoom) {	
			this.data.east_room = eastRoom;		
		}
		
		//south
		southRoom = dungeon.getRoomByColumnAndRow(this.data.column_end, this.data.row_end+1);	
		if(southRoom) {	
			this.data.south_room = southRoom;		
		}
		
		//west
		westRoom = dungeon.getRoomByColumnAndRow(this.data.column_start-1, this.data.row_start);	
		if(westRoom) {	
			this.data.west_room = westRoom;		
		}
		
			
	}

	
	this.checkPlayerInRoom = function() {
		
		
		
	}
	
	this.updateRoom = function() {
		
		this.checkEnemies();
		player.checkSpikeEnemy();

	}
	
	
	this.checkEnemies = function() {
		
		enemies = dungeon.data.active_room.data.enemies;
		
		if(enemies.length > 0) {
			
			for(i = 0; i < enemies.length; i++) {
				
				enemies[i].updateEnemy();
				
				if(enemies[i].data.sprite.y === player.data.display_container.y || enemies[i].data.sprite.x === player.data.display_container.x) {
					
					//console.log('attack!');
					
					//check if the enemy is already moving
					if(enemies[i].data.is_moving === false && enemies[i].data.state === 'idle') {
						
						enemies[i].data.is_moving = true;
						enemies[i].data.state = 'attack';
						
						//enemies[i].data.attack_x = player.data.display_container.x;
						//enemies[i].data.attack_y = player.data.display_container.y;
						
						//instead of setting the attack position to the player - set it to the middle
						if(enemies[i].data.sprite.y === player.data.display_container.y) {
							
							if(enemies[i].data.sprite.x > player.data.display_container.x) {
								enemies[i].data.attack_x = enemies[i].data.sprite.x - (5*32)+32;
							}
							else {
								enemies[i].data.attack_x = enemies[i].data.sprite.x + (5*32)-32;
							}
							enemies[i].data.attack_y = player.data.display_container.y;
							
						}
						else if(enemies[i].data.sprite.x === player.data.display_container.x){	
							
							if(enemies[i].data.sprite.y > player.data.display_container.y) {			
								enemies[i].data.attack_y = enemies[i].data.sprite.y - (4*32)+32;			
							}
							else {
								enemies[i].data.attack_y = enemies[i].data.sprite.y + (4*32)-32;	
							}		
							enemies[i].data.attack_x = player.data.display_container.x;
							
						}
						
						
						
						enemies[i].data.is_moving = true;

						
					}
					
				}
				
			}
			
		}
		
	}
	
}