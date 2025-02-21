//freeze json object so nothing can come in and alter the contents
let GameStates = Object.freeze({
  START: "start",
  PLAY: "play",
  END: "end"
});

let gameState = GameStates.START;
let score = 0;
let time = 30;
let textPadding = 15;
let gameFont;
let beginInterval = 0;
let interval = 1000;
let direction = ["up", "down", "left", "right"];
let speed = 2;
let bugSheet;
let bug;
let bugs;
let numBugs = 20;

function preload() {
  gameFont = loadFont("media/PressStart2P-Regular.ttf");
  bugSheet = loadImage("media/bug.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);
  textFont(gameFont);

  bugs = [];
  for (let i = 0; i < numBugs; i++) {
    let bug = new Character(random(80, width - 80), random(80, height - 80));
    bug.addAnimation("up", new SpriteAnimation(bugSheet, 1, 0, 3));
    bug.addAnimation("down", new SpriteAnimation(bugSheet, 1, 0, 3));
    bug.addAnimation("left", new SpriteAnimation(bugSheet, 1, 0, 3));
    bug.addAnimation("right", new SpriteAnimation(bugSheet, 1, 0, 3));
    bug.addAnimation("die", new SpriteAnimation(bugSheet, 0, 1, 3));
    bug.currentAnimation = "up";
    bug.beginInterval = millis();
    bugs.push(bug);
  }
}

function draw() {
  background(220);

  for (let i = 0; i < bugs.length; i++) {
    bugs[i].draw();
  }

  switch(gameState) {
    case GameStates.START:
      textAlign(CENTER,CENTER);
      textSize(18);
      text("press ENTER to BEGIN TIMER", width / 2, height / 2);
      break;
    case GameStates.PLAY:
      textAlign(LEFT, TOP);
      text("Score: " + score, textPadding, textPadding);
      textAlign(RIGHT, TOP);
      // Math.ceil() rounds numbers UP
      text("Time: " + Math.ceil(time), width - textPadding, textPadding);

      time -= deltaTime / 1000;
      if (time <= 0) {
        gameState = GameStates.END;
      }
      break;
    case GameStates.END:
      //overwrite bugs so the player can't get anymore points 
      bugs = [];
      textAlign(CENTER, CENTER);
      text("Game Over!", width / 2, height / 2 - 20);
      text("Score: " + score + "/20", width / 2, height / 2);
      break;
  }
}

function keyPressed() {
  switch(gameState) {
    case GameStates.START:
      if (keyCode === ENTER) {
        gameState = GameStates.PLAY;
      }
      break;
    case GameStates.PLAY:
      break;
    case GameStates.END:
      break;
  }
}

function mouseReleased() {
  //ignore bug clicks when in start game state
  if (gameState === GameStates.START) {
    return;
  }
  //if a bug gets clicked on, the die animation will play for that bug
  for (let i = 0; i < bugs.length; i++) {
    if (mouseX >= bugs[i].x - 40 && mouseX <= bugs[i].x + 40 &&
        mouseY >= bugs[i].y - 40 && mouseY <= bugs[i].y + 40) {
          if (bugs[i].currentAnimation !== "die") {
            score += 1;
            speed += 1;
            interval -= .5;
          }
          bugs[i].direction = null;
          bugs[i].currentAnimation = "die"; 
    }
  }
}

class Character {
  constructor(x, y) {
    //the x-coordinate of the character
    this.x = x;
    //the y-coordinate of the character
    this.y = y;
    //the currently active animation
    this.currentAnimation = null;
    //stores different animations with keys as identifiers
    this.animations = {};
    //intial direction up
    this.direction = "up";
    //begin time interval
    this.beginInterval = millis();
  }

  //adds an animation to the character's animation collection
  addAnimation(key, animation) {
    //store an animation object with the given key
    this.animations[key] = animation;
  }

  draw() {
    //every time interval change direction
    if (this.currentAnimation !== "die") {
      if (millis() >= this.beginInterval + interval) {
        this.direction = random(direction);
        this.beginInterval = millis();
      }
    }

    if (this.x <= 80 || this.x >= width - 80 ||
      this.y <= 80 || this.y >= height - 80) {
      // Reverse direction when hitting the wall
      if (this.direction === "up") {
        this.direction = "down";
        this.currentAnimation = "down";
      } else if (this.direction === "down") {
        this.direction = "up";
        this.currentAnimation = "up";
      } else if (this.direction === "left") {
        this.direction = "right";
        this.currentAnimation = "right";
      } else if (this.direction === "right") {
        this.direction = "left";
        this.currentAnimation = "left";
      }
    }

    // Set animation based on direction
    switch (this.direction) {
      case "up":
        this.currentAnimation = "up";
        break;
      case "down":
        this.currentAnimation = "down";
        break;
      case "left":
        this.currentAnimation = "left";
        break;
      case "right":
        this.currentAnimation = "right";
        break;
    }

    /*in setup, leftward animation is the same as the right animation
     *the leftward animation gets flipped status below if left key is pressed
     *so in the draw function the scale can be adjusted accordingly*/
     if (this.currentAnimation === "left") {
      this.animations[this.currentAnimation].flipped = true;
    } else {
      this.animations[this.currentAnimation].flipped = false;
    }

    //animation is the current animation out of available animations
    let animation = this.animations[this.currentAnimation];
    //move the character in the appropriate direction based on their current animation
    if (animation) {
      if (this.currentAnimation !== "die") {
        switch (this.currentAnimation) {
          case "up":
            this.y -= speed;
            break;
          case "down": 
            this.y += speed;
            break;
          case "left":
            this.x -= speed;
            break;
          case "right":
            this.x += speed;
            break;
        }
      }
      //push and pop contains transformation
      push();
      translate(this.x, this.y);
      animation.draw(this.currentAnimation);
      pop();
    }
  }
}

class SpriteAnimation {
  constructor(spritesheet, startU, startV, duration) {
    this.spritesheet = spritesheet;
    this.u = startU;
    this.v = startV;
    this.duration = duration;
    this.startU = startU;
    this.frameCount = 0;
    this.flipped = false;
  }

  //borrow currentAnimation from Character so SpriteAnimation knows which animation is in use
  draw(currentAnimation) {
    let s;
    if (this.flipped === true) {
      s = -1;
    } else {
      s = 1;
    }
    //flip across y axis depending on status of s
    scale(s,1);

    //every cell is 80x80, multiply u and v by 80 to get desired cell
    image(this.spritesheet,0,0,80,80,this.u*80,this.v*80,80,80);

    //every 10 frames grab the next cell in the sequence
    this.frameCount++;
    if (this.frameCount % 10 === 0)
      this.u++;

    //know when to loop the animation based on the given duration
    if (currentAnimation !== "die") {
      if (this.u === this.startU + this.duration) {
        this.u = this.startU;
      }
    }
    else {
      /* this.startU + this.duration = 1 more than the last frame
       * this.startU + this.duration - 1 = the last frame */
      this.u = this.startU + this.duration - 1;
    }
  }
}