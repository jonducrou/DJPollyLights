var equalizer = function (){
  this.pixels = new Array();

  for (var x = 0; x < 24;++x){ 
    this.pixels[x] = new Array();
    for (var y = 0; y < 6; y++){
      this.pixels[x][y] = new Array(); 
      for (var b = 0; b < 3; b++){ 
        this.pixels[x][y][b] = 0;
      }
    }
  }
};

var eqmap = [
  [ 255,   0, 0 ],
  [ 255, 127, 0 ],
  [ 255, 255, 0 ],
  [   0, 255, 0 ],
  [   0, 255, 0 ],
  [   0, 255, 0 ],
];

// must return a 24x6x3 array of bytes (this.pixels)
equalizer.prototype.getFrame = function(spectrum,volume){

  for (var x = 0; x < 24; x += 4) {
    var i = x / 4;
    var v = Math.floor(spectrum[i] * ( 6 / 256 ));
    for (var y = 0; y < 6; y++) {
      if (v > y) {
	// Each bar is 4 pixels wide
	for (var p = 0; p < 4; p++) {
	  for (var b = 0; b < 3; b++) {
	    this.pixels[x+p][5 - y][b] = eqmap[5 - y][b];
	  }
	}
      } else {
	// Each bar is 4 pixels wide
	for (var p = 0; p < 4; p++) {
	  for (var b = 0; b < 3; b++) {
	    this.pixels[x+p][5 - y][b] =
              Math.floor(this.pixels[x+p][5 - y][b] * 7 / 10);
	  }
	}
      }
    }
  }

  return this.pixels;
};


module.exports = equalizer;
