/*
 * beacon.h
 * 
 * belangrijk: opstartvolgorde! 
 * eerst ./service starten
 * vervolgens ./uart starten
 * daarna kunnen andere programma's gewoon gestart worden
 * 
 */

#ifndef MAIN_H_
#define MAIN_H_

#define DEBUG 1

#if DEBUG
#define DPRINT(...) printf("\E[1;31m") printf(__VA_ARGS__) printf("\E[0m\n") 
#else
#define DPRINT(...)
#endif

#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#include <unistd.h>
#include <errno.h>
#include <sys/msg.h>


/*
#define DATALENGTH 100

#define ASKLOCCMD 20
#define GIVELOCCMD 30
#define ASKDATACMD 40
#define GIVEDATACMD 50

#define OUTPUTTYPE 20
#define SERVICETYPE 30
#define CALCULATETYPE 40

#define PORT 8080

typedef struct {
  long int type;
  int cmd;
  char data[DATALENGTH];
} queuepakket;

typedef struct {

  int major;
  int minor;
  int x;
  int y;
  float dist;
  int angle;
} beacondata;


#include <math.h>

#include <ulfius.h>

#include <wiringPi.h>
#include <wiringSerial.h>

int setupUart(void);
int setupQueue(void);
void killQueue(int queue);
void beaconDataFromQueue(int queue, int type, int *x0, int *y0, float *dist0, int *x1, int *y1, float *dist1, int *x2, int *y2, float *dist2);
void locationToQueue(int queue, int type, float xpos, float ypos, float angle);
void beaconDataToQueue(int queue, beacondata *arr_bd);
beacondata processUartData(char *bd);
beacondata processUartDataWithFile(char *bd);
void getLocation(float *xpos, float *ypos);
void getLocation2(float *xpos, float *ypos, float *angle);
int receiveUartData(int fd, char *pck);
int sendUartToQueue(char *pck, int queue);
*/
#endif
