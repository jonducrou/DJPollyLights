
var perlinGenerator = require("./lib/perlin.js");
var perlin;
var now = 0;

var NAME = function (){
  perlin = new perlinGenerator();
  this.pixels = new Array();
  this.noise = new Array();

  for (var x = 0; x < 24;++x){ 
    this.pixels[x] = new Array();
    this.noise[x] = new Array();
    for (var y = 0; y < 6; y++){
      this.pixels[x][y] = new Array(); 
      this.noise[x][y] = perlin.noise(x/5,y/5);
      for (var b = 0; b < 3; b++){ 
        this.pixels[x][y][b] = 0;
      }
    }
  }
};
var low = 0, mid = 0, high = 0;
// must return a 24x6x3 array of bytes (this.pixels)
NAME.prototype.getFrame = function(spectrum,volume,bpm,onBeat){
  now = now + 1;
  l = (spectrum[0]+spectrum[1])/512;
  m = (spectrum[3]+spectrum[4])/512
  h = (spectrum[5]+spectrum[6])/512
  low = Math.max(low,l);
  low = low * .9 + l * .1;
  mid = Math.max(mid,m);
  mid = mid * .9 + m * .1;
  high = Math.max(high,h);
  high = high * .9 + h * .1;
  for (var x = 0; x < 24;++x){
    for (var y = 0; y < 6; y++){
      this.noise[x][y] = perlin.noise(x/5,(y-now/25)/5);
      this.pixels[x][y][0] = low * ( Math.sin((now)/50 + this.noise[x][y]) * 127 + 128);
      this.pixels[x][y][1] = mid*( Math.sin((now)/50 + this.noise[x][y]+(2*Math.PI/3)) * 127 + 128);
      this.pixels[x][y][2] = high*( Math.sin((now)/50 + this.noise[x][y]+(4*Math.PI/3)) * 127 + 128);
    }
  }
  return this.pixels;
};


module.exports = NAME;
