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
  this.now_on = 0;
  this.ons = [ [0,255,0], [255,0,0], [0,0,255]];
  this.on = this.ons[this.now_on];
  this.off = [0,0,0];
  this.from_last_beat = 0;
  this.skip = 0;
};

// must return a 24x6x3 array of bytes (this.pixels)
NAME.prototype.getFrame = function(spectrum,volume,bpm,onBeat){ 
  this.skip++;
     
  if (onBeat && this.from_last_beat > 3) {
    if (this.from_last_beat < 5) {
      this.now_on = (this.now_on + 1) % this.ons.length;
      this.on = this.ons[this.now_on];
    }
    this.from_last_beat = 0;
  }

  if (this.skip < 3) 
    return this.pixels; 

  this.skip = 0;

  //move the lines out
  for (var j = 0; j < 6; ++j) {
    for (var i = 0; i < 11; ++i) {
      this.pixels[i][j] = this.pixels[i+1][j];
      this.pixels[23-i][j] = this.pixels[22-i][j];
    }
    this.pixels[11][j] = this.off;
    this.pixels[12][j] = this.off;     
  }
  
  if (this.from_last_beat == 0) {
    this.pixels[11][3] = this.on;
    this.pixels[12][3] = this.on; 
  } else if (this.from_last_beat == 1) {
    this.pixels[11][2] = this.on;
    this.pixels[12][2] = this.on;
    this.pixels[11][4] = this.on;
    this.pixels[12][4] = this.on; 
  } else if (this.from_last_beat == 2) {
    this.pixels[11][1] = this.on;
    this.pixels[12][1] = this.on; 
    this.pixels[11][5] = this.on;
    this.pixels[12][5] = this.on; 
  } else if (this.from_last_beat == 3) {
    this.pixels[11][0] = this.on;
    this.pixels[12][0] = this.on; 
  } 

  this.from_last_beat++;

  return this.pixels;
};


module.exports = NAME;
