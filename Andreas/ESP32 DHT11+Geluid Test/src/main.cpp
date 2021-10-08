#include <Arduino.h>
#include <DHT_U.h>
#include <TFT_eSPI.h>

#include <SPI.h>
#include <FS.h>
#include <SPIFFS.h>

#define DHTPIN 32
#define DHTTYPE DHT11

#define SOUND_AO 12

TFT_eSPI tft = TFT_eSPI(); // Constructor for the TFT library
DHT_Unified dht(DHTPIN, DHTTYPE);

void setup()
{
  pinMode(DHTPIN, INPUT);
  //Serial.begin(115200);
  tft.init();
  dht.begin();
}

void loop()
{
  tft.setCursor(0, 0, 4);                 //setCursor: x location from left, y location from top, fontsize
  tft.setRotation(1);                     //setRotation: 1: Screen in landscape(USB to the right), 3:  Screen in landscape(USB connector Left)
  tft.fillScreen(TFT_BLACK);              //Fill screen with random colour
  tft.setTextColor(TFT_WHITE, TFT_BLACK); //Textcolor, BackgroundColor; independent of the fillscreen

  sensors_event_t dhtEvent;

  dht.temperature().getEvent(&dhtEvent);
  tft.printf("T:       %.2f C\n", dhtEvent.temperature);
  dht.humidity().getEvent(&dhtEvent);
  tft.printf("RH:   %.2f %%\n", dhtEvent.relative_humidity);

  double soundAverage = 0;
  for (uint8_t i = 0; i < 100; i++)
  {
    soundAverage += analogRead(SOUND_AO);
  }
  soundAverage = soundAverage / 100;
  tft.printf("Sound lvl: %.2f", soundAverage);

  delay(250);
}
