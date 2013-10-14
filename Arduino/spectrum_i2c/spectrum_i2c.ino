#include "Wire.h"

int spectrumReset=5;
int spectrumStrobe=4;
int spectrumAnalog=0;  

byte spectrum[9];


#define SIZE 1024
#define SLICE 32

byte huge[SIZE];
long energy[SIZE/SLICE];
int p = 0;
long t;
long start;
float bpm = 120;
boolean offBeat = true; 
boolean sentBeat = false;

void setup() { 
  start = t = millis();
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
  captureBeat(spectrum[0]);
}

void sendSpectrum() {
  spectrum[7] = bpm;
  if (!offBeat && !sentBeat) {
    spectrum[8] = 1;
    sentBeat = true;
  } else {
    spectrum[8] = 0;
    sentBeat = false;
  }
  Wire.write(spectrum, 9);
}



void captureBeat(byte value) {
  huge[SIZE - (p+1)] = value;

  p++;
  if (p == SLICE) {
    p=0;
    long newEnergy = 0;
    long sumEnergy = 0;
    for (int j = SIZE-SLICE; j < SIZE;j++) {       
      newEnergy += huge[j]*huge[j];
    }
    for (int i = 1; i < SIZE/SLICE;i++) {
      sumEnergy += energy[i];
      energy[i-1] = energy[i];
      memcpy(huge+((i-1)*SLICE),huge+(i*SLICE), SLICE * sizeof(byte));
    }
    sumEnergy*=SLICE;
    sumEnergy/=SIZE;
    energy[(SIZE/SLICE)-1] = newEnergy;
    // Serial.print(" ");     
    // Serial.print(newEnergy);     
    // Serial.print(" ");     
    // Serial.print(sumEnergy);   
    //     Serial.println(" ");      
    long diff = millis()-t;
    if (newEnergy > 1.3 * sumEnergy && diff > 300) {
      if (offBeat) {
        float newBPM = 60000/(float)diff;
        bpm = bpm*.9 + newBPM*.1;
        t = millis();  
      }
      offBeat = false;
    } 
    else {
      offBeat = true;
    }
  }

}

