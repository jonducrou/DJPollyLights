#include <stdlib.h>
#include <stdio.h>
#include <string.h>
#include <math.h>

#include <iostream>
using namespace std;

#include "include/ws2801-driver.h"
#define BUILDING_NODE_EXTENSION
#include <node.h>
#include <cmath> 

using namespace v8;

int pixelMap [24][6] {
  {132,131,108,107,84,83},
  {133,130,109,106,85,82},
  {134,129,110,105,86,81},
  {135,128,111,104,87,80},
  {136,127,112,103,88,79},
  {137,126,113,102,89,78},
  {138,125,114,101,90,77},
  {139,124,115,100,91,76},
  {140,123,116,99,92,75},
  {141,122,117,98,93,74},
  {142,121,118,97,94,73},
  {143,120,119,96,95,72},
  {0,23,24,47,48,71},
  {1,22,25,46,49,70},
  {2,21,26,45,50,69},
  {3,20,27,44,51,68},
  {4,19,28,43,52,67},
  {5,18,29,42,53,66},
  {6,17,30,41,54,65},
  {7,16,31,40,55,64},
  {8,15,32,39,56,63},
  {9,14,33,38,57,62},
  {10,13,34,37,58,61},
  {11,12,35,36,59,60}
};

CWS2801Driver ws2801("/dev/spidev1.1");

double colourCorrect (int c) {
  // I found that these leds dont have a linear illumination. this tries to compensate.
  return pow(c,1.5f)/24;
}

void setPixel(int n, double r, double g, double b) {
  ws2801.SetLed(n,r,g,b);
//  cout << "Setting " << n << " to " << r << ", " << g << ", " << b << endl;
}

Handle<Value> setLed(const Arguments& args) {
  HandleScope scope;
  if (args.Length() < 4) {
    ThrowException(Exception::TypeError(String::New("Wrong number of arguments")));
    return scope.Close(Undefined());
  }
  if (!args[0]->IsNumber() || !args[1]->IsNumber() || !args[2]->IsNumber() || !args[3]->IsNumber()) {
    ThrowException(Exception::TypeError(String::New("Wrong arguments")));
    return scope.Close(Undefined());
  }
  setPixel(args[0]->NumberValue(),
    colourCorrect(args[1]->NumberValue()),
    colourCorrect(args[2]->NumberValue()),
    colourCorrect(args[3]->NumberValue())
  );
  return scope.Close(Undefined());
}

Handle<Value> draw(const Arguments& args){
  HandleScope scope;
  ws2801.Draw();
  return scope.Close(Undefined());
}

Handle<Value> pump(const Arguments& args){
  HandleScope scope;
  if (args.Length() != 1) {
    ThrowException(Exception::TypeError(String::New("Wrong number of arguments")));
    return scope.Close(Undefined());
  }

  if (args[0]->IsArray()) {
    Handle<Array> x_array = Handle<Array>::Cast(args[0]);
    for (int i = 0; i < x_array->Length(); i++) {
      if (x_array->Get(i)->IsArray()) {
        Handle<Array> y_array = Handle<Array>::Cast(x_array->Get(i));
        for (int j = 0; j < y_array->Length(); j++) {
          if (y_array->Get(j)->IsArray()) {
	    Handle<Array> p_array = Handle<Array>::Cast(y_array->Get(j));
	    setPixel(pixelMap[i][j],
              colourCorrect(p_array->Get(0)->NumberValue()),
              colourCorrect(p_array->Get(1)->NumberValue()),
              colourCorrect(p_array->Get(2)->NumberValue())
            );
	  }
        }
      }     
    }
  }
  ws2801.Draw();
  return scope.Close(Undefined());
}

void init(Handle<Object> exports) {
  exports->Set(String::NewSymbol("setLed"), FunctionTemplate::New(setLed)->GetFunction());
  exports->Set(String::NewSymbol("draw"), FunctionTemplate::New(draw)->GetFunction());
  exports->Set(String::NewSymbol("pump"), FunctionTemplate::New(pump)->GetFunction());
}


NODE_MODULE(ledcontrol, init)
