var leds = require('./24x6');
var spectrum = require('./cpp-src/build/Release/spectrum');
var FRAME_RATE = 50;
var c = 0;
console.log(process.argv);

var now_playing = require("./vizs/" + process.argv[2] + ".js");
now_playing = new now_playing();

var pixels = new Array();
for (var x = 0; x < 24;++x){
  pixels[x] = new Array();
  for (var y = 0; y < 6; y++){
    pixels[x][y] = new Array();
    for (var b = 0; b < 3; b++){
      pixels[x][y][b] = 0;
    }
  }
}

var next_frame = (new Date).getTime();
var miss_c = 0;

function go() {
  var d = (new Date).getTime();
  miss_c+=d-next_frame;
  next_frame = d+1000/FRAME_RATE;
  
  c++;
  if (c > 750) {
    console.log("avg " + Math.round(miss_c/c) + "ms per frame, frame rate needs " + (1000/FRAME_RATE));
    c=0;
    miss_c=0;
  }

  var s;
  try {
    s = spectrum.getSpectrum();
  } catch (x){
    console.log("f: ");
  }
  if (s==undefined){
    console.log("x:");
    s=[0,0,0,0,0,0];
  }
  var volume = (s[0]+s[1]+s[2]+s[3]+s[4]+s[5]+s[6])/7;

  for (var x = 0; x < 24;++x){
    for (var y = 0; y < 6; y++){
      for (var b = 0; b < 3; b++){
        pixels[x][y][b] = 0;
      }
    }
  }
  var v = now_playing.getFrame(s,volume,s[7],s[8] > 0);
  for (var x = 0; x < 24;++x){
    for (var y = 0; y < 6;++y){
      for (var b = 0; b < 3; ++b){
        pixels[x][y][b] = v[x][y][b];
      }  
    }
  }
  
  for (var x = 0; x < 24;++x){ 
    for (var y = 0; y < 6;++y){ 
      leds.setLed(x,y,pixels[x][y][0],pixels[x][y][1],pixels[x][y][2]); 
    }
  }
  leds.draw();
  d = (new Date).getTime() - d;
  setTimeout(go,(1000/FRAME_RATE)-d);
}

require('./clear.js');
go();
