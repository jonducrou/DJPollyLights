var Canvas = require('canvas');

var clock = function (){
  this.canvas = new Canvas(24,6);
  this.ctx = this.canvas.getContext('2d');
  this.text_width = this.ctx.measureText(this.text).width;

  this.c = 0.0;
  this.params = [{'speed':0.05,'colour':'rgba(  0,128,  0,.25)'},
                 {'speed':0.07,'colour':'rgba(  0,  0,128,.25)'},
                 {'speed':0.11,'colour':'rgba(  0,128,128,.25)'},
                 {'speed':0.13,'colour':'rgba(128,  0,128,.25)'},
                 {'speed':0.17,'colour':'rgba(128,128,  0,.25)'},
                 {'speed':0.19,'colour':'rgba(128,  0,  0,.25)'},
                 {'speed':0.23,'colour':'rgba(128,  128,  128,.25)'}];

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
clock.prototype.getFrame = function(spectrum,volume){
  this.c++;

  this.ctx.fillStyle = 'rgba(0,0,0,255)';
  this.ctx.fillRect(0,0,24,6);


  for (var i = 0; i < this.params.length; ++i) {
    if (spectrum[i]<10) continue;
    var param = this.params[i];

    this.ctx.translate(12,3);
    this.ctx.rotate(param.speed*this.c);

    this.ctx.strokeStyle = param.colour;
    this.ctx.beginPath();
    this.ctx.lineTo(0, 0);
    this.ctx.lineTo(24, 0);
    this.ctx.stroke();

    this.ctx.rotate(-param.speed*this.c);
    this.ctx.translate(-12,-3);
  }

  for (var x = 0; x < 24;++x){ 
    for (var y = 0; y < 6; y++){
      var data = this.ctx.getImageData(x,y,1,1).data;
      this.pixels[x][y] = [data[0], data[1],data[2]];
    }
  }

  return this.pixels;
};





module.exports = clock;
