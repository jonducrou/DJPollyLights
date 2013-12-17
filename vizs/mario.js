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
  this.b = [255,255,255];
  this.brown = [132,66,34];
  this.red = [215,32,24];
  this.green = [32,215,24];
  this.black = [0,0,0]; 
  this.skin = [240,190,141];
  this.mario_hi_5 = [
    [this.b,this.b,this.b,this.brown,this.brown,this.brown],
    [this.b,this.red,this.brown,this.skin,this.skin,this.brown],
    [this.red,this.red,this.brown,this.brown,this.brown,this.skin],
    [this.red,this.red,this.brown,this.skin,this.brown,this.skin],
    [this.red,this.red,this.skin,this.skin,this.skin,this.skin],
    [this.red,this.red,this.skin,this.skin,this.skin,this.skin],
    [this.red,this.red,this.black,this.black,this.skin,this.black],
    [this.b,this.red,this.skin,this.skin,this.black,this.black],
    [this.b,this.red,this.b,this.skin,this.skin,this.black],
    [this.skin,this.red,this.red,this.skin,this.skin,this.black],
    [this.skin,this.skin,this.red,this.red,this.skin,this.red],
    [this.skin,this.skin,this.red,this.red,this.red,this.b]
  ];
  this.mario = [
    [this.b,this.b,this.b,this.brown,this.brown,this.brown],
    [this.b,this.red,this.brown,this.skin,this.skin,this.brown],
    [this.red,this.red,this.brown,this.brown,this.brown,this.skin],
    [this.red,this.red,this.brown,this.skin,this.brown,this.skin],
    [this.red,this.red,this.skin,this.skin,this.skin,this.skin],
    [this.red,this.red,this.skin,this.skin,this.skin,this.skin],
    [this.red,this.red,this.black,this.black,this.skin,this.black],
    [this.b,this.red,this.skin,this.skin,this.black,this.black],
    [this.b,this.red,this.b,this.skin,this.skin,this.black],
    [this.b,this.red,this.b,this.skin,this.skin,this.black],
    [this.b,this.b,this.b,this.b,this.skin,this.b],
    [this.b,this.b,this.b,this.b,this.b,this.b]
  ];
  this.last_i_5 = (new Date).getTime();
};

// must return a 24x6x3 array of bytes (this.pixels)
NAME.prototype.getFrame = function(spectrum,volume,bpm,onBeat){
  var now = (new Date).getTime();
  if (onBeat) {
    this.last_hi_5 = now;
  }

  var mario = now - this.last_hi_5 < 150 ? this.mario_hi_5 : this.mario;

  for (var x = 0; x < 24;++x){ 
    for (var y = 0; y < 6; y++){
      if (x < 12) { 
        this.pixels[x][y] = mario[x][y];
      } else {
        var t = mario[23 - x][y] == this.red ? this.green : mario[23 - 
x][y] ;
        this.pixels[x][y] = t;
      }
    }
  }
  return this.pixels;
};


module.exports = NAME;
