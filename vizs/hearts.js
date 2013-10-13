var skull = function (){

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
  this.red = [[0,1,1,0,0,0],[1,1,1,1,0,0],[0,1,1,1,1,0],[1,1,1,1,0,0],[0,1,1,0,0,0]];
  this.dark_red = [[0,0,1,0,0,0],[0,0,0,1,0,0],[0,0,0,0,1,0],[0,0,0,0,0,0],[0,0,0,0,0,0]];
  this.pink = [[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,1,0,0,0,0],[0,0,0,0,0,0]];
};

// must return a 24x6x3 array of bytes (this.pixels)
skull.prototype.getFrame = function(spectrum,volume){
  //this.c++;

  var bass = (spectrum[0]+spectrum[1])/(2*256);
  for (var x = 0; x < 5;++x){ 
    for (var y = 0; y < 6; y++){
      if (this.dark_red[x][y]) {
        this.pixels[x][y] = [100*bass,0,0];
      } else if (this.pink[x][y]) {
        this.pixels[x][y] = [255*bass,100*bass,100*bass];
      } else if (this.red[x][y]) {
        this.pixels[x][y] = [255*bass,0,0];
      } else {
        this.pixels[x][y] = [0,0,0];
      }
    }
  }

  return this.pixels;
};





module.exports = skull;
