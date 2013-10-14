var leds = require('./24x6');
var c = 0;
for (var x = 0; x < 24;++x){
  var input = 255*x/23;
  var modded = Math.pow(input,1.5)/24;
  console.log(input, " - ", modded); 
  leds.setLed(x,0,modded,0,0);
 
  leds.setLed(x,1,255,0,0); 
  leds.setLed(x,2,0,modded,0,0); 
  leds.setLed(x,3,0,255,0,0); 
  leds.setLed(x,4,0,0,modded,0,0); 
  leds.setLed(x,5,0,0,255,0,0); 

  for (var y = 0; y < 3;++y){ 
    c++;
//    leds.setLed(x,y,c,c,c); 
  }
}
leds.draw();
