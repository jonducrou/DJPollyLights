var glasses = function (){
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
  this.glasses_mask = [
    [0,1,1,1,0,0],
    [1,2,2,2,1,0],
    [1,2,2,2,2,1],
    [1,2,2,2,2,1],
    [1,2,2,2,2,1],
    [1,2,2,2,2,1],
    [1,2,2,1,1,0]
    [0,1,1,0,0,0],
    [0,1,1,0,0,0],
    [1,2,2,1,1,0]
    [1,2,2,2,2,1],
    [1,2,2,2,2,1],
    [1,2,2,2,2,1],
    [1,2,2,2,2,1],
    [1,2,2,2,1,0],
    [0,1,1,1,0,0],
    [0,1,1,0,0,0],
    [0,1,0,0,0,0],
    [0,1,0,0,0,0],
    [0,1,0,0,0,0],
    [0,1,0,0,0,0],
    [0,1,0,0,0,0],
    [0,1,0,0,0,0],
    [0,0,1,0,0,0],
  ];
};

// must return a 24x6x3 array of bytes (this.pixels)
glasses.prototype.getFrame = function(spectrum,volume){

  for (var x = 0; x < 24;++x){ 
    for (var y = 0; y < 6; y++){
      switch (this.glasses_mask) {
        case 0:
          this.pixels[x][y] = [200,200,100];
          break;
        case 1:
          this.pixels[x][y] = [0,0,0];
          break;
        case 2:
          this.pixels[x][y] = [0,0,250];
          break;
      }
    }
  }

  return this.pixels;
};

module.exports = glasses;

