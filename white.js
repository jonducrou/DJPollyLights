var leds = require('./24x6');

for (var x = 0; x < 24;++x){ 
  for (var y = 0; y < 6; y++) {
    leds.setLed(x,y,255,255,255); 
  }
}
leds.draw();
