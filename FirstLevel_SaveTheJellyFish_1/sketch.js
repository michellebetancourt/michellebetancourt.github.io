//Creating animations

//animations like p5 images should be stored in variables
//in order to be displayed during the draw cycle
var med, tib;
var medani, tibani;
var fondo, fond;
var GRAVITY;
var coral, alga, piso;
var gameOver;
var bullets;
var gover;
// var mY= mouseY;
//it's advisable (but not necessary) to load the images in the preload function
//of your sketch otherwise they may appear with a little delay
function preload() {

  //create an animation from a sequence of numbered images
  //pass the first and the last file name and it will try to find the ones in between
  medani = loadAnimation("assets/1.png", "assets/52.png");
  tibani = loadAnimation("assets/mt1.png", "assets/mt16.png");
  fond = loadImage("assets/ FondoNivel1.jpg");
  gover = loadImage("assets/GameOver copia.png");
  // coralImg = loadImage("assets/ob1.png");


}

function setup() {
  // createCanvas(1280,755);
  // createCanvas(displayWidth, displayHeight);
  createCanvas(windowWidth, windowHeight);
  // createCanvas(1080,555);
  imageMode(CENTER);
  // gameOver = true;
  coralImg = loadImage("assets/ob1.png");
  algaImg = loadImage("assets/ob3.png");
  pisoImg = loadImage("assets/ob5.png");
  bulletImage = loadImage("assets/asteroids_bullet.png");

  fondo = createSprite(width * 0.50, height * 0.50);
  fondo.addImage(fond);
  fondo.scale = 0.55;
  // fondo.velocity.x = -4;
  
  // fondo = createSprite(width * 0.50, height * 0.50, 1280, 555);
  // fondo.addImage(fond);
  // fondo.scale = 0.55;

  med = createSprite(width * 0.10, random(0, height));
  med.addAnimation('flotar', medani);
  med.velocity.x = 3;
  med.scale = 0.3;
  med.setCollider('rectangle', 0, 0, 310, 290);
  med.debug = true;


  corales = new Group();
  algas = new Group();
  pisos = new Group();
  tiburones = new Group();
  bullets = new Group();

  camera.position.y = height / 2;
}

function draw() {

  // background(fondo, 3508, 1240);
  background(0);

  if (!gameOver) {

    if (med.position.y < 0)
      med.position.y = 0;
    if (med.overlap(corales))
      die();
    if (med.overlap(algas))
      die();
    if (med.overlap(pisos))
      die();
    if (med.overlap(tiburones))
      die();

    if (random(frameCount % 150) == 0) {
      var coral = createSprite(med.position.x + width, height * 0.90);
      coral.addImage(coralImg);
      corales.add(coral);
      coral.scale = 0.33;
      coral.velocity.x = -3;
      coral.setCollider('circle', 0, 5, width * 0.16);
      // coral.setCollider('rectangle', 0, 0, 600, 430);
      coral.debug = true;
    }

    imageMode(CORNER);

    if (random(frameCount % 80) == 0) {
      var algaH = random(50, 300);
      var alga = createSprite(med.position.x + width, height * 0.10);
      alga.addImage(algaImg);
      algas.add(alga);
      alga.scale = random(0.25, 0.45);
      alga.velocity.x = -3;
      alga.setCollider('rectangle', 0, 0, 235, 560);
      alga.debug = true;
    }


    if (random(frameCount % 100) == 0) {
      var piso = createSprite(med.position.x + width, random(width * 0.15, height * 0.75));
      piso.addImage(pisoImg);
      pisos.add(piso);
      piso.scale = random(0.10, 0.30);
      piso.velocity.x = -3;
      piso.setCollider('rectangle', 0, 0, 600, 80);
      piso.debug = true;
    }

    if (random(frameCount % 140) == 0) {
      var tib = createSprite(med.position.x + width, random(width * 0.15, height * 0.75));
      tib.addAnimation('flotart', tibani);
      tiburones.add(tib);
      tib.scale = 0.30;
      tib.mirrorX(-1);
      tib.velocity.x = -5;
      tib.setCollider('circle', 0, 5, width * 0.12);
      tib.debug = true;
    }


    // piso = createSprite(random(width, 0), random(0, height));
    // piso.addImage(loadImage("assests/ob5.png"));


    for (var i = 0; i < corales.length; i++)
      if (corales[i].position.x < med.position.x - width / 2)
        corales[i].remove();


    for (var i = 0; i < algas.length; i++)
      if (algas[i].position.x < med.position.x - width / 2)
        algas[i].remove();


    for (var i = 0; i < pisos.length; i++)
      if (pisos[i].position.x < med.position.x - width / 2)
        pisos[i].remove();

    for (var i = 0; i < tiburones.length; i++)
      if (tiburones[i].position.x < med.position.x - width / 2)
        tiburones[i].remove();




    med.collide(corales);
    med.collide(algas);
    med.collide(pisos);
    med.collide(tiburones);


    // print(fondo.position.x);
    // if (fondo.position.x < 0) fondo.position.x = width * 0.5;


    if (!gameOver) med.position.y = mouseY;
    // med.velocity.y = med.velocity.y + GRAVITY;

    drawSprites();
    tiburones.overlap(bullets, tibuHit);

    camera.position.x = med.position.x + width / 4;

    if (camera.position.x > fondo.position.x - fondo.width)
      fondo.position.x += fondo.width;



    // camera.off();
    // image(fond,width * 0.50, height * 0.50,1080,555);
    // fondo.scale = 0.55;
    // camera.on();
    if (keyWentDown("x")) {
      var bullet = createSprite(med.position.x, med.position.y);
      bullet.addImage(bulletImage);
      bullet.setSpeed(10 + med.getSpeed(), med.rotation);
      bullet.life = 30;
      bullets.add(bullet);
    }
  }
  
  else{
    fill(255);
     med.position.x = 0;
     image(gover, 0.8* width, 0.5*height);

  }

}

function tibuHit(tiburones, bullet) {
  var newType = tiburones;

  bullet.remove();
  tiburones.remove();
}

function die() {
  updateSprites(false);
  gameOver = true;

}

function newGame() {
  corales.removeSprites();
  algas.removeSprites();
  pisos.removeSprites();
  tiburones.removeSprites();
  gameOver = false;
  updateSprites(true);
  med.position.x = 0;
  med.position.y = height / 2;
  med.velocity.y = 0;
  fondo.position.x = 0;
  fondo.position.y = height / 2
}

function mousePressed() {
  if (gameOver)
    newGame();
  med.velocity.y = 4;
}