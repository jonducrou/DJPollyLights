var leds = require('./24x6');
var spectrum = require('./cpp-src/build/Release/spectrum');
var r = require('./vizs/rainbow.js');
var t = require('./vizs/text.js');
var im = require('./vizs/image.js');
var skulls = require('./vizs/skulls.js');
var plasma = require('./vizs/plasma2.js');
var fire = require('./vizs/fire.js');
var equalizer = require('./vizs/equalizer.js');
var glasses = require('./vizs/glasses.js');
var hearts = require('./vizs/hearts.js');
var clock = require('./vizs/clock.js');
var dj_polly = require('./vizs/dj-polly.js');
var surf = require('./vizs/surf.js');
var mo = require('./vizs/mo.js');
var mario = require('./vizs/mario.js');
var FRAME_RATE = 50;
var c = 0;
var now_playing = [['dj_polly',255]];

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
//  'text': new t("Dj Polly!"), 
//  'image': new im(), 
//  'skulls': new skulls(), 
  'fire': new fire(), 
  'equalizer': new equalizer(),
  'plasma': new plasma(),
  'glasses': new glasses(),
  'hearts': new hearts(),
//  'clock': new clock(),
  'dj_polly': new dj_polly(),
  'surf': new surf(),
  'mo': new mo(),
  'mario': new mario()
};

var next_frame = (new Date).getTime();
var miss_c = 0;

function go() {
  var d = (new Date).getTime();
  miss_c+=d-next_frame;
  next_frame = d+1000/FRAME_RATE;
  
  c++;
  if (now_playing[0][1] <= 0) {
    now_playing.splice(0,1);
  }
  if (c > 750) {
    console.log("avg " + Math.round(miss_c/c) + "ms per frame, frame rate needs " + (1000/FRAME_RATE));
    if (now_playing.length == 1) {
      var keys = Object.keys(providers);
      for (var p=0;p<now_playing.length;++p){
        for (var k=0;k<keys.length;++k){
          if (now_playing[p][0] === keys[k]) {
            keys.splice(k,1);
          }
        }
      }
      now_playing.push([keys[ keys.length * Math.random() << 0], 0]);
    }
    console.log("Now playing:" + now_playing);
    c=0;
    miss_c=0;
  }
  if (now_playing.length > 1) {
    now_playing[0][1]-=now_playing[0][1]<=0?0:1;
    now_playing[1][1]+=now_playing[1][1]>=255?0:1;
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
  var things = [['mario',255]];
  things = now_playing;
  
  for (var i = 0; i < things.length; ++i){
    var v = providers[things[i][0]].getFrame(s,volume,s[7],s[8] > 0);
    for (var x = 0; x < 24;++x){
      for (var y = 0; y < 6;++y){
        for (var b = 0; b < 3; ++b){
          pixels[x][y][b] += v[x][y][b]*things[i][1]/255;
        }  
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

function test_pattern(i,x,y){
  leds.setLed(x,y,i==0?255:0,i==1?255:0,i==2?255:0); 
  leds.draw();
  if (i > 2){
    go(); 
  } else {
    x+=1;
    if (x==24) {
      y++;
      if (y==6) {
        i++;
      }
    }
    setTimeout(function(){test_pattern(i,x%24,y%6)},1);
  }
}

require('./clear.js');
test_pattern(0,0,0);
