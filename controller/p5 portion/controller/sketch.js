//bloop: https://youtu.be/wJY40KJMpv4?si=oS7JPw7n_sYaIF7-
//sketch: https://youtu.be/q4dY8wlH4ng?si=USJHADqdejCYOk7n
//sparkle: https://www.youtube.com/watch?v=IZWL2gALgvM
//ding: https://youtu.be/GVAF07-2Xic?si=xBp-KtSec9Szs7gO

let port;
let connectionButton, zeroButton; 
let cursorX, cursorY;
let speed = 0.01;

let n;    //color (to draw)
let m;    //color (to LED)

let filt, panner;
let synth1, part1;
let seq1, synth2;

let easel;

function preload() {
  samples = new Tone.Players({
    bloop: "media/bloop.mp3",
    sparkle: "media/sparkle.mp3",
    ding: "media/ding.mp3"
  }).toDestination();

  sketch = new Tone.Player("media/sketch.mp3");
  sketch.loop = true;
  sketch.state = 'stopped';
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  //for SOME REASON, HSB color mode breaks this code

  //create a layer for drawn lines
  easel = createGraphics(windowWidth, windowHeight);
  easel.background(245);

  port = createSerial();
  connectionButton = createButton('Connect');
  connectionButton.mousePressed(connect);

  zeroButton = createButton('Zero Joystick');
  zeroButton.mousePressed(zero);

  //initial cursor spawn
  cursorX = width/2;
  cursorY = height/2;

  centerFreq = map(height / 2, 0, height, 5000, 100, true);
  filt = new Tone.Filter(centerFreq, "lowpass").toDestination();
  panner = new Tone.Panner(0).connect(filt);
  sketch.connect(panner);

  Tone.Transport.timeSignature = [3, 4];
  Tone.Transport.bpm = 80;

  //chords
  synth1 = new Tone.PolySynth(Tone.Synth).toDestination();
  part1 = new Tone.Part(((time, value) => {
    synth1.triggerAttackRelease(value.note, value.dur, time);
  }), [
    {time: "0:0", note: ["C4", "D4", "E4"], dur: "4n" },
    {time: "1:0", note: ["E4", "F4", "G4"], dur: "4n" },
    {time: "2:0", note: ["D4", "E4", "F4"], dur: "4n" },
    {time: "3:0", note: ["F4", "G4", "A4"], dur: "4n" },
    {time: "4:0", note: ["G4", "A4", "B4"], dur: "4n" }]
  ).start();
  part1.loop = true;
  //because we have 4 measures
  part1.loopEnd = "4m";

  //melody
  synth2 = new Tone.Synth().toDestination();
  seq1 = new Tone.Sequence((time, note) => {
    synth2.triggerAttackRelease(note, "2n", time);
  }, [
    "C4", "E4", "F4", "D4",
    "E4", "G4", "A4", "F4",
    "D4", "F4", "G4", "E4", 
    "F4", "A4", "B4", "G4",
    "G4", "B4", "C5", "C4"
  ], "4n").start();
}

function draw() {
  background(245);
  
  //draw the easel beneath p5 elements (palette, buttons etc.)
  image(easel, 0, 0);

  noStroke()
  //red
  fill(255,0,0);
  square(0,0,47)
  //orange
  fill(255,165,0);
  square(0,47,47)
  //yellow
  fill(255,255,0);
  square(0,94,47)
  //green
  fill(0,255,0);
  square(0,141,47)
  //cyan
  fill(0,255,255);
  square(0,188,47)
  //blue
  fill(0,0,255);
  square(0,235,47)
  //purple
  fill(255,0,255);
  square(0,282,47)
  //brown
  fill(128,64,0);
  square(0,329,47)
  //white
  fill(255,255,255);
  square(0,376,47)
  //black
  fill(0,0,0);
  square(0,423,47);

  //clear button
  fill(255,0,0);
  rect(windowWidth-150, 0, 150, 80, 10);
  fill(255);
  textSize(20);
  //draw the text from the middle of the button
  textAlign(CENTER, CENTER);
  text("Clear Page", windowWidth-70, 40);
  
  //start audio context
  fill(0,0,255);
  rect(windowWidth-150, 80, 150, 80, 10);
  fill(255);
  textSize(13);
  //draw the text from the middle of the button
  textAlign(CENTER, CENTER);
  text("Start Audio Context", windowWidth-70, 120);

  let str = port.readUntil('\n');
  if (str !== "") {
    const values = str.split(',');
    if (values.length == 3) {
      let x = Number(values[0]);
      let y = Number(values[1]);
      let sw = Number(values[2]);

      //pmouseX and pmouseY are predefined, cursor equalivalents are not, define them here
      let pcursorX = cursorX;
      let pcursorY = cursorY;

      cursorX += x * speed;
      cursorY += y * speed;

      //if the cursor is pressed inside the canvas and a color is selected
      if (n != null && (cursorX > 48 || cursorY > 471) && !(cursorX >= windowWidth-150 && cursorX <= windowWidth
        && cursorY >= 0 && cursorY <= 160) && sw ==1) {
          //start the sketch noise if not already started
          if (sketch.state !== 'started') {
            sketch.start();
          }
      } else {
        //otherwise stop the sketch noise
        sketch.stop();
      }

      if (sw == 1) {
        pickColor();    //color picker
        clearEasel();   //clear page button
        startAC();      //start audio context button

        //draw on the drawing layer
        easel.stroke(n);
        easel.strokeWeight(10);
        easel.line(pcursorX, pcursorY, cursorX, cursorY);

        //distort the sketch noise based on cursor position
        let freq = map(cursorY, 0, height, 5000, 100, true);
        filt.frequency.value = freq;

        let panVal = map(cursorX, 0, width, -1, 1, true);
        panner.pan.value = panVal;
      } else if (sw == 0) {
        //if the cursor isn't being pressed down on just show it via circle
        fill(0);
        circle(cursorX,cursorY,10);
      }
    }
  }
}

