#include <SPI.h>
#include <LoRa.h>

#include <MQ2.h>

#define SENSORID 2110211425   // hier pakt ge gewoon JJMMDDhhmm (altijd uniek)
#define SYNCWORD 0x84   // altijd identiek
#define TXPOWER 20            // hoe fel wilt ge zenden

int counter = 0;
int crc = 0;

int lpg, co, smoke;
MQ2 mq2(A5);

void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);
    while (!Serial);

  Serial.println("LoRa Sender");

  if (!LoRa.begin(868E6)) {
    Serial.println("Starting LoRa failed!");
    while (1);
  }
  LoRa.setSyncWord(SYNCWORD);
  LoRa.setTxPower(TXPOWER);
  
  mq2.begin();
}

void loop() {
  // put your main code here, to run repeatedly:


  float* values= mq2.read(true); //set it false if you don't want to print the values in the Serial
  //lpg = values[0]*10000;
  lpg = mq2.readLPG()*10000;
  //co = values[1];
  co = mq2.readCO()*10000;
  //smoke = values[2];
  smoke = mq2.readSmoke()*10000;
  crc=lpg+co+smoke;crc%=7;
  // send packet
  
  LoRa.beginPacket();
  LoRa.print(SENSORID);
  LoRa.print(" ");
  LoRa.print("LPG: ");
  LoRa.print(lpg);
  LoRa.print(" ");
  LoRa.print("CO: ");
  LoRa.print(co);
  LoRa.print(" ");
  LoRa.print("SMOKE: ");
  LoRa.print(smoke);
  LoRa.print(" ");
  LoRa.print("CRC: ");
  LoRa.print(crc);
  LoRa.print(" ");
  LoRa.print("COUNTER: ");
  LoRa.print(counter);
  LoRa.endPacket();
  
  Serial.print("Sending packet: ");
  Serial.print(SENSORID);
  Serial.print(" ");
  Serial.print("LPG: ");
  Serial.print(lpg);
  Serial.print(" ");
  Serial.print("CO: ");
  Serial.print(co);
  Serial.print(" ");
  Serial.print("SMOKE: ");
  Serial.print(smoke);
  Serial.print(" ");
  Serial.print("CRC: ");
  Serial.print(crc);
  Serial.print(" ");
  Serial.print("COUNTER: ");
  Serial.print(counter);
  Serial.print(" \n");

  counter++; counter%=30000;
  
  delay(2000);
}
