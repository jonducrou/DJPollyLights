var NAME = function (){
  this.pixels = new Array();
  this.palette = [[150,150,250],[90,90,220],[0,0,180],[0,0,140],[0,0,100],[0,0,80],[0,0,60]];
  this.background = [0,0,20];
  this.last_last_pos = [0,0,0,0,0,0,0];
  this.last_pos = [0,0,0,0,0,0,0];

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
NAME.prototype.getFrame = function(spectrum,volume,bpm,onBeat){
  for (var x = 0; x < 11;++x){ 
    this.pixels[x] = new Array();
    for (var y = 0; y < 6; y++){
      this.pixels[x][y] = new Array(); 
      for (var b = 0; b < 3; b++){ 
        this.pixels[x][y][b] = this.pixels[x+1][y][b];
      }
    }
  }
  for (var x = 23; x >12 ;--x){ 
    this.pixels[x] = new Array();
    for (var y = 0; y < 6; y++){
      this.pixels[x][y] = new Array(); 
      for (var b = 0; b < 3; b++){ 
        this.pixels[x][y][b] = this.pixels[x-1][y][b];
      }
    }
  }
  for (var y = 0; y < 6; y++){
    for (var b =0 ; b < 3 ; ++b) {
      this.pixels[11][y][b] = this.background[b];
      this.pixels[12][y][b] = this.background[b];
    }
  }

  for (var s = 6; s >= 0; --s){
    var llp = this.last_pos[s];
    var pos = 6-Math.floor(spectrum[s]*6/255);
    if (pos > this.last_last_pos[s] && this.last_pos[s] === this.last_last_pos[s])
      this.last_pos[s]++;
    else if (pos < this.last_last_pos[s] && this.last_pos[s] === this.last_last_pos[s])
      this.last_pos[s]--
    this.last_last_pos[s] = llp;
    this.pixels[11][this.last_pos[s]] = this.palette[s].slice(0);
    this.pixels[12][this.last_pos[s]] = this.palette[s].slice(0);
  }

  return this.pixels;
};


module.exports = NAME;
