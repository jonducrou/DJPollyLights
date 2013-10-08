#include <stdlib.h>
#include <stdio.h>
#include <string.h>
#include <math.h>

#include "ws2801-driver.h"

int main(int argc, char ** argv)
{
     const int fps = 1;
     int i;
     int count = 0;
     try
     {
          CWS2801Driver ws2801("/dev/spidev1.1");
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
     catch (int error)
     {
          printf("Exception %d (%s)\n", error, strerror(error));
     }

     return EXIT_SUCCESS;
}
