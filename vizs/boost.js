var NAME = function (){
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
  this.levels = [0,0,0,0,0,0,0];
  this.first_time = true;
};

// must return a 24x6x3 array of bytes (this.pixels)
NAME.prototype.getFrame = function(spectrum,volume,bpm,onBeat){
  for (var i = 0; i < 7; ++i) {
    if (this.first_time) {
      this.first_time = false;
      this.levels[i] = spectrum[i];
    } else {
      this.levels[i] = this.levels[i]*.98 + spectrum[i]*0.02;
    }
  }
  for (var x = 0; x < 12;++x){ 
    var xx = 23-x;
//    if (x > 11) xx = 35 - x;
    for (var y = 0; y < 6; y++){
      var yy = 5-y;
      for (var b = 0; b < 3; b++){ 
        this.pixels[x][y][b] /=1.5;
        this.pixels[xx][y][b] /=1.5;
      }
      for (var i = 0; i < 7; ++i) {
        var mul = spectrum[i] / this.levels[i];
        mul = Math.round(mul * mul);
        if (mul == NaN || mul < 2) continue;
        if (mul > 10) mul = 10;
        mul = 10 - mul;
        if ((x+y*24)%mul == 0) {
          if ((i+1) & 1) {
            this.pixels[x][yy][0] = 255;
            this.pixels[xx][yy][0] = 255;
          }
          if ((i+1) & 2) {
            this.pixels[x][yy][1] = 255;
            this.pixels[xx][yy][1] = 255;
          }
          if ((i+1) & 4) {
            this.pixels[x][yy][2] = 255;
            this.pixels[xx][yy][2] = 255;
          }
        }
      }
//      if (this.pixels[x][y][0]>255) this.pixels[x][y][0] = 255;  
//      if (this.pixels[x][y][1]>255) this.pixels[x][y][1] = 255;  
//      if (this.pixels[x][y][2]>255) this.pixels[x][y][2] = 255;  
    }
  }

  return this.pixels;
};


module.exports = NAME;
