var dj_polly = function (){
  this.template=[[0, 0, 75, 163, 81, 0], [0, 0, 143, 1, 121, 0], [0, 37, 137, 0, 123, 0], [0, 157, 170, 158, 198, 0], [0, 0, 0, 0, 0, 0], [0, 0, 49, 0, 0, 50], 
[0, 0, 112, 0, 0, 132], [120, 0, 157, 132, 134, 108], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 11, 0, 0, 9], [0, 0, 197, 158, 169, 
186], [0, 0, 119, 0, 132, 83], [0, 0, 130, 1, 132, 0], [0, 0, 75, 167, 86, 0], [0, 0, 0, 0, 0, 0], [0, 0, 83, 168, 84, 0], [0, 0, 139, 1, 139, 0], [0, 0, 138, 
1, 138, 0], [0, 0, 83, 167, 84, 0], [0, 0, 0, 0, 0, 0], [0, 79, 0, 0, 98, 0], [0, 158, 132, 132, 189, 0], [0, 0, 0, 0, 110, 0], [0, 0, 0, 0, 2, 0], [0, 79, 0, 
0, 98, 0], [0, 158, 132, 132, 189, 0], [0, 0, 0, 0, 110, 0], [0, 0, 107, 2, 0, 68], [0, 0, 118, 151, 80, 189], [0, 0, 42, 120, 113, 42], [0, 0, 160, 22, 0, 
0],[0,0,0,0,0,0],[0,0,0,0,0,0]];
  this.pixels = new Array();
  this.offset = 11;
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
dj_polly.prototype.getFrame = function(spectrum,volume,bpm,onBeat){
  for (var x = 0; x < 24;++x){
    for (var y = 0; y < 6; y++){      
      this.pixels[x][y][0] = this.template[x+this.offset][y]*spectrum[0]/255;  
      this.pixels[x][y][1] = this.template[x+this.offset][y]*spectrum[3]/255;  
      this.pixels[x][y][2] = this.template[x+this.offset][y]*spectrum[6]/255;  
    }
  }
  return this.pixels;
};


module.exports = dj_polly;
