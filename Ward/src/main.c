/*
 * main.c
 * 
 */

#include "main.h"
/*
int setupUart(void) 
{
	if (wiringPiSetup()==-1) 
	{
	  printf ("\E[1;31mError: unable to start wiringPi.\E[0m\n");
	  return 0 ;
	}
	#ifdef DEBUG
		else printf("\E[0;30m\E[43m*** DEBUG *** wiringPiSetup() - complete\E[0m\n");
	#endif
	int fd;
	system("sudo stty -F /dev/ttyUSB0 -hupcl");
	sleep(1);
	system("sudo chmod a+rw /dev/ttyUSB0");
	if ((fd = serialOpen ("/dev/ttyUSB0", 9600)) < 0) 
	{ 
		printf ("\E[1;31mError: unable to open serial device.\E[0m\n") ; 
		return -1 ; 
	} else {
		serialFlush(fd);
		#ifdef DEBUG
			printf("\E[0;30m\E[43m*** DEBUG *** setupUart() - complete\E[0m\n");
		#endif 
	}
	return fd;
}
*/
void main(void)
{
	
		DPRINT("HELLO WORLD");
		
		
	
}

