var Rainbow = function (){
  this.pixels = new Array();
  this.values = new Array();

  for (var x = 0; x < 24;++x){ 
    this.values[x] = new Array();
    for (var y = 0; y < 6; y++){ 
      this.values[x][y] = 0;
    }
  }

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

// must return a 24x6x3 array of bytes
Rainbow.prototype.getFrame = function(spectrum){
 for (var x = 1; x < 24;++x){ 
    for (var y = 0; y < 6; y++) {
      this.values[x-1][y] = this.values[x][y];
    }
  }  
  for (var y = 0; y < 6; y++) {
    this.values[23][y] = spectrum[y];
  }
  
  for (var x = 0; x < 24;++x){ 
    this.pixels[x][0] = [this.values[x][0],0,0]; 
    this.pixels[x][1] = [this.values[x][1],this.values[x][1]/2,0]; 
    this.pixels[x][2] = [this.values[x][2],this.values[x][2],0]; 
    this.pixels[x][3] = [0,this.values[x][3],0]; 
    this.pixels[x][4] = [0,0,this.values[x][4]]; 
    this.pixels[x][5] = [this.values[x][5],0,this.values[x][5]]; 
  }

  return this.pixels;
};


module.exports = Rainbow;
