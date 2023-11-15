let osc;
let env;
let note;
let noteQ1;
let noteQ2;
let noteQ3;
let noteQ4;

function setup() {

  createCanvas(windowWidth, windowHeight);
  pixelDensity(1);

  button = createButton('Stop and Destroy');
  button.position(0, 150);
  button.size(200, 40);
  button.style('background-color', color(0));
  button.style('font-size', '18px');
  button.style('color', color(255));
  button.mousePressed(noLoop);

  filterF = new p5.Filter();
  filterF.setType('lowpass');

  osc = new p5.Oscillator();

  env = new p5.Env();
  env.setADSR(0.005, 0.01, 0.5, 0.05);
  env.setRange(0.25, 0);

  osc.setType('triangle');
  osc.start();
  osc.amp(env)
  osc.connect(filterF)

  delay = new p5.Delay();

  delay.process(osc, 0.116667 * 3, 0.65, 5000);

  reverb = new p5.Reverb();

  reverb.drywet(1);

  reverb.process(osc, 2.5, 3);

  noFill();
  stroke(255);
}

function draw() {
  background(0, 10);

  if (frameCount % 7 == 0){
    let choice = random() * 100

    if (choice < 60){
      playSynth();
      circle(width/2, height/2, random() * 500 + 50);
    }

  }
}


function playSynth() {
  userStartAudio();

  noteQ1 = [48, 63, 70];
  noteQ2 = [56, 67, 75];
  noteQ3 = [36, 43, 50];
  noteQ4 = [86, 87, 79];

  if (mouseX < width / 2 && mouseY < height / 2) {
    note = random(noteQ1);
    stroke(200, 10, 100);
  }

  else if (mouseX > width / 2 && mouseY < height / 2) {
    note = random(noteQ2);
    stroke(10, 10, 200);
  }

  else if (mouseX > width / 2 && mouseY > height / 2) {
    note = random(noteQ3);
    stroke(10, 200, 10);
  }

  else {
    note = random(noteQ4);
    stroke(200, 100, 10);
  }

  //note -= 2;

  freqM = 440 * Math.pow(2, (note - 69) / 12)

  filterF.freq(abs(sin(frameCount * 0.01)) * 5000 + 20);
  filterF.res(20);

  osc.freq(freqM);
  env.play();

}
