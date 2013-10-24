var leds = require('./24x6');
var spectrum = require('./cpp-src/build/Release/spectrum');
var r = require('./vizs/rainbow.js');
var t = require('./vizs/text.js');
var im = require('./vizs/image.js');
var skulls = require('./vizs/skulls.js');
var plasma = require('./vizs/plasma.js');
var fire = require('./vizs/fire.js');
var equalizer = require('./vizs/equalizer.js');
var glasses = require('./vizs/glasses.js');
var FRAME_RATE = 30;

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


var providers = {
  'rainbow': new r(), 
  'text': new t("Dj Polly!"), 
  'image': new im(), 
  'skulls': new skulls(), 
  'fire': new fire(), 
  'equalizer': new equalizer(),
  'plasma': new plasma(),
  'glasses': new glasses()
};

function go() {
  var d = (new Date).getTime();
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

//  var v = providers['rainbow'].getFrame(s,volume);
//  var v = providers['text'].getFrame(s,volume);
//  var v = providers['image'].getFrame(s,volume);
//  var v = providers['skulls'].getFrame(s,volume);
//  var v = providers['plasma'].getFrame(s,volume);


  for (var x = 0; x < 24;++x){
    for (var y = 0; y < 6; y++){
      for (var b = 0; b < 3; b++){
        pixels[x][y][b] = 0;
      }
    }
  }
//  var things = ['skulls','plasma','text','rainbow'];
  var things = 
['equalizer','glasses'];//'fire','text','rainbow','plasma'];
  
  
  for (var i = 0; i < things.length; ++i){
    var v = providers[things[i]].getFrame(s,volume,s[8] > 0);
    for (var x = 0; x < 24;++x){
      for (var y = 0; y < 6;++y){
        for (var b = 0; b < 3; ++b){
          pixels[x][y][b] += v[x][y][b]/things.length;
        }  
      }
    }
  }
  
  for (var x = 0; x < 24;++x){ 
    for (var y = 0; y < 6;++y){ 
      leds.setLed(x,y,pixels[x][y][0],pixels[x][y][1],pixels[x][y][2]); 
//      leds.setLed(x,y,v[x][y][0],v[x][y][1],v[x][y][2]); 
    }
  }
  leds.draw();
  d = (new Date).getTime() - d;
  setTimeout(go,(1000/FRAME_RATE)-d);
  global.gc();
}

go();
