
var PLAY = 1;
var END = 0;
var gameState = PLAY;

var boy;
var obstacle;
var ground,invisibleGround,groundImage;

var score=0;

var gameOver, restart;


function preload(){
    boy_running =   loadAnimation("boy1.jpg");

    obstacle1 = loadImage("obstacle1.png");
    
    gameOverImg = loadImage("gameOver.png");
    restartImg = loadImage("restart.png");

}

function setup() {
createCanvas(windowWidth, windowHeight);

boy = createSprite(50,180,20,50);
  
  boy.addAnimation("running", boy_running);
  boy.scale = 0.5;

  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -(6 + 3*score/100);


  gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(300,140);
  restart.addImage(restartImg);
   
  gameOver.scale = 0.5;
  restart.scale = 0.5;

  gameOver.visible = false;
  restart.visible = false;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  score = 0;
}

function draw() {
   background(250);
  text("Score: "+ score, 500,50);

  if (gameState===PLAY){
    score = score + Math.round(getFrameRate()/60);
    ground.velocityX = -(6 + 3*score/100);

    if(touches.length> 0 || keyDown("SPACE") && boy.y >= height-120){
        boy.velocityY= -10;
        touches=[];
    }

    if(keyDown("space") && boy.y >= 159) {
        boy.velocityY = -12;
      }
    
      boy.velocityY = boy.velocityY + 0.8
  
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    if(obstaclesGroup.isTouching(boy)){
        gameState = END;
    }
  }
  else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;

    ground.velocityX = 0;
    boy.velocityY = 0;

    if(mousePressedOver(restart)) {
        reset();
      }
    
  }
  drawSprites();
}

function reset(){
    gameState = PLAY;
    gameOver.visible = false;
    restart.visible = false;
    
    obstaclesGroup.destroyEach();
    
    
    boy.changeAnimation("running",boy_running);
    
   
    
    score = 0;
    
  }