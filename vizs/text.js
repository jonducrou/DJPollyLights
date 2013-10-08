var text = function (str){
  this.str = str;
  this.offset = 0;
  this.length = 0;
  this.skip = 0;
  this.SKIP_SIZE = 3;

  this.mask = new Array();
  for (var c = 0; c < 24;++c) {
    this.mask[this.length++] = [0,0,0,0,0,0];    
  }
  for (var c =0; c < str.length;++c) {
    var t = this[str.charAt(c)]();
    for (var i = 0; i < t.length;++i) {
      this.mask[this.length++] = t[i];
    }
    this.mask[this.length++] = [0,0,0,0,0,0];
  }
  this.mask[this.length++] = [0,0,0,0,0,0];
  this.mask[this.length++] = [0,0,0,0,0,0];
  this.mask[this.length++] = [0,0,0,0,0,0];
  this.mask[this.length++] = [0,0,0,0,0,0];
  while (this.length < 24) {
    this.mask[this.length++] = [0,0,0,0,0,0];    
  }
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
text.prototype.getFrame = function(spectrum,volume){
  //more stuff goes here
  for (var x = 0; x < 24; ++x) {
    for (var y = 0; y < 6; ++y) {
      var v =0;
      if (x+this.offset<this.length) {
        v = this.mask[(x+this.offset)][y] * spectrum[6];
      }
      this.pixels[x][y] = [v,v,v]; 
    }
  }
  this.skip++;
  if (this.skip >= this.SKIP_SIZE) {
    this.offset = ++this.offset%this.length;
    this.skip=0;
  }
  if (this.offset > this.length+24) {
    this.offset = 0;
  }
  return this.pixels;
};

// each letter returns a 2D array that defines the font. 

text.prototype.d = function(){
  return [[0,0,0,1,0,0],[0,0,1,0,1,0],[1,1,1,1,1,0]];
}
text.prototype.D = function(){
  return [[1,1,1,1,1,0],[1,0,0,0,1,0],[0,1,1,1,0,0]];
}
text.prototype.j = function(){
  return [[0,0,0,0,0,1],[1,0,1,1,1,1]];
}
text.prototype.l = function(){
  return [[1,1,1,1,1,0]];
}
text.prototype.o = function(){
  return [[0,0,0,1,0,0],[0,0,1,0,1,0],[0,0,0,1,0,0]];
}
text.prototype.P = function(){
  return [[1,1,1,1,1,0],[1,0,1,0,0,0],[0,1,0,0,0,0]];
}
text.prototype.y = function(){
  return [[0,0,1,0,0,0],[0,0,0,1,0,1],[0,0,1,1,1,0]];
}
text.prototype[" "] = function(){
  return [[0,0,0,0,0,0]];
}
text.prototype["!"] = function(){
  return [[1,1,1,0,1,0]];
}





module.exports = text;
