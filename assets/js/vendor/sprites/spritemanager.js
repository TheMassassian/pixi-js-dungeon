/* lib that contains basic and global sprite functions */

/* static placeholder array for sprites */
var gameSprites = [
	    "assets/sprites/dungeon/newattdungeon.png",
	    "assets/sprites/player/playertest.png",
	    "assets/sprites/dungeon/key.png",
	    "assets/sprites/dungeon/blockplaceholder.png",
	    "assets/sprites/dungeon/doorplaceholder.png",
	    "assets/sprites/dungeon/keydoorplaceholder.png",
	    "assets/sprites/dungeon/enemy.png"
	  ];

/*
 * loadSprites
 *
 * function that load all sprites into the texture Cache
 *
 */
function loadSprites() {
	
	PIXI.loader.add(gameSprites)
	  .on("progress", loadProgressHandler)
	  .load(setup);
	
	function loadProgressHandler() {
	  console.log("loading"); 
	}
	
	function setup() {
	  console.log("setup");
	  
	  //drawBackground();
	  //createPlayer();
	  
	  dungeon.getLevelData();
	  state = playState;
	  

	}
	
}
