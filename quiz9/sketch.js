let xPos=0;
let yPos=0;
let rotation=0;
let ratio=0;
let starNum=6;
let seed;
let radius=8;
let rot=0;
let t=0.05;
let ratio2;
let ratio2Target;
let ratio3;
let squareSize;
let brushX=0;
let brushY=0;
let brushSize;

function setup() {
createCanvas(windowWidth, windowHeight);
angleMode(DEGREES); 
frameRate(35);
seed=random(50);
ratio2=random(1.5);
ratio2Target=random(2);
ratio3=random(1);
squareSize = random(height/4);
squareSizeTarget=random(height/4);
rectMode(CENTER);
}


function draw() {
colorMode(RGB)
background(0,5);
randomSeed(seed);

push();
//part1
//starry sky
//shooting stars
for (let i=0; i<3; i++){
  drawStar(xPos+i*random(150,250), yPos-random(150), 230, ratio);
  xPos=xPos+0.5*i;
}


//falling star
for (let i=0; i<starNum; i++){
  drawStar(random(width), yPos+random(height/2), rotation+random(360), ratio);
}

//rotating star
for (let i=0; i<starNum; i++){
  drawStar(random(width), random(height), rotation/2+random(360), random(0.6));
}

//set parameters to animate stars increasingly
yPos++;
rotation++;
ratio=random(0.2)+yPos*0.0006;


//easing in
drawStar(150,100,270,ratio2)
ratio2=lerp(ratio2, ratio2Target, t);

drawStar(1300,750,270,ratio2)
ratio2=lerp(ratio2, ratio2Target, t);

//mouse control
drawStar(1500,350,rotation,ratio3)
ratio3=lerp(ratio3, mouseY/360, t);
t += (1 - t) * 0.5;

drawStar(250,700,rotation,ratio3)
ratio3=lerp(ratio3, mouseY/560, t);
t += (1 - t) * 0.5;


//part2
//draw black hole
fill(0, 30, 90 , 5);
stroke(170);
square(width / 2, height / 2, squareSize);
squareSize = lerp(squareSize, squareSizeTarget, t);

if (frameCount%12==0){
    squareSizeTarget=random(height)
}


//part3
//draw asteroid strips
translate(windowWidth/2, windowHeight/2);

//regular orbit
rotate(frameCount/4)

let translateX3 = sin(frameCount) * 120;
let translateY3 = cos(frameCount) * 200;

translate(translateX3, translateY3);
noStroke();
fill(255);
drawStar(0, 0, 0, 0.6);

//orbiting dot1
rotate(frameCount);
fill(255, 205, 100, 100);
ellipse(10, 15, 15);

//irregular orbit1
push();
rot+=frameCount/1000
rotate(rot/TWO_PI)

rotate(frameCount/4)

let translateX = sin(frameCount) * 120;
let translateY = cos(frameCount) * 200;

translate(translateX, translateY);
noStroke();
drawStar(0, 0, 0, 0.5);

//orbiting dot1
rotate(frameCount)
fill(0,0,255,100)
ellipse(20, 25, 10)

//orbiting dot2
let x = 15+radius * cos(5*frameCount);
let y = 15+radius * sin(frameCount);

rotate(frameCount/5)
noStroke();
fill(255);
ellipse(x, y, 10);

//irregular orbit2
rotate(frameCount/5)

let translateX2 = sin(frameCount) * 135;
let translateY2 = cos(frameCount) * 280;

translate(translateX2, translateY2);
noStroke();
fill(255,255,255,150);
ellipse(0, 0, 15);

//orbiting dot1
rotate(frameCount)
fill(0,0,255,150)
ellipse(5, 10, 10)
pop();

pop();


//part4
//draw radiating rays from blackhole
fill(255, 205, random(150));
noStroke();
translate(windowWidth/2,windowHeight/2);

let sector = 8;
for (let i = 0; i < sector; i++) {
//use rotate function to rotate the sectors
rotate(360/sector);

//intermittent use of brush
//brush1
if(i%2==0){
brushPainting1(brushX, brushY);
push();
scale(-0.5)
brushPainting1(brushX, brushY);
pop();
}

//brush2
else{
brushPainting2(brushX, brushY);
push();
scale(-1,1)
brushPainting2(brushX, brushY);
pop();
}
}

//create random and radiating pattern
brushX += random(-50,50);
brushY += 5;


//instruction
textSize(20);
stroke('blue');
textAlign(CENTER, CENTER);
text("Move mouse up and down to resize the star.", -200, --height / 2);
text("Click the mouse to explore more effects.", 200, --height / 2);
}



//define drawstar funtion for star pattern
function drawStar(xPos, yPos, rotation, ratio) {
push();
// use xPos and yPos to make it move.
translate(xPos,yPos);

//use rotation to make it spin.
angleMode(DEGREES);
rotate(rotation);

//use ratio to make it grow
scale(ratio);

//draw star shape
fill(255, 255, 160);
noStroke();
beginShape();
vertex(-10, 10);
vertex(0, 35);
vertex(10, 10);
vertex(35, 0);
vertex(10, -8);
vertex(0, -35);
vertex(-10, -8);
vertex(-35, 0);
endShape();

//draw meteor trail shape
let x = 0;
let y = 0;
let radius = 85;

beginShape();
for (let i = 0; i < TWO_PI; i += TWO_PI / 5) {
  let x1 = x + cos(i) * radius;
  let y1 = y + sin(i) * radius;
  vertex(x1, y1);
  
  // connect line
  let angle_between_points = TWO_PI / 10;
  let x2 = x + cos(i + angle_between_points / 2) * (radius / 2);
  let y2 = y + sin(i + angle_between_points / 2) * (radius / 2);
  vertex(x2, y2);
}
endShape();
pop();

}

//set brushpainting funtion for rays
function brushPainting1(x, y) {
  // use translate function to add some movement to the brush
  // remember to use push and pop to start and restore the drawing state
  push();
  translate(x,y);
  let brushSize = random(15,25);
  rect(0, 0, brushSize);
  pop();
  }
  
function brushPainting2(x, y) {
  // use translate function to add some movement to the brush
  // remember to use push and pop to start and restore the drawing state
  push();
  translate(x,y);
  let brushSize = random(20,45);
  ellipse(0, 0, brushSize);
  pop();
  }

//allow user to refresh the page by clicking
function mouseClicked() {
  location.reload();
  }