var plasma = function (){
  this.m = 1;
  this.n = 1;
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

// must return a 24x6x3 array of bytes (this.pixels)
plasma.prototype.getFrame = function(spectrum,volume,bpm,onBeat){
  for (yy = 0;yy < 6; yy++) {
    for (xx = 0;xx < 24; xx++) {
      var x=xx*1;
      var y=yy*1;
      r = Math.floor((Math.cos((x+this.n)/4)*128)+(Math.cos((this.n+y)/4)*128));
      g = Math.floor((Math.cos((x+this.n)/4)*128)+(Math.cos((this.m+y)/4)*128));
      b = Math.floor((Math.sin((x-this.m)/4)*128)+(Math.sin((this.m+y)/4)*128));
   //   this.pixels[xx][yy] = [r*spectrum[1]/255,g*spectrum[2]/255,b*spectrum[3]/255];
      this.pixels[xx][yy] = [r,g,b];
    }
  }
  this.m-=bpm/60;
  this.n++;
  return this.pixels;
};


             

module.exports = plasma;
