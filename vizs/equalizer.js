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
  [ 255, 255, 0 ],
  [   0, 255, 0 ],
  [   0, 255, 0 ],
  [   0, 255, 0 ],
  [   0, 255, 0 ],
];

// must return a 24x6x3 array of bytes (this.pixels)
equalizer.prototype.getFrame = function(spectrum,volume){

  for (var x = 0; x< 24; x++) {
    for (var y = 0; y < 6; y++) {
      var v = Math.floor(spectrum[0] * ( 6 / 256 ));
      if (v >= y) {
	this.pixels[x][y] = [0, 0, 0];
      } else {
	this.pixels[x][y] = eqmap[y];
      }
    }
  }

  return this.pixels;
};


module.exports = equalizer;
