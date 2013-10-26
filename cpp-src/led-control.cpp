#include <stdlib.h>
#include <stdio.h>
#include <string.h>
#include <math.h>

#include "include/ws2801-driver.h"
#define BUILDING_NODE_EXTENSION
#include <node.h>
#include <cmath> 

using namespace v8;


CWS2801Driver ws2801("/dev/spidev1.1");

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
  // I found that these leds dont have a linear illumination. this tries to compensate.
  double r = pow(args[1]->NumberValue(),1.5f)/24;
  double g = pow(args[2]->NumberValue(),1.5f)/24;
  double b = pow(args[3]->NumberValue(),1.5f)/24;
  ws2801.SetLed(args[0]->NumberValue(),r,g,b);

  return scope.Close(Undefined());
}

Handle<Value> draw(const Arguments& args){
  HandleScope scope;
  ws2801.Draw();
  return scope.Close(Undefined());
}

void init(Handle<Object> exports) {
  exports->Set(String::NewSymbol("setLed"), FunctionTemplate::New(setLed)->GetFunction());
  exports->Set(String::NewSymbol("draw"), FunctionTemplate::New(draw)->GetFunction());
}


NODE_MODULE(ledcontrol, init)
