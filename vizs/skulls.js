var Canvas = require('canvas');

var skulls = function (){
  this.canvas = new Canvas(24,6);
  this.ctx = this.canvas.getContext('2d');
  this.text = "Hello Seattle! Put your hands up?";
  this.text_width = this.ctx.measureText(this.text).width;
  this.scroll=-25;

  this.c = 0.0;
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
skulls.prototype.getFrame = function(spectrum,volume){
  this.c++;

  this.ctx.fillStyle = 'rgba(0,0,0,255)';
  this.ctx.fillRect(0,0,24,6);
  this.ctx.fillStyle = 'rgba(0,150,00,255)';
  this.ctx.font = '6px';
//  this.ctx.translate(12-this.scroll,3);
//  this.ctx.rotate(0.1);
//  this.ctx.fillText(this.text, 12, 4);
//  this.ctx.rotate(-.1);
//  this.ctx.translate(this.scroll-12,-3);

  this.scroll = this.scroll>this.text_width?-25:this.scroll+1;

  this.ctx.translate(12,3);
  this.ctx.rotate(.1*this.c);

  this.ctx.strokeStyle = 'rgba(0,128,0,.5)';
  this.ctx.beginPath();
  this.ctx.lineTo(0, 0);
  this.ctx.lineTo(24, 0);
  this.ctx.stroke();

  this.ctx.rotate(-.1*this.c);
  this.ctx.translate(-12,-3);

  this.ctx.translate(12,3);
  this.ctx.rotate(.2*this.c);

  this.ctx.strokeStyle = 'rgba(0,0,128,.5)';
  this.ctx.beginPath();
  this.ctx.lineTo(0, 0);
  this.ctx.lineTo(24, 0);
  this.ctx.stroke();

  this.ctx.rotate(-.2*this.c);
  this.ctx.translate(-12,-3);

  this.ctx.translate(12,3);
  this.ctx.rotate(.3*this.c);

  this.ctx.strokeStyle = 'rgba(128,0,0,.5)';
  this.ctx.beginPath();
  this.ctx.lineTo(0, 0);
  this.ctx.lineTo(24, 0);
  this.ctx.stroke();

  this.ctx.rotate(-.3*this.c);
  this.ctx.translate(-12,-3);


  for (var x = 0; x < 24;++x){ 
    for (var y = 0; y < 6; y++){
      var data = this.ctx.getImageData(x,y,1,1).data;
      this.pixels[x][y] = [data[0], data[1],data[2]];
    }
  }

  return this.pixels;
};





module.exports = skulls;
