#include "Wire.h"

int spectrumReset=5;
int spectrumStrobe=4;
int spectrumAnalog=0;  

byte spectrum[7];

void setup() { 
  Wire.begin(0x29);              
  Wire.onRequest(sendSpectrum); 
  
  pinMode(spectrumReset, OUTPUT);
  pinMode(spectrumStrobe, OUTPUT);

  //Init spectrum analyzer
  digitalWrite(spectrumStrobe,LOW);
  delay(1);
  digitalWrite(spectrumReset,HIGH);
  delay(1);
  digitalWrite(spectrumStrobe,HIGH);
  delay(1);
  digitalWrite(spectrumStrobe,LOW);
  delay(1);
  digitalWrite(spectrumReset,LOW);
  delay(5);
  // Reading the analyzer now will read the lowest frequency.
}

//just loop and read - need to add normalization
void loop() {
  readSpectrum();
  delay(1);
}

// Read 7 band equalizer.
void readSpectrum()
{
  // Band 0 = Lowest Frequencies.
  byte i;
  for(i=0;i <7; i++)
  {
    //Read twice and take the average by dividing by 2
    int value = (analogRead(spectrumAnalog) + analogRead(spectrumAnalog) ) >>1; 
    //there is noise on the line - this just smooths the noise by flooring low signal strength to zero
    value -= 80;
    if (value < 0)
      value=0;
    //value is 10 bit, we need 8 bit, so divide by 4
    value >>= 2;
    spectrum[i] = (byte)((float)spectrum[i] * 0.7 + (float)value * 0.3);
    //request the next value
    digitalWrite(spectrumStrobe,HIGH);
    digitalWrite(spectrumStrobe,LOW);     
  }
}

void sendSpectrum() {
  Wire.write(spectrum, 7);
}
