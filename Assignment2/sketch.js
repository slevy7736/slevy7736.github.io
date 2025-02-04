let x;

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB);
}

function draw() {  
  noStroke()
  //red
  fill(0,100,100);
  square(0,0,47)
  //orange
  fill(30,100,100);
  square(0,47,47)
  //yellow
  fill(60,100,100);
  square(0,94,47)
  //green
  fill(100,100,100);
  square(0,141,47)
  //cyan
  fill(180,100,100);
  square(0,188,47)
  //blue
  fill(230,100,100);
  square(0,235,47)
  //purple
  fill(270,100,100);
  square(0,282,47)
  //brown
  fill(30,100,50);
  square(0,329,47)
  //white
  fill(0,0,100);
  square(0,376,47)
  //black
  fill(0,0,0);
  square(0,423,47)
}

function pickColor() {
  //click inside red
  if (mouseX >= 0 && mouseX <= 47
    && mouseY >= 0 && mouseY <= 47) {
      x = color(0,100,100);
  }
  //click inside orange
  else if (mouseX >= 0 && mouseX <= 47
    && mouseY >= 47 && mouseY <= 94) {
      x = color(30,100,100);
  }
  //click inside yellow
  else if (mouseX >= 0 && mouseX <= 47
    && mouseY >= 94 && mouseY <= 141) {
      x = color(60,100,100);
  }
  //click inside green
  else if (mouseX >= 0 && mouseX <= 47
    && mouseY >= 141 && mouseY <= 188) {
      x = color(100,100,100);
  }
  //click inside cyan
  else if (mouseX >= 0 && mouseX <= 47
    && mouseY >= 188 && mouseY <= 235) {
      x = color(180,100,100);
  }
  //click inside blue
  else if (mouseX >= 0 && mouseX <= 47
    && mouseY >= 235 && mouseY <= 282) {
      x = color(230,100,100);
  }
  //click inside purple
  else if (mouseX >= 0 && mouseX <= 47
    && mouseY >= 282 && mouseY <= 329) {
      x = color(270,100,100);
  }
  //click inside brown
  else if (mouseX >= 0 && mouseX <= 47
    && mouseY >= 329 && mouseY <= 376) {
      x = color(30,100,50);
  }
  //click inside white
  else if (mouseX >= 0 && mouseX <= 47
    && mouseY >= 376 && mouseY <= 423) {
      x = color(0,0,100);
  }
  //click inside black
  else if (mouseX >= 0 && mouseX <= 47
    && mouseY >= 423 && mouseY <= 470) {
      x = color(0,0,0);
  }
}

function mouseClicked() {
  pickColor();
}

function mouseDragged() {
  stroke(x);
  strokeWeight(10);
  line(pmouseX, pmouseY, mouseX, mouseY);
}