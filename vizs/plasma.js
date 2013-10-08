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
plasma.prototype.getFrame = function(spectrum,volume){
  for (yy = 0;yy < 6; yy++) {
    for (xx = 0;xx < 24; xx++) {
      var x=xx*5;
      var y=yy*5;
      r = Math.floor((Math.cos((x+this.n+y+Math.sin(x*10))/20)*255)+(Math.cos((x+this.m+y)/10)*255));
      g = Math.floor((Math.sin((x+this.m+y+Math.sin(y*10))/20)*255)+(Math.cos((x+this.n+x)/20)*255));
      b = Math.floor((Math.cos((x+Math.cos(y/(x+this.m))+Math.sin(y*10))/20)*255)+(Math.cos((x+this.n+x)/20)*255)); 
      this.pixels[xx][yy] = [r*spectrum[1]/255,g*spectrum[2]/255,b*spectrum[3]/255];
   //   this.pixels[x][y] = [r,g,b];
    }
  }
  this.m--;
  this.n++;
  return this.pixels;
};


             

module.exports = plasma;
