let delTimeSlider, feedbackSlider, distSlider, wetSlider;
let rev = new Tone.Reverb(5).toDestination();
let dist = new Tone.Distortion(0).connect(rev);
let del = new Tone.FeedbackDelay(0, 0).connect(dist);
del.wet.value = 0.5;

let polySynth;
let keyNotes = {
  a: 'C4',
  w: 'C#4',
  s: 'D4',
  e: 'D#4',
  d: 'E4',
  f: 'F4',
  t: 'F#4',
  g: 'G4',
  y: 'G#4',
  h: 'A4',
  u: 'A#4',
  j: 'B4',
  k: 'C5'
}

function setup() {
  createCanvas(800, 800);
  polySynth = new Tone.PolySynth(Tone.DuoSynth).connect(del);
  polySynth.set({
    envelope: {
      attack: 0.1,
      decay: 0.5,
      sustain: 1,
      release: 0.5
    },
    oscillator: {
      type: 'sine'
    }
  })
  polySynth.volume.value = -6;

  delTimeSlider = createSlider(0, 1, 0, 0.01);
  delTimeSlider.position(10, 100);
  delTimeSlider.input(() => {del.delayTime.value = delTimeSlider.value()});
  feedbackSlider = createSlider(0, 0.99, 0, 0.01);
  feedbackSlider.position(200, 100);
  feedbackSlider.input(() => {del.feedback.value = feedbackSlider.value()});
  distSlider = createSlider(0, 10, 0, 0.01);
  distSlider.position(10, 200);
  distSlider.input(() => {dist.distortion = distSlider.value()});
  wetSlider = createSlider(0, 1, 0, 0.01);
  wetSlider.position(200, 200);
  wetSlider.input(() => {rev.wet.value = wetSlider.value()});
}

function draw() {
  background(220);
  text("Delay Time: " + delTimeSlider.value(), 15, 90);
  text("Feedback Amount: " + feedbackSlider.value(), 205, 90);
  text("Distortion Amount: " + distSlider.value(), 15, 190);
  text("Reverb Wet Amount: " + wetSlider.value(), 205, 190)

  text("Key Bindings:", 15, 300)
  text("[A] C4", 15, 330);
  text("[W] C#4", 90, 330);
  text("[S] D4", 15, 345);
  text("[E] D#4", 90, 345);
  text("[D] E4", 15, 360);
  text("[F] F4", 15, 375);
  text("[T] F#4", 90, 375);
  text("[G] G4", 15, 390);
  text("[Y] G#4", 90, 390);
  text("[H] A4", 15, 405);
  text("[U] A#4", 90, 405);
  text("[J] B4", 15, 420);
  text("[K] C5", 15, 435);

  text("TTLS:", 400, 300)
  text("a a g g h h g", 400, 330);
  text("f f d d s s a", 400, 350);
  text("g g f f d d s", 400, 370);
  text("g g f f d d s", 400, 390);
  text("a a g g h h g", 400, 410);
  text("f f d d s s a", 400, 430);
}

function keyPressed() {
  let pitch = keyNotes[key];
  if (pitch) {
    polySynth.triggerAttack(pitch);
  }
}

function keyReleased() {
  let pitch = keyNotes[key];
  if (pitch) {
    polySynth.triggerRelease(pitch);
  }
}