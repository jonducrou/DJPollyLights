var fire = function (){
  this.counter = 0;
  this.pixels = new Array();
  this.decay = .7;

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

// must return a 24x6x3 array of bytes (this.pixels)
fire.prototype.getFrame = function(spectrum,volume){
  var newPixels = new Array();
  for (var x = 0; x < 24; ++x) {
    newPixels[x] = new Array();
    for (var y = 0; y < 6; ++y) {
      newPixels[x][y] = [0,0,0]
    }
  }

  for (var x = 0; x < 24; ++x) {
    for (var y = 1; y < 6; ++y) {
      var offset = Math.cos(y + this.counter/10 + x/100);
      if (offset < 0 && x > 0) {
        newPixels[x-1][y-1][0] += Math.abs(offset)*this.decay*this.pixels[x][y][0];
        newPixels[x-1][y-1][1] += Math.abs(offset)*this.decay*this.pixels[x][y][1];
        newPixels[x-1][y-1][2] += Math.abs(offset)*this.decay*this.pixels[x][y][2];
      }
      if (offset > 0 && x < 23) {
        newPixels[x+1][y-1][0] += Math.abs(offset)*this.decay*this.pixels[x][y][0];
        newPixels[x+1][y-1][1] += Math.abs(offset)*this.decay*this.pixels[x][y][1];
        newPixels[x+1][y-1][2] += Math.abs(offset)*this.decay*this.pixels[x][y][2];
      }
      newPixels[x][y-1][0] += (1-Math.abs(offset))*this.decay*this.pixels[x][y][0];
      newPixels[x][y-1][1] += (1-Math.abs(offset))*this.decay*this.pixels[x][y][1];
      newPixels[x][y-1][2] += (1-Math.abs(offset))*this.decay*this.pixels[x][y][2];
    }
  }


  for (var x = 0; x < 24; ++x){
    newPixels[x][5][0] = spectrum[x%7];
    newPixels[x][5][1] = spectrum[x%7]/3;
//    newPixels[x][5][0] = 20*(x%3);
//    newPixels[x][5][1] = 10*(x%3);
  }

  this.counter++;
  this.pixels = newPixels;
  return this.pixels;
};


module.exports = fire;
