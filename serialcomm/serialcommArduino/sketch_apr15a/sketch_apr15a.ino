const int LEDPin = 2;  //LED pin

const int potPin = A0;  //potentiometer pin
int potValue = 0;       //value read from the potentiometer

void setup() {
  // put your setup code here, to run once:

  pinMode(LEDPin, OUTPUT);
  pinMode(potPin, INPUT);

  Serial.begin(9600);
}

void loop() {
  //>= 2 doesn't allow for there to be 1 byte when 2 bytes (1 byte per char) should be read
  if (Serial.available() > 0) {

    //https://www.arduino.cc/reference/tr/language/functions/communication/serial/readstringuntil/
    String str = Serial.readStringUntil('*');

    //https://www.arduino.cc/reference/tr/language/variables/data-types/string/functions/startswith/
    if (str.startsWith("LED")) {

      //https://docs.arduino.cc/language-reference/en/variables/data-types/stringObject/Functions/charAt/
      char onOff = str.charAt(3);
      
      if (onOff == 'H') {
        digitalWrite(LEDPin, HIGH);
      } else if (onOff == 'L') {
        digitalWrite(LEDPin, LOW);
      }
    }
  }

  potValue = analogRead(potPin);  //reads potentiometer value
  Serial.print("POT:");
  Serial.println(potValue);       //prints the potentiometer value
  delay(25);
}