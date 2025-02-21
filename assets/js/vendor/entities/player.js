/* Player Entity */

Player = function() {
	
	/* #### DATA #### */
	this.data = {
		
		health:3,
		max_health:20,
		display_container: new PIXI.Container(),
		sprite: null,
		is_moving_x: false,
		is_moving_y: false,
		inventory: new Inventory(),
		number_of_keys: 0,
		
	}	
	
	/* #### SPRITES #### */
	this.createPlayer = function() {
		
		var texture = PIXI.utils.TextureCache['assets/sprites/player/playertest.png'];
		playerSprite = new PIXI.Sprite(texture);
		playerSprite.anchor.x = 0.5;
		playerSprite.anchor.y = 0.5;
		//playerSprite.scale.x = scale;
		//playerSprite.scale.y = scale;
	
		this.data.sprite = playerSprite;
		this.data.display_container.addChild(playerSprite);
		player.data.display_container.x = (6 * 32) + 48
		player.data.display_container.y = (20 * 32) + 16
		
		
		
		stage.addChild(this.data.display_container);
		
	}
	
	/* #### COLLISION #### */
	this.checkWallCollision = function(direction, speed) {
		
		willCollide = false;

		walls = dungeon.data.active_room.data.walls;
		
		for(i = 0; i < walls.length; i++) {
			
			if(this.overlapWall(speed, direction, walls[i])) {
				
				willCollide = true;
				break;
			}
			
		}
		
		return willCollide;
		
	}
	
	this.overlapWall = function(speed, direction, wall) {
		collide = false;
		
	
		switch(direction) {
			
			case 'right':
			
				playerX = player.data.display_container.x + speed;
				playerY = player.data.display_container.y;
				
				break;
				
			case 'left':
			
				playerX = player.data.display_container.x - speed;
				playerY = player.data.display_container.y;
				
				
				break;
				
			case 'up':
			
				playerX = player.data.display_container.x;
				playerY = player.data.display_container.y - speed;
				
				
				break;
				
			case 'down':
			
				playerX = player.data.display_container.x;
				playerY = player.data.display_container.y + speed;
				
				break;
			
		}
	
		diff = 16 + speed;
	
		objectStartX = wall.x - diff;
		objectEndX = wall.x + diff;
		objectStartY = wall.y -diff;
		objectEndY = wall.y + diff;
		
		return (playerX >= objectStartX && playerX <= objectEndX) && (playerY >= objectStartY && playerY <= objectEndY);
	}
	
	this.overlapDoor = function(speed, direction, door) {
		
		collide = false;
		diff = 8 + speed;
			
		//check if the door is locked
		if(door.data.locked === true) {
			
			diff = 16 + speed;
			
		}
		
		switch(direction) {
			
			case 'right':
			
				playerX = player.data.display_container.x + speed;
				playerY = player.data.display_container.y;
				
				break;
				
			case 'left':
			
				playerX = player.data.display_container.x - speed;
				playerY = player.data.display_container.y;
				
				
				break;
				
			case 'up':
			
				playerX = player.data.display_container.x;
				playerY = player.data.display_container.y - speed;
				
				
				break;
				
			case 'down':
			
				playerX = player.data.display_container.x;
				playerY = player.data.display_container.y + speed;
				
				break;
			
		}
		
		objectStartX = door.data.sprite.x - diff;
		objectEndX = door.data.sprite.x + diff;
		objectStartY = door.data.sprite.y -diff;
		objectEndY = door.data.sprite.y + diff;
		
		return (playerX >= objectStartX && playerX <= objectEndX) && (playerY >= objectStartY && playerY <= objectEndY);
	}
	
	/* #### MECHANICS #### */
	this.checkDoorCollision = function(direction) {
		
		
		
		keydoor = false;
		
		doors = dungeon.data.active_room.data.doors;
	
		for(i = 0; i < doors.length; i++) {
			
			if(this.overlapDoor(0, direction, doors[i]) && doors[i].data.locked !== true) {
				
				//if the player collides with the door leading to the next room
				switch(doors[i].data.position) {
					
					case 'north':
						
						//get the entering room
						enteringRoom = doors[i].data.room.data.north_room;
						
						console.log(enteringRoom.data);
									
						//transport the player and move the camera	
						player.data.display_container.y = enteringRoom.data.south_door.data.sprite.y - 8;
						moveCameraToY((enteringRoom.data.row_start-1) * 32);
						
						//set the new active room
						enteringRoom.data.player_in_room = true;
						dungeon.data.active_room = enteringRoom;
						doors[i].data.room.data.player_in_room = false;
						
						break;
						
					case 'east':
						
						//get the entering room
						enteringRoom = doors[i].data.room.data.east_room;
						
						player.data.display_container.x = enteringRoom.data.west_door.data.sprite.x + 8;
						
						moveCameraToX((enteringRoom.data.column_start-1) * -32);
						
						//set the new active room
						enteringRoom.data.player_in_room = true;
						dungeon.data.active_room = enteringRoom;
						doors[i].data.room.data.player_in_room = false;
						
						break;
						
					case 'south':
						
						//get the entering room
						enteringRoom = doors[i].data.room.data.south_room;
						
						player.data.display_container.y = enteringRoom.data.north_door.data.sprite.y + 8;
						
						moveCameraToY((enteringRoom.data.row_start-1) * -32);
						
						//set the new active room
						enteringRoom.data.player_in_room = true;
						dungeon.data.active_room = enteringRoom;
						doors[i].data.room.data.player_in_room = false;
						
						break;
						
					case 'west':
						
						//get the entering room
						enteringRoom = doors[i].data.room.data.west_room;
						
						player.data.display_container.x = enteringRoom.data.east_door.data.sprite.x - 8;
						
						moveCameraToX((enteringRoom.data.column_start-1) * -32);
						
						//set the new active room
						enteringRoom.data.player_in_room = true;
						dungeon.data.active_room = enteringRoom;
						doors[i].data.room.data.player_in_room = false;
						
						break;
					
				}
				
				break;
			}
			else if(this.overlapDoor(8, direction, doors[i]) && doors[i].data.locked === true) {
					
				keydoor = true;
				
				//if the player has a key, use it to unlock the door
				if(player.data.number_of_keys > 0) {
					
					player.data.number_of_keys--;
					doors[i].unlockDoor();
					
					
				}
				
				break;	
				
			}
			
		}
		
		return keydoor;
		
	}
	
	
	/* #### ITEM COLLISION #### */
	
	this.checkItemCollision = function() {
		
		items = dungeon.data.active_room.data.items;
		
		if(items.length > 0) {
			
			for(i = 0; i < items.length; i++) {
				
				if(items[i].data.collected !== true) {
					
					if(this.overlapItem(0, items[i])) {
					
						switch(items[i].data.type){
							
							case 'key':
								console.log('key');
								dungeon.data.active_room.data.display_container.removeChild(items[i].data.sprite);
								items[i].data.collected = true;
								player.data.number_of_keys++;
								break;
						}
							
						break;
					}
					
				}		
			}
			
		}
			
	}
	
	this.overlapItem = function(speed, item) {
		
		diff = 16 + speed;
		
		objectStartX = item.data.sprite.x - diff;
		objectEndX = item.data.sprite.x + diff;
		objectStartY = item.data.sprite.y -diff;
		objectEndY = item.data.sprite.y + diff;
		
		return (playerX >= objectStartX && playerX <= objectEndX) && (playerY >= objectStartY && playerY <= objectEndY);
	}
	
	/* #### SPIKE ENEMY #### */
	this.checkSpikeEnemy = function() {
		
		enemies = dungeon.data.active_room.data.enemies;
		
		if(enemies.length > 0) {
			
			for(i = 0; i < enemies.length; i++) {
				
				if(player.overlapItem(16,enemies[i])) {
					
					if(enemies[i].data.cooldown === 0) {
						console.log('attack!');
						player.data.sprite.tint = 123213123324;
						
						//player.data.sprite.tint = 16777215;
					}
				}
				
			}
			
		}
			
	}
	
	
	
};
