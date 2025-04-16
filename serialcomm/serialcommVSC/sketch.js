let port;
let connectButton;

let canvasSize = 800;
let squareSize = 100;
let squareX;
let squareY;

function setup() {
  createCanvas(canvasSize, canvasSize);
  imageMode(CENTER);

  squareX = squareY = canvasSize/2;

  port = createSerial();
  connectButton = createButton("Connect to Arduino");
  connectButton.mousePressed(connectToSerial);

  button1 = createButton("Blink");
  button1.position(10, 30);
  button1.mousePressed(() => {port.write("LEDH*");})
  button1.mouseReleased(() => {port.write("LEDL*");})
}

function draw() {
  background(220);

  pot();
}

function connectToSerial() {
  port.open('Arduino', 9600);
}

function pot() {
  let str = port.readUntil("\n");
  if (str !== "") {
    let parts = str.split(":");
    if (parts[0] === "POT") {
      let retrievedPotValue = Number(parts[1]);

      if (!isNaN(retrievedPotValue)) {
        //map pot value to canvas dimensions
        let convertedPotValue = map(retrievedPotValue, 0, 1023, 0, (windowWidth - squareSize));
        squareX = convertedPotValue;
      }
    }
  }
  fill('purple');
  square(squareX, squareY, squareSize);
}