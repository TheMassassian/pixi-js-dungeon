/* ########################### */
/* #### KEYBOARD CONTROLS #### */
/* ########################### */

/* NEW */

var KEY = { P: 80, ESCAPE: 27, ENTER: 13, SPACE: 32, LEFT: 37, UP: 38, RIGHT: 39, DOWN: 40, SHIFT: 16 };

/*
 * 
 *
 */
function onkey(ev, key, down) {
	
	speed = 8;
	
	switch(key) {
	  case KEY.LEFT:    	
	  	ev.preventDefault();
	  	
	  	player.checkSpikeEnemy();
	  	
	  	if(down && player.data.is_moving_y == false) {
			
			player.checkItemCollision();
			
			if(player.checkWallCollision('left', speed) || player.checkDoorCollision('left')) {
				
			}
			else {
				player.data.is_moving_x = true;	
				player.data.display_container.x -= speed;
			}

			
	  	}
	  	else {
		  	
		  	player.data.is_moving_x = false;
		  	
	  	}

	  	return false;
	  
	  case KEY.RIGHT:    	
	  	ev.preventDefault();
	  	
	  	player.checkSpikeEnemy();
	  	
	  	if(down && player.data.is_moving_y == false) {
		  	
		  	player.checkItemCollision();
				
			if(player.checkWallCollision('right', speed) || player.checkDoorCollision('right')) {
				
			}
			else {
				player.data.is_moving_x = true;
				player.data.display_container.x += speed;
			}
			
			
	  	}
	  	else {
		  	
		  	player.data.is_moving_x = false;
		  	
	  	}

	  	return false;
	  
	  case KEY.UP:    	
	  	ev.preventDefault();
	  	
	  	player.checkSpikeEnemy();
	  	
	  	if(down && player.data.is_moving_x == false) {
		  	
		  	player.checkItemCollision();
			
			if(player.checkWallCollision('up', speed) || player.checkDoorCollision('up')) {
				
			}
			else {
				player.data.is_moving_y = true;
				player.data.display_container.y -= speed;
			}

	  	}
	  	else {
		  	
		  	player.data.is_moving_y = false;
		  	
	  	}

	  	return false;
	  	
	  case KEY.DOWN:    	
	  	ev.preventDefault();
	  	
	  	player.checkSpikeEnemy();
	  	
	  	if(down && player.data.is_moving_x == false) {
		  	
		  	player.checkItemCollision();
			
	  		if(player.checkWallCollision('down', speed) || player.checkDoorCollision('down')){
				
			}
			else {
				player.data.is_moving_y = true;
				player.data.display_container.y += speed;
			}
			
			
	  	}
	  	else {
		  	
		  	player.data.is_moving_y = false;
		  	
	  	}

	  	return false;
	  	
	  case KEY.SPACE:    	
	  	ev.preventDefault();
	  	
	  	return false;
	}
	
}

function setUpKeyboardListeners() {
	
	document.addEventListener('keydown', function(ev) { return onkey(ev, ev.keyCode, true);  }, false);
	document.addEventListener('keyup',   function(ev) { return onkey(ev, ev.keyCode, false); }, false);
	
}

setUpKeyboardListeners();
