var fs = require('fs'),
    PNG = require('pngjs').PNG;

var image = function (){
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
  var pixels = this.pixels;
  fs.createReadStream('./res/mo.png')
    .pipe(new PNG({
        filterType: 4
    }))
    .on('parsed', function() {

        for (var y = 0; y < this.height; y++) {
            for (var x = 0; x < this.width; x++) {
                var idx = (this.width * y + x) << 2;
                pixels[x][y] = 
[this.data[idx]/10,this.data[idx+1]/10,this.data[idx+2]/10];
            }
        }
    });
};

// must return a 24x6x3 array of bytes (this.pixels)
image.prototype.getFrame = function(spectrum,volume){

  return this.pixels;
};


module.exports = image;
