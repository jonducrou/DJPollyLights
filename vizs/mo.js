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
  this.mask = [[255, 214, 41, 11, 142, 251], [254, 105, 87, 130, 10, 
182], [255, 98, 183, 242, 34, 68], [255, 223, 162, 227, 10, 12], [255, 
255, 255, 70, 0, 0], [255, 252, 67, 0, 0, 21], [249, 100, 0, 1, 0, 70], 
[178, 3, 0, 1, 0, 151], [51, 0, 1, 0, 8, 224], [2, 1, 1, 0, 95, 250], 
[35, 0, 1, 10, 206, 255], [175, 0, 0, 128, 255, 255], [175, 2, 0, 110, 
255, 255], [38, 0, 1, 11, 209, 255], [2, 1, 1, 0, 94, 250], [52, 0, 1, 
0, 9, 224], [178, 4, 0, 1, 0, 148], [251, 102, 0, 1, 0, 68], [255, 253, 
66, 0, 0, 20], [255, 255, 255, 70, 0, 0], [255, 223, 161, 227, 7, 13], 
[255, 99, 182, 242, 32, 70], [255, 106, 84, 128, 8, 182], [255, 216, 42, 
12, 141, 251]];
};

// must return a 24x6x3 array of bytes (this.pixels)
NAME.prototype.getFrame = function(spectrum,volume,bpm,onBeat){
  for (var x = 0; x < 24;++x){ 
    for (var y = 0; y < 6; y++){
      for (var b = 0; b < 3; b++){ 
        this.pixels[x][y][b] = (this.mask[x][y]*volume/255);
      }
    }
  } 
  return this.pixels;
};


module.exports = NAME;
