var hearts = function (){

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
hearts.prototype.getFrame = function(spectrum,volume){
  //this.c++;
  var offset = 0;
  var bass = (spectrum[0]+spectrum[1])/(2*256);
  for (var x = 0; x < 24;++x){ 
    for (var y = 0; y < 6; y++){
      if (x==5 || x==11 || x== 12 || x == 18) continue;
      if (x>5) offset = 6;
      if (x>11) offset = 13;
      if (x>17) offset = 19;
      var xx = x-offset; 
      if (this.dark_red[xx][y]) {
        this.pixels[x][y] = [100*bass,0,0];
      } else if (this.pink[xx][y]) {
        this.pixels[x][y] = [255*bass,100*bass,100*bass];
      } else if (this.red[xx][y]) {
        this.pixels[x][y] = [255*bass,0,0];
      } else {
        this.pixels[x][y] = [0,0,0];
      }
    }
  }

  return this.pixels;
};





module.exports = hearts;
