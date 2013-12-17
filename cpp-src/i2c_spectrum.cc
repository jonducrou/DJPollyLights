#include <glib.h>
#include <glib/gprintf.h>
#include <errno.h>
#include <string.h>
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <linux/i2c-dev.h>
#include <sys/ioctl.h>
#include <sys/types.h>
#include <sys/stat.h>
#include <fcntl.h>

#define BUILDING_NODE_EXTENSION
#include <node.h>

using namespace v8;
 
int file;

Handle<Value> getSpectrum(const Arguments& args) {
  HandleScope scope;

    char buf[10] = {0};

    // Using I2C Read
    if (read(file,buf,9) != 9) {
        /* ERROR HANDLING: i2c transaction failed */
        return scope.Close(Undefined());
    } else {
      int i = 0;
      Local<Object> obj = Object::New();
      for (i = 0 ; i < 9; ++i){
        obj->Set(Number::New(i), Number::New(buf[i]));
      }
      return scope.Close(obj);
        }

  return scope.Close(Undefined());
}

void Init(Handle<Object> exports) {
    char filename[40];
    int addr = 0x29;        // The I2C address of the Arduino

    sprintf(filename,"/dev/i2c-1");
    if ((file = open(filename,O_RDWR)) < 0) {
        /* ERROR HANDLING; you can check errno to see what went wrong */
        ThrowException(Exception::TypeError(String::New("Failed to open bus")));
    }

    if (ioctl(file,I2C_SLAVE,addr) < 0) {
        /* ERROR HANDLING; you can check errno to see what went wrong */
        ThrowException(Exception::TypeError(String::New("Failed to talk to slave")));
    }
  exports->Set(String::NewSymbol("getSpectrum"),
      FunctionTemplate::New(getSpectrum)->GetFunction());
}

NODE_MODULE(spectrum, Init)
