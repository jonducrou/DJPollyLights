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
    [1,2,2,1,1,0],
    [0,1,1,0,0,0],
    [0,1,1,0,0,0],
    [1,2,2,1,1,0],
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
    [0,0,1,0,0,0]
  ];
  this.b = 0;
  this.flip = false;
  this.flip_count = 0;
};

// must return a 24x6x3 array of bytes (this.pixels)
glasses.prototype.getFrame = function(spectrum,volume,bpm,onBeat){
  this.b++;
  this.flip_count++;
  if (this.flip_count > 0 && onBeat) {
    this.flip_count = 0;
    this.flip = !this.flip;
  }
  for (var x = 0; x < 24;++x){ 
    for (var y = 0; y < 6; y++){
      switch (this.glasses_mask[this.flip?x:23-x][y]) {
        case 0:
          this.pixels[x][y] = onBeat ? [100,100,100] : [80,80,80];
          break;
        case 1:
          this.pixels[x][y] = [0,0,0];
          break;
        case 2:
          switch ((this.b+y)%6) {
            case 0:
              this.pixels[x][y] = [0,0,spectrum[(this.b+x)%7]];
              break;
            case 1:
              this.pixels[x][y] = [0,spectrum[(this.b+x)%7],spectrum[(this.b+x)%7]];
              break;
            case 2:
              this.pixels[x][y] = [0,spectrum[(this.b+x)%7],0];
              break;
            case 3:
              this.pixels[x][y] = [spectrum[(this.b+x)%7],spectrum[(this.b+x)%7],0];
              break;
            case 4:
              this.pixels[x][y] = [spectrum[(this.b+x)%7],0,0];
              break;
            case 5:
              this.pixels[x][y] = [spectrum[(this.b+x)%7],0,spectrum[(this.b+x)%7]];
              break;
          }
        break;
      }
    }
  }

  return this.pixels;
};

module.exports = glasses;

