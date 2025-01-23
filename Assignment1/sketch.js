function setup() {
  createCanvas(900, 900);
  colorMode(HSB);
  angleMode(DEGREES)
}

function draw() {
  background(200,0,85);

  var x = 120
  var y = 470

  noStroke()
  fill(200,0,95);
  rect(x, x, 300, 300);
  rect(x, y, 300, 300);
  rect(y, x, 300, 300);
  rect(y, y, 300, 300);

  //EXAMPLE 1 (top left square)
  noStroke()
  fill(100,100,100);

  rect((x+12), (x+80), 276, 135);

  stroke('black');
  strokeWeight(1);
  fill(0,0,100);

  circle((x+81), (x+150), 74);
  square((x+182), (x+108), 74);

  //EXAMPLE 2 (top right square)
  noStroke()
  fill(100,0,100);

  rect((y+25), (x+25), 250, 250);

  //red
  noStroke()
  fill(0,100,100,0.3);
  circle((y+150), (x+125), 90);

  //blue
  noStroke()
  fill(225,100,100,0.3);
  circle((y+125), (x+175), 90);

  //green
  noStroke()
  fill(100,100,100,0.3);
  circle((y+175), (x+175), 90);

  //EXAMPLE 3 (bottom left square)
  noStroke()
  fill(0,0,0);

  rect((x+12), (y+80), 276, 135);

  //pacman
  noStroke()
  fill(60,100,100);
  arc((x+81), (y+150), 74, 74, 225, 135)

  //ghost
  noStroke()
  fill(0,100,100);
  arc((x+219), (y+150), 74, 74, 180, 0)
  rect((x+182), (y+150), 74, 37);

  noStroke()
  fill(0,0,100);
  circle((x+202), (y+150), 25);
  circle((x+236), (y+150), 25);

  noStroke()
  fill(225,100,100);
  circle((x+202), (y+150), 15);
  circle((x+236), (y+150), 15);

  //EXAMPLE 4 (bottom right square)
  noStroke()
  fill(225,100,50);

  rect((y+25), (y+25), 250, 250);

  //circle
  stroke('white');
  strokeWeight(5);
  fill(100,100,50);

  circle((y+150), (y+150), 195);

  //star
  stroke('white');
  strokeWeight(5);
  fill(0,100,100);

  beginShape();
  vertex((y+150), (y+69));
  vertex((y+166), (y+123));
  vertex((y+218), (y+123));
  vertex((y+182), (y+157));
  vertex((y+198), (y+218));
  vertex((y+150), (y+181));
  vertex((y+102), (y+218));
  vertex((y+118), (y+157));
  vertex((y+82), (y+123));
  vertex((y+134), (y+123));
  endShape(CLOSE);
}