/* Dungeon entity */

Dungeon = function(){
	
	this.data = {
		rooms: [],
		leveldata: null,
		leveldata_path: 'assets/data/dungeon_data.json',
		room_width:15,
		room_heigth:11,
		collision_layer: [],
		background_layer: [],
		object_layer: [],
		key_door_layer: [],
		enemy_layer: [],
		knight_layer: [],
		active_room: null,
		tilesets: {},
	}
	
	/* #### DATA #### */
	this.getLevelData = function() {
		
		//set the stage to the first room
		setStagePosition(0, -32*11);
		
		this.createBackgroundSprite();
		
		get(this.data.leveldata_path, function(req) {
			 
			var dungeon_data = JSON.parse(req.responseText);

			console.log(dungeon_data);
			
			//get the size of the dungeon
			dungeonTileWidth = dungeon_data.width;
			dungeonTileHeight = dungeon_data.height;
			
			//NEW NEW NEW
			//determine the type of the layer from the dungeon data
			for (var l = 0; l < dungeon_data.layers.length; l++) {
				
				switch(dungeon_data.layers[l].properties.type) {
					
					case 'collision':
						dungeon.data.collision_layer = dungeon_data.layers[l].data;
						break;
						
					case 'objects':
						dungeon.data.object_layer = dungeon_data.layers[l].data;
						break;
						
					case 'enemies':
						dungeon.data.enemy_layer = dungeon_data.layers[l].data;
						break;
						
					case 'background':
						dungeon.data.background_layer = dungeon_data.layers[l].data;
						break;
					
					default:
						console.log(dungeon_data.layers[l].properties.type);
						break;
					
					
				}
				
			}
			
			//NEW NEW NEW
			//get the properties of the tilesets
			//var tileproperties = dungeon_data.tilesets[0].tileproperties;
			dungeon.data.tilesets = dungeon_data.tilesets[0].tileproperties;
			
			
/*
			for (var tile in tileproperties) {
				
				if(tileproperties[tile].type === 'player') {
					
					console.log('found the player');
				}
				//console.log(tileproperties[tile]);

		    }
*/
			
			//get the door and wall data from the dungeon data
/*
			dungeon.data.wall_layer = dungeon_data.layers[1].data;
		    dungeon.data.door_layer = dungeon_data.layers[2].data;
		    dungeon.data.key_door_layer = dungeon_data.layers[3].data;
		    dungeon.data.item_layer = dungeon_data.layers[4].data;
		    dungeon.data.enemy_layer = dungeon_data.layers[5].data;
		    dungeon.data.knight_layer = dungeon_data.layers[6].data;
*/ 
			
			//get the dimensions of the dungeon in room sizes
			numberOfRoomsWide = dungeonTileWidth / dungeon.data.room_width;
			numberOfRoomsHeight = dungeonTileHeight / dungeon.data.room_heigth;
			
			roomCount = 0;
			
			//create the rooms and add them to the dungeon
			for(var i = 0; i < numberOfRoomsWide; i++) {
				
				for(var j = 0; j < numberOfRoomsHeight; j++) {
					
					roomCount++;
					
					buffroom = new Room();
					buffroom.data.name = 'Room Nr.' + roomCount;
					buffroom.data.column_start = (1 + ((i) * dungeon.data.room_width));
					buffroom.data.column_end = buffroom.data.column_start + dungeon.data.room_width-1;
					buffroom.data.row_start = (1 + ((j) * dungeon.data.room_heigth));
					buffroom.data.row_end = buffroom.data.row_start + dungeon.data.room_heigth-1;
					
					buffroom.data.x_start = 32 * buffroom.data.column_start - 32;
					buffroom.data.x_end = 32 * buffroom.data.column_end;
					
					buffroom.data.y_start = 32 * buffroom.data.row_start - 32;
					buffroom.data.y_end = 32 * buffroom.data.row_end;
				
					//hacked in starting room TEST
					if(roomCount === 2) {
						
						buffroom.data.player_in_room = true;
						dungeon.data.active_room = buffroom;
					}
					
					dungeon.data.rooms.push(buffroom);
					stage.addChild(buffroom.data.display_container);
				}
				
			}
			
			dungeon.createCollisionPoints();
			dungeon.createDoors();
			dungeon.createItems();
			dungeon.createEnemies();
			
			//dungeon.createWallBlockPoints(dungeonTileWidth,dungeonTileHeight);
			//dungeon.createDoorPoints(dungeonTileWidth,dungeonTileHeight);
			//dungeon.createKeyDoorPoints(dungeonTileWidth,dungeonTileHeight);
			//dungeon.createItems(dungeonTileWidth,dungeonTileHeight);
			//dungeon.createEnemies();
			dungeon.setRoomNeigbours();
			
			player = new Player();
			player.createPlayer();
				
		});
	
	}
	
	/* #### HELPERS #### */
	
	/* #### LAYER OBJECTS #### */
	/* #### NEW NEW NEW NEW #### */
	this.createCollisionPoints = function() {
		
		var collisionLayer = this.data.collision_layer;
			
		var row = 1;
			
		var column = 0;
		
		for(k = 0; k < collisionLayer.length; k++) {
			
			if(k >= (row * dungeonTileWidth)) {
				
				row++;
				column = 1;
				
			}
			else {
				column++;
			}
					
			//if there is a wall add it to the room
			if(collisionLayer[k] !== 0) {
				
				roomForWall = dungeon.getRoomByColumnAndRow(column, row);

				walltexture = PIXI.utils.TextureCache['assets/sprites/dungeon/blockplaceholder.png'];
				buffwall = new PIXI.Sprite(walltexture);
				
				buffwall.x = ((column-1)*32)+16;
				buffwall.y = ((row-1)*32)+16;
				
				buffwall.anchor.x = 0.5;
				buffwall.anchor.y = 0.5;
				buffwall.alpha = 0.5;
				//buffwall.alpha = 0;
	
				roomForWall.data.walls.push(buffwall);	
				roomForWall.data.display_container.addChild(buffwall);
				
			}	
		    
	    }
		
		
	}
	
	this.createDoors = function() {
		
		var row = 1;
			
		var column = 0;
		
		var backgroundLayer = this.data.background_layer;
		var tilesets = this.data.tilesets;
	
	    for(k = 0; k < this.data.background_layer.length; k++) {
			
			if(k >= (row * dungeonTileWidth)) {
				
				row++;
				column = 1;
				
			}
			else {
				column++;
			}
			
			
			tile_id = parseInt(backgroundLayer[k]) - 1;
			
			//if there is a door add it to the room
			if(tilesets[tile_id]) {
					
				if(tilesets[tile_id].type === 'door') {
					
					//console.log(tile_id);
					//console.log(tilesets[tile_id]);
					
					switch(tilesets[tile_id].name) {
						
						case 'open_door':
							//console.log('found a open door');
							roomForDoor = dungeon.getRoomByColumnAndRow(column, row);
				
							buffdoor = new Door();
							buffdoor.data.room = roomForDoor;
							buffdoor.data.locked = false;
							
							doortexture = PIXI.utils.TextureCache['assets/sprites/dungeon/doorplaceholder.png'];
							doorSprite = new PIXI.Sprite(doortexture);
							
							doorSprite.x = ((column-1)*32)+16;
							doorSprite.y = ((row-1)*32)+16;
							
							doorSprite.anchor.x = 0.5;
							doorSprite.anchor.y = 0.5;
							doorSprite.alpha = 0.5;
							//doorSprite.alpha = 0;
							
							buffdoor.data.sprite = doorSprite;
							
							//determine which door this door is - north, east, south, west
							buffdoor.setPositionOfDoor(tilesets[tile_id].doorposition);
										
							roomForDoor.data.doors.push(buffdoor);
								
							roomForDoor.data.display_container.addChild(doorSprite);
							break;
							
						case 'locked_door':
							console.log('found a locked door');
							roomForDoor = dungeon.getRoomByColumnAndRow(column, row);
				
							buffdoor = new Door();
							buffdoor.data.room = roomForDoor;
							buffdoor.data.locked = true;
							
							doortexture = PIXI.utils.TextureCache['assets/sprites/dungeon/keydoorplaceholder.png'];
							doorSprite = new PIXI.Sprite(doortexture);
							
							doorSprite.x = ((column-1)*32)+16;
							doorSprite.y = ((row-1)*32)+16;
							
							doorSprite.anchor.x = 0.5;
							doorSprite.anchor.y = 0.5;
							doorSprite.alpha = 0.5;
							//doorSprite.alpha = 0;
							
							buffdoor.data.sprite = doorSprite;
							
							//determine which door this door is - north, east, south, west
							buffdoor.setPositionOfDoor(tilesets[tile_id].doorposition);
									
							roomForDoor.data.doors.push(buffdoor);
								
							roomForDoor.data.display_container.addChild(doorSprite);
							break;
						
						
					}
					
					
				}
				
				
			}	
		    
	    }
	
	}
	
	this.createItems = function() {
		
		var row = 1;
			
		var column = 0;
		
		var objectlayer = this.data.object_layer;
		var tilesets = this.data.tilesets;
	
	    for(k = 0; k < objectlayer.length; k++) {
			
			if(k >= (row * dungeonTileWidth)) {
				
				row++;
				column = 1;
				
			}
			else {
				column++;
			}
			
			tile_id = parseInt(objectlayer[k]) - 1;
			
			if(tilesets[tile_id]) {
			
				if(tilesets[tile_id].type === 'object') {
					
					switch(tilesets[tile_id].name) {
							
						case 'key':
							
							roomForKey = dungeon.getRoomByColumnAndRow(column, row);
				
							buffkey = new InventoryItem();
							buffkey.data.room = roomForKey;
							buffkey.createKeySprite(((column-1)*32)+16,((row-1)*32)+16);
							buffkey.data.type = 'key';
							buffkey.data.name = 'Key';
						
							roomForKey.data.items.push(buffkey);
								
							roomForKey.data.display_container.addChild(buffkey.data.sprite);
							
							break;
							
					}
					
				}
			
			}
			
	    }
	}
	
	
	this.getRoomByColumnAndRow = function(column,row) {
		
		rooms = this.data.rooms;
		
		searchedRoom = null;
		
		for(i = 0; i < rooms.length; i++) {
			
			if((row >= rooms[i].data.row_start && row <= rooms[i].data.row_end) && (column >= rooms[i].data.column_start && column <= rooms[i].data.column_end)) {
					//console.log(rooms[i]);
					searchedRoom = rooms[i];
					break;	
			}
				
		}
		
		return searchedRoom;
		
	}

	/* ### ENEMIES ### */
	this.createEnemies = function() {
		
		var enemylayer = this.data.enemy_layer;
		var tilesets = this.data.tilesets;
		
		var row = 1;
			
		var column = 0;
		
		var buffid = 0;
	
	    for(k = 0; k < enemylayer.length; k++) {
			
			if(k >= (row * dungeonTileWidth)) {
				
				row++;
				column = 1;
				
			}
			else {
				column++;
			}
			
			//if there is a key add it to the room
			if(enemylayer[k] !== 0) {
				
				tile_id = parseInt(enemylayer[k]) - 1;
			
				//if there is a door add it to the room
				if(tilesets[tile_id]) {
					
					switch(tilesets[tile_id].name) {
						
						case 'knight':
							//console.log('found a knight');
							
							roomForEnemy = dungeon.getRoomByColumnAndRow(column, row);
				
							buffEnemy = new KnightEnemy();
							buffEnemy.createEnemySprite(((column-1)*32)+16,((row-1)*32)+16);
							buffEnemy.data.id = buffid;
							roomForEnemy.data.enemies.push(buffEnemy);			
							roomForEnemy.data.display_container.addChild(buffEnemy.data.sprite);
							buffid++;
							
							break;	
						
						case 'fire':
							//console.log('fire');
							break;
					}
					
				}

				
			
			}
			
			//console.log(enemylayer[k]);
			
			
/*
			if(this.data.enemy_layer[k] === 56) {
				
				roomForEnemy = dungeon.getRoomByColumnAndRow(column, row);
				
				buffEnemy = new SpikeEnemy();
				buffEnemy.createEnemySprite(((column-1)*32)+16,((row-1)*32)+16);
				buffEnemy.data.id = buffid;
				roomForEnemy.data.enemies.push(buffEnemy);			
				roomForEnemy.data.display_container.addChild(buffEnemy.data.sprite);
				buffid++;
				
			}	
*/
		    
	    }
	  
	}
	
	this.createBackgroundSprite = function() {
		
		var texture = PIXI.utils.TextureCache['assets/sprites/dungeon/newattdungeon.png'];
		bg = new PIXI.Sprite(texture);
		bg.scale.x = scale;
		bg.scale.y = scale;
	
		stage.addChild(bg);
		
		
	}
	
	this.setRoomNeigbours = function() {
		
		var rooms = this.data.rooms;
		
		for(r = 0; r < rooms.length; r++) {
			
			this.data.rooms[r].setNeighbourRooms();
			
		}
		
	}
	
};
