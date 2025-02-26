//https://www.reddit.com/r/piano/comments/3u6ke7/heres_some_midi_and_mp3_files_for_individual/?utm_source=share&utm_medium=web3x&utm_name=web3xcss&utm_term=1&utm_content=share_button
let startContext, samples, sampler, buton1, button2, button3, button4, delTimeSlider, feedbackSlider, distSlider, wetSlider;

let rev = new Tone.Reverb(5).toDestination()
let dist = new Tone.Distortion(0).connect(rev);
let del = new Tone.FeedbackDelay(0, 0).connect(dist);
del.wet.value = 0.5;

function preload() {
  // sampler = new Tone.Player("media/cat.mp3").toDestination()
  samples = new Tone.Players({
    cat: "media/cat.mp3",
    a4: "media/a4.mp3",
    b4: "media/b4.mp3",
    g4: "media/g4.mp3"
  }).connect(del)
}

function setup() {
  createCanvas(400, 400);
  startContext = createButton("Start Audio Context");
  startContext.position(0,0);
  startContext.mousePressed(startAudioContext)

  button1 = createButton("Play a4 Sample");
  button1.position(10, 30);
  button2 = createButton("Play b4 Sample");
  button2.position(10, 60);
  button3 = createButton("Play g4 Sample");
  button3.position(10, 90);
  button4 = createButton("Play cat Sample");
  button4.position(10, 120);

  button1.mousePressed(() => {samples.player("a4").start()})
  button2.mousePressed(() => {samples.player("b4").start()})
  button3.mousePressed(() => {samples.player("g4").start()})
  button4.mousePressed(() => {samples.player("cat").start()})

  delTimeSlider = createSlider(0, 1, 0, 0.01);
  delTimeSlider.position(10, 200);
  delTimeSlider.input(() => {del.delayTime.value = delTimeSlider.value()});
  feedbackSlider = createSlider(0, 0.99, 0, 0.01);
  feedbackSlider.position(200, 200);
  feedbackSlider.input(() => {del.feedback.value = feedbackSlider.value()});
  distSlider = createSlider(0, 10, 0, 0.01);
  distSlider.position(10, 300);
  distSlider.input(() => {dist.distortion = distSlider.value()});
  wetSlider = createSlider(0, 1, 0, 0.01);
  wetSlider.position(200, 300);
  wetSlider.input(() => {rev.wet.value = wetSlider.value()});
}

function draw() {
  background(220);
  text("Delay Time: " + delTimeSlider.value(), 15, 190);
  text("Feedback Amount: " + feedbackSlider.value(), 205, 190);
  text("Distortion Amount: " + distSlider.value(), 15, 290);
  text("Reverb Wet Amount: " + wetSlider.value(), 205, 290)
}

// function playSample() {
//   sampler.start()
// }

function startAudioContext() {
  if (Tone.context.state != 'running') {
    Tone.start();
    console.log("Audio Context Started")
  } else {
    console.log("Audio Context is already running")
  }
}