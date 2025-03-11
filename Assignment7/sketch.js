let fmSynth;
let filt;
let LFOfilt;
let panner;
let values;
let noise;
let noiseEnv;
let picture;
let drawImage;

function preload() {
  picture = loadImage('media/picture.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);

  //instrument & oscillator
  fmSynth = new Tone.FMSynth({
    harmonicity: 0.5,
    modulationIndex: 10
  }).toDestination();

  //effect & modulation
  panner = new Tone.AutoPanner({
    frequency: 0.25,
    depth: 0.75
  }).toDestination().start()

  //filter
  filt = new Tone.AutoFilter({
    frequency: 35,
    depth: 1,
    baseFrequency: 350,
    octaves: 1.15
  }).connect(panner).start();

  //envelope
  noiseEnv = new Tone.AmplitudeEnvelope({
    attack: 0.1,
    decay: 0.1,
    sustain: 0.99,
    release: 2
  }).connect(filt)

  //noise
  noise = new Tone.Noise("pink").connect(noiseEnv).start();

  values = new Float32Array([-12, -6, -6, -3, 0, -3, 0, 0, -1.5, -3, -6, -12])
}

function draw() {
  background(220);

  if (drawImage === true) {
    image(picture,windowWidth/2,windowHeight/2);
  }
}

function mouseClicked() {
  noiseEnv.triggerAttackRelease(9);
  noise.volume.setValueCurveAtTime(values, Tone.now(), 9)

  drawImage = true;
}