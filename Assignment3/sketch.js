let spelunkyguy;
let green;
let cyclops;
let spelunkyguyChar;
let greenChar;
let cyclopsChar;

//preload the spritesheet
function preload() {
  spelunkyguy = loadImage("media/spelunkyguy.png");
  green = loadImage("media/green.png");
  cyclops = loadImage("media/cyclops.png");
}

function setup() {
  createCanvas(400, 400);
  /* interprets the second and third parameters of image(),
   * the x and y coordinates, as the image's center point */
  imageMode(CENTER);

  spelunkyguyChar = new Character(random(80, width-80),random(80, height-80));
  spelunkyguyChar.addAnimation("up", new SpriteAnimation(spelunkyguy, 0, 5, 6)); 
  spelunkyguyChar.addAnimation("down", new SpriteAnimation(spelunkyguy, 6, 5, 6));
  spelunkyguyChar.addAnimation("left", new SpriteAnimation(spelunkyguy, 1, 0, 8));
  spelunkyguyChar.addAnimation("right", new SpriteAnimation(spelunkyguy, 1, 0, 8));
  spelunkyguyChar.addAnimation("stand", new SpriteAnimation(spelunkyguy, 0, 0, 1));
  spelunkyguyChar.currentAnimation = "stand";

  greenChar = new Character(random(80, width-80),random(80, height-80));
  greenChar.addAnimation("up", new SpriteAnimation(green, 0, 5, 6)); 
  greenChar.addAnimation("down", new SpriteAnimation(green, 6, 5, 6));
  greenChar.addAnimation("left", new SpriteAnimation(green, 1, 0, 8));
  greenChar.addAnimation("right", new SpriteAnimation(green, 1, 0, 8));
  greenChar.addAnimation("stand", new SpriteAnimation(green, 0, 0, 1));
  greenChar.currentAnimation = "stand";

  cyclopsChar = new Character(random(80, width-80),random(80, height-80));
  cyclopsChar.addAnimation("up", new SpriteAnimation(cyclops, 0, 5, 6)); 
  cyclopsChar.addAnimation("down", new SpriteAnimation(cyclops, 6, 5, 6));
  cyclopsChar.addAnimation("left", new SpriteAnimation(cyclops, 1, 0, 8));
  cyclopsChar.addAnimation("right", new SpriteAnimation(cyclops, 1, 0, 8));
  cyclopsChar.addAnimation("stand", new SpriteAnimation(cyclops, 0, 0, 1));
  cyclopsChar.currentAnimation = "stand";
}

function draw() {
  background(220);
  //draw the characters
  spelunkyguyChar.draw();
  greenChar.draw();
  cyclopsChar.draw();
}

//when key is pressed, do as is specified in character class
function keyPressed() {
  spelunkyguyChar.keyPressed();
  greenChar.keyPressed();
  cyclopsChar.keyPressed();
}

//when key is released, do as is specified in character class
function keyReleased() {
  spelunkyguyChar.keyReleased();
  greenChar.keyReleased();
  cyclopsChar.keyReleased();
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
  }

  //adds an animation to the character's animation collection
  addAnimation(key, animation) {
    //store an animation object with the given key
    this.animations[key] = animation;
  }

  draw() {
    //animation is the current animation out of available animations
    let animation = this.animations[this.currentAnimation];
    //move the character in the appropriate direction based on their current animation
    if (animation) {
      switch (this.currentAnimation) {
        case "up":
          this.y -= 2;
          break;
        case "down": 
          this.y += 2;
          break;
        case "left":
          this.x -= 2;
          break;
        case "right":
          this.x += 2;
          break;
      }
      //push and pop contains transformation
      push();
      translate(this.x, this.y);
      animation.draw();
      pop();
    }
  }

  keyPressed() {
    switch(keyCode) {
      case UP_ARROW:
        this.currentAnimation = "up";
        break;
      case DOWN_ARROW:
        this.currentAnimation = "down";
        break;
      case LEFT_ARROW:
        this.currentAnimation = "left";
        break;
      case RIGHT_ARROW:
        this.currentAnimation = "right";
    }
    /*in setup, leftward animation is the same as the right animation
     *the leftward animation gets flipped status below if left key is pressed
     *so in the draw function the scale can be adjusted accordingly*/
    if (this.currentAnimation === "left") {
      this.animations[this.currentAnimation].flipped = true;
    } else {
      this.animations[this.currentAnimation].flipped = false;
    }
  }

  /*adjusts how the character stands once a key is released
   *depending on what animation was being used prior to the key's release*/
  keyReleased() {
    if (this.currentAnimation === "left") {
      this.animations["stand"].flipped = true;
    } else {
      this.animations["stand"].flipped = false;
    }
    this.currentAnimation = "stand";
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

  draw() {
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
    if (this.u === this.startU + this.duration)
      this.u = this.startU;
  }
}