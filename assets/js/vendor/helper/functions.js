function bound(x, min, max) {
    return Math.max(min, Math.min(max, x));
}

function overlap(x1, y1, w1, h1, x2, y2, w2, h2) {
	return !(((x1 + w1 - 1) < x2) ||
	         ((x2 + w2 - 1) < x1) ||
	         ((y1 + h1 - 1) < y2) ||
	         ((y2 + h2 - 1) < y1))
}
  
function timestamp() {
	return window.performance && window.performance.now ? window.performance.now() : new Date().getTime();
}

function t2p(t) {
	return t *  32;
}

function p2t(p) {
	return Math.floor(p/32);
}	
	
function cell(x,y) { 
	return tcell(p2t(x),p2t(y));
}	

function tcell(tx,ty) { 
	
	mapSizeX = 624;
	
	return wallLayer[tx + (ty * mapSizeX)];
}
  
function get(url, onsuccess) {
	var request = new XMLHttpRequest();
	request.onreadystatechange = function() {
	  if ((request.readyState == 4) && (request.status == 200))
	    onsuccess(request);
	}
	request.open("GET", url, true);
	request.send();
}