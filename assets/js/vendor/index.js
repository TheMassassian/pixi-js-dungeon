/* index.js - starter and placeholder for functions */

//get sprite utilitis
var spriteUtils = new SpriteUtilities(PIXI);
var dungeon = new Dungeon();

/* FPS */
var lastLoop = new Date;

/* #### STAGE #### */
setupRenderer();


/* #### GAME #### */
function startGame() {
	
		
	state = loadingState;

	// kick off the animation loop
	gameLoop = animate;
	
	gameLoop();
	
    
}

// start the game
startGame();
loadSprites();


/* #### SIDE FUNCTIONS #### */
/* animate function */
function animate() {
	
	gameStateId = requestAnimationFrame(gameLoop);
	
	state();
	
}

function playState() {
	// this is the main render call that makes pixi draw your container and its children.    
	renderer.render(stage);	
		
	if(dungeon.data.active_room) {
		
		dungeon.data.active_room.updateRoom();
		
	}
	
	/* FPS */
	var thisLoop = new Date;
    var fps = 1000 / (thisLoop - lastLoop);
    lastLoop = thisLoop;
    $('#fpslabel').html(Math.round(fps));
	
}

function loadingState() {
	
	//nothing
}


/* FPS */
function updateFps(fps){
	
	$('#fpslabel').html(fps);
	
}