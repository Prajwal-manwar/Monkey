
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score
var Ground
var survivalTime = 0
var PLAY = 1
var END = 0
var gameState = PLAY
function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
 
}



function setup() {
monkey = createSprite(80, 315, 20, 20);
 monkey.addAnimation("running", monkey_running)
monkey.scale=0.1

  
ground = createSprite(400,350,900,10);
ground.velocityX = -4;
ground.x=ground.width/2;
console.log(ground.x)

obstaclesGroup = new Group();
bananaGroup = new Group();
}


function draw() {
background(255)

stroke("white");
textSize(20);  
fill("white");
  
stroke("black");
textSize(20);  
fill("black");

 
if (gameState === PLAY){
  
  survivalTime = Math.ceil(frameCount/frameRate());
text("survivalTime: "+ survivalTime, 100, 50)  ;
  
  if (keyDown("space")) {
monkey.velocityY=-12
}
if (monkey.isTouching(bananaGroup)){
bananaGroup.destroyEach();
}
spawnObstacles();
spawnBanana();
}

if (gameState === END){
obstaclesGroup.setVelocityXEach(0);
bananaGroup.setVelocityXEach(0);

}

if (ground.x<0){
    ground.x=ground.width/2;

  }


if (monkey.isTouching(obstaclesGroup)){
gameState = END;
}

  
  monkey.velocityY=monkey.velocityY + 0.8
  
  monkey.collide(ground)

  

  
drawSprites();
}

function spawnObstacles() {
  if(frameCount % 300 === 0) {
    var obstacle = createSprite(400,320,10,40);
    obstacle.addImage(obstaceImage)
    obstacle.velocityX = -6 ;
   
    
    
              
    obstacle.scale = 0.15;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}

function spawnBanana(){
if (frameCount % 100 === 0){
var banana = createSprite(600,180,40,10);
    banana.y = Math.round(random(120,200));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -3;
    
     //assign lifetime to the variable
    banana.lifetime = 200;
    
    //adjust the depth
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    
    //add each cloud to the group
    bananaGroup.add(banana);
}
}






