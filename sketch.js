
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var foodGroup, obstacleGroup;
var score;
var ground,ground1;
var spawnBanana,spawnObstacles;
var score,survivalTime=0;
var gamestate, PLAY=1,END=0;
var monkey_stop;
function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
  monkey_stop= loadAnimation("sprite_0.png");
}



function setup() {
   createCanvas(400,400);
 
  ground = createSprite(200,380,400,20);
  ground.velocityX=-4;
 ground.x = ground.width /2;
  ground1=createSprite(350,380,80,20);
  //ground1.velocityX=-4;
  
 monkey=createSprite(80,315,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale=0.1;
  
  foodGroup=createGroup();
  obstaclesGroup=createGroup();
  
  
 
 gamestate=1;
  
}


function draw() {
  background("white")
  monkey.collide(ground);
  
  if(gamestate===PLAY){stroke("black");
 

  if(keyDown("space")&& monkey.y >= 100) {
        monkey.velocityY = -12;
    }
    monkey.velocityY = monkey.velocityY + 0.8

  if(ground.x<200){
    ground.x=ground.width/2;
  }
  
  spawnBanana();
  spawnObstacles();
  
  if (monkey.isTouching(foodGroup)){
     foodGroup.destroyEach();
    survivalTime=survivalTime+1;
}
  textSize=20;
  fill("black");
  text("Survival Time: "+survivalTime,100,100);
                       
  if(monkey.isTouching(obstaclesGroup)){
    gamestate= END;
  }
                    }
  if ( gamestate===END){
    text("Game Over",180,200);
    text ("Press R To Restart", 160,220);
    ground.velocityX=0;
    foodGroup.destroyEach();
    obstaclesGroup.destroyEach();
    survivalTime=0;
    monkey.changeAnimation("stop", monkey_stop);
 }
  if (keyDown("r") && gamestate===END){
    gamestate= PLAY;
    
  }
  
    
  
  drawSprites()
}
function spawnBanana(){
  if(frameCount%100===0){
    banana=createSprite(400,200,20,20);
    banana.addImage(bananaImage);
    banana.scale=0.1;
    banana.velocityX=-4
    banana.y=Math.round(random(120,200));
    banana.lifetime=100;
    foodGroup.add(banana);
  }
  
}
function spawnObstacles(){
  if(frameCount%300===0){
    obstacle=createSprite(400,350,20,20);
    obstacle.addImage(obstacleImage);
    obstacle.scale=0.1;
    obstacle.velocityX=-4;
    obstacle.collide(ground);
   obstacle.lifetime=100;
   obstaclesGroup.add(obstacle);
  }
  
}






