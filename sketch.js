let capture;
let photoStage = 0;
let headImage;
let img;
let showLiveFeed = true;
let message = "";
let messageColor = "black";
let buttonWidth = 90;
let buttonHeight = 50;
let buttonY;
let margin = 20;
let button1X;
let button2X;

function preload(){
  headImage = loadImage('PASEK3.png');
}

function setup() {
  createCanvas(1920, 1080);  
  capture = createCapture(VIDEO);
  capture.size(640, 480);
  capture.hide();
  textSize(20);

  buttonY = height / 2 - buttonHeight / 2;
  button1X = width - 210;
  button2X = width - 110;

  let button = createButton('Zrób zdjęcie');
  let xOffset = (width - 640) / 2;
  let yOffset = (height - 480) / 2;
  button.position(xOffset + 640 / 2 - button.width / 2, yOffset + 480 + 10);  
  button.mousePressed(takePhoto);
}

function draw() {
  background(255);
  image(headImage, 0, 0, 1920, 220);

  let xOffset = (width - 640) / 2;
  let yOffset = (height - 480) / 2;

  if (showLiveFeed) {
    image(capture, xOffset, yOffset, 640, 480);
    noFill();
    stroke(255, 0, 0);
    strokeWeight(2);
    ellipse(width / 2, height / 2, 200, 300);
    fill(0);
    noStroke();
    textAlign(CENTER, CENTER);
    textStyle(BOLDITALIC);
    text('Umieść twarz w zaznaczonym miejscu i naciśnij "Zrób zdjęcie"', width / 2, yOffset - 30);
  } else {
    image(img, xOffset, yOffset, 640, 480);
    if (message) {
      fill(messageColor);
      noStroke();
      textSize(20);
      textAlign(CENTER, CENTER);
      text(message, xOffset + 320, yOffset + 480 - 30);
    }
  }

  drawButton(button1X, buttonY, buttonWidth, buttonHeight, "Cofnij", '#FFB3B3');
  drawButton(button2X, buttonY, buttonWidth, buttonHeight, "Dalej", '#E30613');
}

function takePhoto() {
  if (showLiveFeed) {
    img = capture.get();
    if (photoStage === 0) {
      img.filter(BLUR, 3);
      showMessage("Zdjęcie jest rozmyte, proszę zrobić kolejne.", "red");
    } else if (photoStage === 1) {
      img = increaseBrightness(img, 150);
      showMessage("Zdjęcie jest prześwietlone, proszę zrobić kolejne.", "red");
    } else if (photoStage === 2) {
      img.filter(BLUR, 3);
      img = increaseBrightness(img, 150);
      showMessage("Zdjęcie jest świetnie wykonane!", "green");
    }
    showLiveFeed = false;
    photoStage++;
  } else {
    showLiveFeed = true;
    message = "";
  }
}

function increaseBrightness(img, amount) {
  img.loadPixels();
  for (let i = 0; i < img.pixels.length; i += 4) {
    img.pixels[i] = min(img.pixels[i] + amount, 255);
    img.pixels[i + 1] = min(img.pixels[i + 1] + amount, 255);
    img.pixels[i + 2] = min(img.pixels[i + 2] + amount, 255);
  }
  img.updatePixels();
  return img;
}

function showMessage(msg, color) {
  message = msg;
  messageColor = color;
}

function drawButton(x, y, w, h, label, baseColor) {
  let hoverColor = lerpColor(color(baseColor), color(0), 0.2);
  if (isMouseOver(x, y, w, h)) {
    fill(hoverColor);
  } else {
    fill(baseColor);
  }
  noStroke();
  rect(x, y, w, h);
  fill(255);
  textSize(20);
  textAlign(CENTER, CENTER);
  text(label, x + w / 2, y + h / 2);
}

function isMouseOver(x, y, w, h) {
  return mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h;
}

function mousePressed() {
  if (isMouseOver(button2X, buttonY, buttonWidth, buttonHeight)) {
    window.open('https://buzizuzi.github.io/podpiss/', '_self');
  }
}
