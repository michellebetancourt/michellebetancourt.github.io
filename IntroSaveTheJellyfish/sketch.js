//Creating animations

//animations like p5 images should be stored in variables
//in order to be displayed during the draw cycle
var med, tib;
var fondo, howto, gamename, star;
//it's advisable (but not necessary) to load the images in the preload function
//of your sketch otherwise they may appear with a little delay
function preload() {

  //create an animation from a sequence of numbered images
  //pass the first and the last file name and it will try to find the ones in between
  med = loadAnimation("assets/1.png", "assets/52.png");
  tib = loadAnimation("assets/mt1.png", "assets/mt16.png");
  fondo = loadImage("assets/FondoJuegoIntro.jpg");
  howto = loadImage("assets/How to play.png");
  gamename = loadImage("assets/GameName.png");
  start = loadImage("assets/Start.png");


}

function setup() {
  // createCanvas(1280,755);
  createCanvas(1280, 755);
}

function draw() {
  background(fondo, displayWidth, displayHeight);
  //specify the animation instance and its x,y position
  //animation() will update the animation frame as well
  animation(med, width * 0.85, height * 0.70);
  animation(tib, width * 0.25, height * 0.65);

  imageMode(CORNER);
  image(gamename, width * 0.12, height * 0.005, width * 0.50, height * 0.35);
  image(howto, width * 0.50, height * 0.45, width * 0.20, height * 0.30);
  image(start, width * 0.48, height * 0.70, width * 0.25, height * 0.20);


}