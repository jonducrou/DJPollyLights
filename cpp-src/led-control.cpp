#include <stdlib.h>
#include <stdio.h>
#include <string.h>
#include <math.h>

#include "include/ws2801-driver.h"
#define BUILDING_NODE_EXTENSION
#include <node.h>

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

  ws2801.SetLed(args[0]->NumberValue(), args[1]->NumberValue(), args[2]->NumberValue(), 
args[3]->NumberValue());

  return scope.Close(Undefined());
}

Handle<Value> draw(const Arguments& args){
  HandleScope scope;
  ws2801.Draw();
  return scope.Close(Undefined());
}

int main(int argc, char ** argv)
{
     const int fps = 1;
     int i;
     int count = 0;
//     try
     {
          printf("debug: ws2801 object ready\n");
    
          while (1)
          {
               ws2801.ClearBuffer();
               for(int i = 0; i < 16; i++)
               {
                    ws2801.SetLed(i, i==count?255:0,(i+16==count)?255:0,(i+32==count)?255:0);
//ws2801.SetLed(i, i==count?255:0, i==(count+1)?255:0, i==(count+2)?255:0);
               }
               count++;
               count=count%48;
               ws2801.Draw();
               usleep(1000000 / fps);
	       //sleep(1);
	       //printf("loop\n");
          }
     }
//     catch (int error)
  //   {
//          printf("Exception %d (%s)\n", error, strerror(error));
    // }

     return EXIT_SUCCESS;
}


void init(Handle<Object> exports) {
  exports->Set(String::NewSymbol("setLed"), FunctionTemplate::New(setLed)->GetFunction());
  exports->Set(String::NewSymbol("draw"), FunctionTemplate::New(draw)->GetFunction());
}


NODE_MODULE(ledcontrol, init)
