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
var hearts = require('./vizs/hearts.js');
var clock = require('./vizs/clock.js');
var dj_polly = require('./vizs/dj-polly.js');
var surf = require('./vizs/surf.js');
var FRAME_RATE = 50;
var c = 0;
var now_playing = ['dj_polly'];

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
//  'image': new im(), 
  'skulls': new skulls(), 
  'fire': new fire(), 
  'equalizer': new equalizer(),
  'plasma': new plasma(),
  'glasses': new glasses(),
  'hearts': new hearts(),
  'clock': new clock(),
  'dj_polly': new dj_polly(),
  'surf': new surf()
};

var next_frame = (new Date).getTime();
var miss_c = 0;

function go() {
  var d = (new Date).getTime();
  miss_c+=d-next_frame;
  next_frame = d+1000/FRAME_RATE;
  
  c++;
  if (c > 250) {
    console.log("avg " + miss_c/c + "ms late " + now_playing);
    if (now_playing.length > 2 || (now_playing.length == 2 && Math.random() > .5)) {
      now_playing.splice(Math.floor(Math.random() * now_playing.length), 1);
    } else {
      var keys = Object.keys(providers);
      now_playing.push(keys[ keys.length * Math.random() << 0]);
    }
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
  var things = ['surf'];//'dj_polly','fire'];//'equalizer','glasses'];//'fire','text','rainbow','plasma'];
  things = now_playing;
  
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
