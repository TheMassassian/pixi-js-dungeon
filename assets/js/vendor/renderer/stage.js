/* Lib that holds functions for setting up the stage */

var roomWidth = 480;
var roomHeigh = 352

var scale = 1;
var rendererWidth = 480 * scale;
var rendererHeight = 352 * scale;

//var rendererWidth = 416 * 2;
//var rendererHeight = 352 * 2;

var tileSize = 32;

var renderer;
"use strict";

//root container that holds all objects in it
var stage = new PIXI.Container();
var grid = new PIXI.Container();
//the displaycontainer for all object in the stage


function setupRenderer(){
	renderer = new PIXI.WebGLRenderer(rendererWidth, rendererHeight);
	document.getElementById('screen').appendChild(renderer.view);
	
}


function setGridCenter() {
	//grid.position.y = (renderer.height / renderer.resolution) / 2;
	//grid.position.x = (renderer.width / renderer.resolution) / 2;	
	stage.addChild(grid);
}

/* #### STAGE CAMERA #### */
function setStagePosition(x,y) {
	
	stage.x = x;
	stage.y = y;
	
}

var cameramovementIntervall;
var stageDestinationX;
var stageDestinationY;

function moveStageX() {
	
	var cameraspeed = 16;

	if(stage.x != stageDestinationX) {
		
		
		if(stageDestinationX > stage.x) {
			
			stage.x += cameraspeed;
		}
		else {
			
			stage.x -= cameraspeed;
			
		}
		
	}
	else {
		
		clearInterval(cameramovementIntervall);
	}	
	
}

function moveStageY() {
	
	var cameraspeed = 16;

	if(stage.y != stageDestinationY) {
		
		
		if(stageDestinationY > stage.y) {
			
			stage.y += cameraspeed;
		}
		else {
			
			stage.y -= cameraspeed;
			
		}
		
	}
	else {
		
		clearInterval(cameramovementIntervall);
	}	
	
}

function moveCameraToX(x) {
	stageDestinationX = x;
	cameramovementIntervall = setInterval(moveStageX, 24);	
}

function moveCameraToY(y) {
	stageDestinationY = y;
	cameramovementIntervall = setInterval(moveStageY, 24);	
}