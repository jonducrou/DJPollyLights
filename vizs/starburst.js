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
  this.roll_up = function () {
    for (var x = 0; x < 24;++x){ 
      var tmp = new Array();
      for (var b = 0; b < 3; b++){ 
        tmp[b] = this.pixels[x][0][b];
      }
      for (var y = 0; y < 5; y++){
        for (var b = 0; b < 3; b++){ 
          this.pixels[x][y][b] = this.pixels[x][y+1][b];
        }
      }
      for (var b = 0; b < 3; b++){ 
        this.pixels[x][5][b] = tmp[b];
      }
    }
  };
  this.c = 0;
  this.roll_down = function () {
    for (var x = 0; x < 24;++x){ 
      var tmp = new Array();
      for (var b = 0; b < 3; b++){ 
        tmp[b] = this.pixels[x][5][b];
      }
      for (var y = 5; y > 0; y--){
        for (var b = 0; b < 3; b++){ 
          this.pixels[x][y][b] = this.pixels[x][y-1][b];
        }
      }
      for (var b = 0; b < 3; b++){ 
        this.pixels[x][0][b] = tmp[b];
      }
    }
  };
  this.c = 0;
  this.b = 0;
  this.a = 0;
};

// must return a 24x6x3 array of bytes (this.pixels)
NAME.prototype.getFrame = function(spectrum,volume,bpm,onBeat){
  this.c++;
  if (onBeat) this.b++;
  //fade every pixel
  for (var x = 0; x < 24;++x){ 
    for (var y = 0; y < 6; y++){
      for (var b = 0; b < 3; b++){ 
        this.pixels[x][y][b] -= 3;
        if (this.pixels[x][y][b] < 0) this.pixels[x][y][b] = 0;
      }
    }
  }

  if (this.b > 10) {
    this.a++;
    this.b = 0;
  }
  if (this.c > 10) {
    if (this.a % 2) {
      this.roll_down();
    } else {
      this.roll_up();
    }
    this.c = 0;
  }
  for (var x = 0; x < 24;++x){ 
    for (var y = 0; y < 6; y++){
      for (var b = 0; b < 3; b++){
        if (Math.random() > 0.99 || (onBeat && Math.random() > 0.98)) {
          this.pixels[x][y][b] = spectrum[b*2];
        }
      }
    }
  }
  return this.pixels;
};


module.exports = NAME;

