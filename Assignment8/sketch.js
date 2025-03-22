//bloop: https://youtu.be/wJY40KJMpv4?si=oS7JPw7n_sYaIF7-
//sketch: https://youtu.be/q4dY8wlH4ng?si=USJHADqdejCYOk7n
//sparkle: https://www.youtube.com/watch?v=IZWL2gALgvM
//ding: https://youtu.be/GVAF07-2Xic?si=xBp-KtSec9Szs7gO

let x;
let startContext, clearPage;
let filt, panner;
let synth1, part1;
let seq1; synth2;

function preload() {
  samples = new Tone.Players({
    bloop: "media/bloop.mp3",
    sparkle: "media/sparkle.mp3",
    ding: "media/ding.mp3"
  }).toDestination();

  sketch = new Tone.Player("media/sketch.mp3");
  sketch.loop = true;
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB);

  startContext = createButton("Start Audio Context");
  startContext.position((windowWidth-(windowWidth/5)), 30);
  startContext.mousePressed(() => {
    startAudioContext();
    samples.player("ding").start();
  });

  clearPage = createButton("Clear Page");
  clearPage.position((windowWidth-(windowWidth/5)), 60);
  clearPage.mousePressed(() => {
    Tone.Transport.bpm.value = 80;
    clear();
    samples.player("sparkle").start();
  });

  centerFreq = map(height / 2, 0, height, 5000, 100, true);
  filt = new Tone.Filter(centerFreq, "lowpass").toDestination();
  panner = new Tone.Panner(0).connect(filt);
  sketch.connect(panner);

  //option + shift + A
  Tone.Transport.timeSignature = [3, 4];
  Tone.Transport.bpm = 80;

  //chords
  synth1 = new Tone.PolySynth(Tone.Synth).toDestination();
  part1 = new Tone.Part(((time, value) => {
    synth1.triggerAttackRelease(value.note, value.dur, time);
  }), [
    {time: "0:0", note: ["C3", "E4", "G4"], dur: "4n" },
    {time: "1:0", note: ["F3", "A4", "C4"], dur: "4n" },
    {time: "2:0", note: ["A3", "C4", "E4"], dur: "4n" },
    {time: "3:0", note: ["G3", "B4", "D4"], dur: "4n" },
    {time: "4:0", note: ["F3", "A4", "C4"], dur: "4n" }]
  ).start();
  part1.loop = true;
  //because we have 4 measures
  part1.loopEnd = "4m";

  //melody
  synth2 = new Tone.Synth().toDestination();
  seq1 = new Tone.Sequence((time, note) => {
    synth2.triggerAttackRelease(note, "2n", time);
  }, [
    "C4", null, "D4", "A4", "G4",  
    "C4", ["D4"], "C4", "D4", null, "C4", ["F4"],  
    "F4", "D4", "D4", "A4", ["C4"], null, "F4",  
    "A4", "A4", null, "A4", "A4", "A4", "A4",  
    "B4", ["B4"], null, "B4", ["B4"], null,  
    "A4", "A4", null, "A4", "A4", "A4", "A4",  
    "G4", ["A#4"], "G4", null, "G4", "A#4", "G4", "F4", "D4", "F4", "D4", ["G4"], null, "A#4", "G4" 
  ], "4n").start()
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
      samples.player("bloop").start();
  }
  //click inside orange
  else if (mouseX >= 0 && mouseX <= 47
    && mouseY >= 47 && mouseY <= 94) {
      x = color(30,100,100);
      samples.player("bloop").start();
  }
  //click inside yellow
  else if (mouseX >= 0 && mouseX <= 47
    && mouseY >= 94 && mouseY <= 141) {
      x = color(60,100,100);
      samples.player("bloop").start();
  }
  //click inside green
  else if (mouseX >= 0 && mouseX <= 47
    && mouseY >= 141 && mouseY <= 188) {
      x = color(100,100,100);
      samples.player("bloop").start();
  }
  //click inside cyan
  else if (mouseX >= 0 && mouseX <= 47
    && mouseY >= 188 && mouseY <= 235) {
      x = color(180,100,100);
      samples.player("bloop").start();
  }
  //click inside blue
  else if (mouseX >= 0 && mouseX <= 47
    && mouseY >= 235 && mouseY <= 282) {
      x = color(230,100,100);
      samples.player("bloop").start();
  }
  //click inside purple
  else if (mouseX >= 0 && mouseX <= 47
    && mouseY >= 282 && mouseY <= 329) {
      x = color(270,100,100);
      samples.player("bloop").start();
  }
  //click inside brown
  else if (mouseX >= 0 && mouseX <= 47
    && mouseY >= 329 && mouseY <= 376) {
      x = color(30,100,50);
      samples.player("bloop").start();
  }
  //click inside white
  else if (mouseX >= 0 && mouseX <= 47
    && mouseY >= 376 && mouseY <= 423) {
      x = color(0,0,100);
      samples.player("bloop").start();
  }
  //click inside black
  else if (mouseX >= 0 && mouseX <= 47
    && mouseY >= 423 && mouseY <= 470) {
      x = color(0,0,0);
      samples.player("bloop").start();
  }
}

function mouseClicked() {
  pickColor();
}

function mousePressed() {
  if (x != null && mouseX > 48 || mouseY > 471) {
    Tone.Transport.bpm.value += 20;
    /* if (Tone.Transport.bpm.value < 400) {
      Tone.Transport.bpm.value += 20;
    } */
    sketch.start();
  }
}

function mouseDragged() {
  stroke(x);
  strokeWeight(10);
  line(pmouseX, pmouseY, mouseX, mouseY);

  let freq = map(mouseY, 0, height, 5000, 100, true);
  filt.frequency.value = freq;

  let panVal = map(mouseX, 0, width, -1, 1, true);
  panner.pan.value = panVal;
}

function mouseReleased() {
  sketch.stop();
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