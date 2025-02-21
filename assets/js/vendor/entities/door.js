/* Door Entity */

Door = function() {
	
	this.data = {
		
		room: null,
		connecting_door: null,
		sprite: null,
		locked:false,
		position:'',
			
	};
	
/*
	this.setPositionOfDoor = function() {
	
		//check the position of the door by comparing the x and y position with the possible positions of doors
		northPositionX = (this.data.room.data.x_start + 6 * 32) + 16;
		northPositionY = (this.data.room.data.y_start + 1 * 32) + 16;
		
		eastPositionX = (this.data.room.data.x_start + 11 * 32) + 16;
		eastPositionY = (this.data.room.data.y_start + 5 * 32) + 16;
		
		southPositionX = (this.data.room.data.x_start + 6 * 32) + 16;
		southPositionY = (this.data.room.data.y_start + 9 * 32) + 16;
		
		westPositionX = (this.data.room.data.x_start + 1 * 32) + 16;
		westPositionY = (this.data.room.data.y_start + 5 * 32) + 16;
				
		if(this.data.sprite.x === northPositionX && this.data.sprite.y === northPositionY) {		
			this.data.room.data.north_door = this;
			this.data.position = 'north';
		}
		else if(this.data.sprite.x === eastPositionX && this.data.sprite.y === eastPositionY) {
			this.data.room.data.east_door = this;
			this.data.position = 'east';
		}
		else if(this.data.sprite.x === southPositionX && this.data.sprite.y === southPositionY) {
			this.data.room.data.south_door = this;
			this.data.position = 'south';
		}
		else if(this.data.sprite.x === westPositionX && this.data.sprite.y === westPositionY) {
			this.data.room.data.west_door = this;
			this.data.position = 'west';
		}
			
	}
*/

	/* NEW NEW NEW */
	this.setPositionOfDoor = function(pos) {
	
		switch(pos) {
					
			case 'north':
				
				this.data.room.data.north_door = this;
				this.data.position = 'north';
	
				break;
				
			case 'east':
				
				//get the entering room
				this.data.room.data.east_door = this;
				this.data.position = 'east';
				
				break;
				
			case 'south':
				
				//get the entering room
				this.data.room.data.south_door = this;
				this.data.position = 'south';
				
				break;
				
			case 'west':
				
				//get the entering room
				this.data.room.data.west_door = this;
				this.data.position = 'west';
				
				break;
			
		}	
			
	}
	
	this.setConnectingDoor = function() {
		
		switch(this.data.position) {
					
			case 'north':
				
				//get the entering room
				enteringRoom = doors[i].data.room.data.north_room;
				this.data.connecting_door =	enteringRoom.data.south_door;
	
				break;
				
			case 'east':
				
				//get the entering room
				enteringRoom = doors[i].data.room.data.east_room;
				this.data.connecting_door =	enteringRoom.data.west_door;
				
				break;
				
			case 'south':
				
				//get the entering room
				enteringRoom = doors[i].data.room.data.south_room;
				this.data.connecting_door =	enteringRoom.data.north_door;
				
				break;
				
			case 'west':
				
				//get the entering room
				enteringRoom = doors[i].data.room.data.west_room;
				this.data.connecting_door =	enteringRoom.data.east_door;
				
				break;
			
		}
		
	}
	
	this.unlockDoor = function() {
		
		//unlock this and the connecting door
		this.data.locked = false;
		this.setConnectingDoor();
		this.data.connecting_door.data.locked = false;
		
		//change the sprite -- TEMP SOLUTION
		this.data.sprite.texture =  PIXI.utils.TextureCache['assets/sprites/dungeon/doorplaceholder.png'];
		this.data.connecting_door.data.sprite.texture =  PIXI.utils.TextureCache['assets/sprites/dungeon/doorplaceholder.png'];
		
	}
	
	
}