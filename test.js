var leds = require('./24x6');
var spectrum = require('./cpp-src/build/Release/spectrum');
var FRAME_RATE = 100;
var REPORT_RATE = 500;
var c = 0;
console.log(process.argv);

var now_playing = require("./vizs/" + process.argv[2] + ".js");
now_playing = new now_playing(process.argv[3], process.argv[4]);

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

var render_time = 0;
var spectrum_time = 0;
var layout_time = 0;
var pump_time = 0;

function go() {
  var start_time = (new Date).getTime();
  c++;
  if (c > REPORT_RATE) {
    console.log("avg " + Math.round(render_time/REPORT_RATE) + "ms per frame, frame rate needs " + (1000/FRAME_RATE));
    console.log("  spectrum " + Math.round(spectrum_time/REPORT_RATE) + "ms per frame");
    console.log("  layout   " + Math.round(layout_time/REPORT_RATE) + "ms per frame");
    console.log("  pump     " + Math.round(pump_time/REPORT_RATE) + "ms per frame");
    render_time=0;
    spectrum_time=0;
    layout_time=0;
    pump_time=0;
    c=0;
  }

  d = (new Date).getTime();
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
  spectrum_time += (new Date).getTime()-d;


  d = (new Date).getTime();
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
  layout_time += (new Date).getTime()-d;
  

  d = (new Date).getTime();
  leds.pump(pixels);
  pump_time += (new Date).getTime()-d;

  d = (new Date).getTime();
  render_time += d-start_time;
  setTimeout(go,(1000/FRAME_RATE)-(d-start_time));
}

require('./clear.js');
go();
