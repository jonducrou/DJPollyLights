var leds = require('./24x6');
var spectrum = require('./cpp-src/build/Release/spectrum');
var settings = require('./settings.json');
var FRAME_RATE = 50;
var c = 0;

var providers = {};
var now_playing = [[settings["start"],255]];

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



for (var i = 0; i < settings['providers'].length; ++i) {
  var p = settings['providers'][i];
  var r = require('./vizs/' + p.name + '.js');
  providers[p.name] = new r(p.args);
}

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
  if (c > 2000) {
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
    console.log("ERROR: Unable to getSpectrum()" + x);
  }
  if (s==undefined){
    console.log("ERROR: Spectrum undefined?!");
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
  
//  for (var x = 0; x < 24;++x){ 
  //  for (var y = 0; y < 6;++y){ 
  //    leds.setLed(x,y,pixels[x][y][0],pixels[x][y][1],pixels[x][y][2]); 
  //  }
//  }
//  leds.draw();
  leds.pump(pixels);
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
    setTimeout(function(){test_pattern(i,x%24,y%6)},0);
  }
}

require('./clear.js');
test_pattern(0,0,0);
