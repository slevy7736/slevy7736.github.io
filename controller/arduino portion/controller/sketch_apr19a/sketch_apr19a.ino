const int JOYX_PIN = A0;
const int JOYY_PIN = A1;
const int SW_PIN = 2;

// pins for the LEDs:
const int redPin = 3;
const int greenPin = 5;
const int bluePin = 6;

const int NUM_READINGS = 10;

struct AxisReadings {
  int readIndex;
  int readings[NUM_READINGS];
  float total = 0;
  int average = 0;
  int zeroed;

} xAxisReadings, yAxisReadings;

bool zeroing = false;
bool ready = false;

void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);

  pinMode(SW_PIN, INPUT_PULLUP);

  for (int i = 0; i < NUM_READINGS; i++) {
    xAxisReadings.readings[i] = yAxisReadings.readings[i] = 0;
  }

  // make the pins outputs:
  pinMode(redPin, OUTPUT);
  pinMode(greenPin, OUTPUT);
  pinMode(bluePin, OUTPUT);
}

void loop() {
  // put your main code here, to run repeatedly:
  int xValue = analogRead(JOYX_PIN);
  int yValue = analogRead(JOYY_PIN);

  int swValue = !digitalRead(SW_PIN);

  smoothAxis(&xAxisReadings, xValue);
  smoothAxis(&yAxisReadings, yValue);

  if(Serial.available() > 0) {
    String msg = Serial.readStringUntil('\n');
    if (msg == "zero") {
      zeroing = true;
    } else if (msg.startsWith("COLOR")) {
      int u = msg.charAt(5);

      int red[3] = {255,0,0};
      int orange[3] = {255,25,0};    //255,165,0
      int yellow[3] = {255,60,0};   //255,255,0
      int green[3] = {0,255,0};
      int cyan[3] = {0,255,255};
      int blue[3] = {0,0,255};
      int purple[3] = {255,0,255};
      int white[3] = {255,255,255};

      int rojo;
      int verde;
      int azul;

      if (u == 'R') {
        rojo = red[0];
        verde = red[1];
        azul = red[2];
      } else if (u == 'O') {
        rojo = orange[0];
        verde = orange[1];
        azul = orange[2];
      } else if (u == 'Y') {
        rojo = yellow[0];
        verde = yellow[1];
        azul = yellow[2];
      } else if (u == 'G') {
        rojo = green[0];
        verde = green[1];
        azul = green[2];
      } else if (u == 'C') {
        rojo = cyan[0];
        verde = cyan[1];
        azul = cyan[2];
      } else if (u == 'B') {
        rojo = blue[0];
        verde = blue[1];
        azul = blue[2];
      } else if (u == 'P') {
        rojo = purple[0];
        verde = purple[1];
        azul = purple[2];
      } else if (u == 'J') {
        rojo = LOW;
        verde = LOW;
        azul = LOW;
      } else if (u == 'W') {
        rojo = white[0];
        verde = white[1];
        azul = white[2];
      } else if (u == 'E') {
        rojo = LOW;
        verde = LOW;
        azul = LOW;
      }

      analogWrite(redPin, rojo);
      analogWrite(greenPin, verde);
      analogWrite(bluePin, azul);
    }
    
    delay(10);
  }

  if (zeroing) {
    xAxisReadings.zeroed = xAxisReadings.average;
    yAxisReadings.zeroed = yAxisReadings.average;
    zeroing = false;
    ready = true;
  }

  if (ready) {
    Serial.print(xAxisReadings.average - xAxisReadings.zeroed);
    Serial.print(",");
    Serial.print(yAxisReadings.average - yAxisReadings.zeroed);
    Serial.print(",");
    Serial.println(swValue);
  }

  delay(16);
}

void smoothAxis(AxisReadings *readings, int newValue) {
  int index = readings->readIndex;
  readings->total = readings->total - readings->readings[index];
  readings->readings[index] = newValue;
  readings->total += newValue;
  readings->readIndex = readings->readIndex + 1;

  if (readings->readIndex >= NUM_READINGS)
    readings->readIndex = 0;

  readings->average = round(readings->total / NUM_READINGS);
}