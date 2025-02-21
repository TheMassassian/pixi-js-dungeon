/* Iventory Entities */

Inventory = function() {
	
	this.data = {
		items: [],	
	}
	
	this.getNumberOfKeys = function(){
		
	}
	
};

InventoryItem = function() {
	
	this.data = {
		sprite: null,
		type:'',
		name:'',
		room:null,
		collected:false,	
	}
	
	this.createKeySprite = function(x,y) {
			
		keytexture = PIXI.utils.TextureCache['assets/sprites/dungeon/key.png'];
		keySprite = new PIXI.Sprite(keytexture);
		
		keySprite.x = x;
		keySprite.y = y;
		
		keySprite.anchor.x = 0.5;
		keySprite.anchor.y = 0.5;
		
		this.data.sprite = keySprite;

		
	}
	
};