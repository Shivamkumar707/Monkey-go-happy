var PLAY = 1;
var END = 0;
var gameState = PLAY;
var ground;
var monkey, monkey_running, monkeyCollided;
var banana ,bananaImage, obstacle, obstacleImage;
var bananaGroup, obstacleGroup;
var gameOver,restart,gameOverImage,restartImage;
var score;

function preload(){
  
 monkey_running = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png" ,"sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png"  ,"sprite_8.png");
  
  monkeyCollided = loadAnimation("sprite_0.png");
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  gameOverImage = loadImage("gameOver.png");
  restartImage = loadImage("restart.png");

}

function setup() {
  createCanvas(400, 400);
  
  monkey = createSprite(70,315,20,20);
  monkey.addAnimation("moving", monkey_running);
  monkey.addAnimation("collided", monkeyCollided);
  monkey.scale = 0.09;
   
  ground = createSprite(200,315,800,15);
  ground.velocityX = -4;
  ground.x = ground.width/2;
  ground.scale = 1;
  console.log(ground.x);
  
  gameOver = createSprite(200,180);
  gameOver.addImage(gameOverImage);
  gameOver.scale = 0.6;
   
  restart = createSprite(200,220);
  restart.addImage(restartImage);
  restart.scale = 0.6;
     
  monkey.setCollider("circle", 0, 0, 290);
  monkey.debug = false;
    
  bananaGroup = createGroup();
  obstacleGroup = createGroup();
  
  score = 0;

}

function draw() {
  background("white");
  
  textSize(25);
  text("Survival Time: " +score,100,70);
  
  if(gameState===PLAY){
    if(ground.x < 0) {
     ground.x = ground.width/2; 
    }
  
  monkey.changeAnimation("moving",monkey_running);  
    
  gameOver.visible = false;
  restart.visible = false;
    
    score = score + Math.round(getFrameRate()/60);

    if(keyDown("space")&& monkey.y >=275) {
    monkey.velocityY = -16;
    }

    monkey.velocityY = monkey.velocityY + 1;

    spawnBanana();
    spawnObstacle();
    
    if(bananaGroup.isTouching(monkey)){
      bananaGroup.destroyEach();

    }
    
    if(obstacleGroup.isTouching(monkey)) {
      gameState = END;
      
    }
  }
  
  else if (gameState===END){
    ground.velocityX = 0;
    
    gameOver.visible = true;
    restart.visible = true;
    
    monkey.changeAnimation("collided", monkeyCollided);

    obstacleGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
    
    obstacleGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0); 
    
   if(mousePressedOver(restart)) {
    reset();
    
   }
  }
  
  monkey.collide(ground);

  drawSprites();
}

function reset() {
  gameState = PLAY;
  obstacleGroup.destroyEach();
  bananaGroup.destroyEach();
  score = 0;
}

function spawnBanana() {
  if(frameCount%80===0) {
    banana = createSprite(400,230,20,20);
    banana.addAnimation("banana", bananaImage);
    banana.y = Math.round(random(120,200))
    banana.velocityX = -(6+score/100); 
    banana.scale = 0.09;
    banana.lifetime = 130;
    
    bananaGroup.add(banana);
  }
}

function spawnObstacle() {
  if(frameCount%300===0) {
    obstacle = createSprite(400,290,20,20);
    obstacle.addAnimation("obstacle", obstacleImage);
    obstacle.velocityX = -(7+score/150); 
    obstacle.scale = 0.1;
    obstacle.lifetime = 130;
    
    obstacleGroup.add(obstacle);
  }
}