function pickColor() {
  //click inside red
  if (cursorX >= 0 && cursorX <= 47
    && cursorY >= 0 && cursorY <= 47) {
      n = color(255,0,0);
      m = "R";
      samples.player("bloop").start();
  }
  //click inside orange
  else if (cursorX >= 0 && cursorX <= 47
    && cursorY >= 47 && cursorY <= 94) {
      n = color(255,165,0);
      m = "O";
      samples.player("bloop").start();
  }
  //click inside yellow
  else if (cursorX >= 0 && cursorX <= 47
    && cursorY >= 94 && cursorY <= 141) {
      n = color(255,255,0);
      m = "Y";
      samples.player("bloop").start();
  }
  //click inside green
  else if (cursorX >= 0 && cursorX <= 47
    && cursorY >= 141 && cursorY <= 188) {
      n = color(0,255,0);
      m = "G";
      samples.player("bloop").start();
  }
  //click inside cyan
  else if (cursorX >= 0 && cursorX <= 47
    && cursorY >= 188 && cursorY <= 235) {
      n = color(0,255,255);
      m = "C"
      samples.player("bloop").start();
  }
  //click inside blue
  else if (cursorX >= 0 && cursorX <= 47
    && cursorY >= 235 && cursorY <= 282) {
      n = color(0,0,255);
      m = "B";
      samples.player("bloop").start();
  }
  //click inside purple
  else if (cursorX >= 0 && cursorX <= 47
    && cursorY >= 282 && cursorY <= 329) {
      n = color(255,0,255);
      m = "P";
      samples.player("bloop").start();
  }
  //click inside brown
  else if (cursorX >= 0 && cursorX <= 47
    && cursorY >= 329 && cursorY <= 376) {
      n = color(128,64,0);
      m = "J";
      samples.player("bloop").start();
  }
  //click inside white
  else if (cursorX >= 0 && cursorX <= 47
    && cursorY >= 376 && cursorY <= 423) {
      n = color(255,255,255);
      m = "W";
      samples.player("bloop").start();
  }
  //click inside black
  else if (cursorX >= 0 && cursorX <= 47
    && cursorY >= 423 && cursorY <= 470) {
      n = color(0,0,0);
      m = "E";
      samples.player("bloop").start();
  }
  sendColor();
}

//clear page button
function clearEasel() {
  if (cursorX >= windowWidth-150 && cursorX <= windowWidth
    && cursorY >= 0 && cursorY <= 80) {
      easel.background(245);
      samples.player("sparkle").start();
  }
}

//start audio context button
function startAC() {
  if (cursorX >= windowWidth-150 && cursorX <= windowWidth
    && cursorY >= 80 && cursorY <= 160) {
      startAudioContext();
      samples.player("ding").start();
  }
}

//send color to arduino for LED
function sendColor() {
  if (port.opened()) {
    //RGB values
    let clr = "COLOR" + m + "\n";
    port.write(clr);
  }
}

function connect() {
  port.open('Arduino', 9600);
}

function zero() {
  if (port.opened()) {
    port.write('zero\n');
  }
}

function startAudioContext() {
  if (Tone.context.state !== "running") {
    Tone.start().then(() => {
      console.log("Context has started");
      Tone.Transport.start()
    })
  } else {
    Tone.Transport.start();
  }
}