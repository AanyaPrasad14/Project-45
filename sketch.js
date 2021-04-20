var PLAY = 1;
var END = 0;
var gameState = PLAY;
var flamingo, fImg;
var FGimg, FgGroup;
var backP, backImg;
var rock, leopard, obstacleGroup;
var balloonGroup;
var rockImg, leopardImg;

function preload(){
  fImg = loadImage("download.png");
  backImg = loadImage("jungle Img.jpg");
  rockImg = loadImage("rock.png");
  bombImg = loadImage("bomb.png");
  balloonImg = loadImage("balloon.png");
  FGimg = loadImage("FG.gif");
}

function setup(){
  createCanvas(600,400);

  backP = createSprite(0,200,10,10);
  backP.addImage("back", backImg);
  backP.scale = 4;
  backP.x = backP.width /2;
  backP.velocityX = -2;

  flamingo = createSprite(50,300,10,10);
  flamingo.addImage("fl", fImg);
  flamingo.scale = 0.8;

  obstacleGroup = new Group();
  balloonGroup = new Group();
  FgGroup = new Group();

  edges = createEdgeSprites();
}

function draw(){
  background(0);

  if(gameState === PLAY){
    if (backP.x < 0){
      backP.x = backP.width/2;
    }

    if(keyDown('space') && flamingo.y === 361.6){
      flamingo.velocityY = -16;
    }
   
    flamingo.velocityY = flamingo.velocityY + 0.6;

    flamingo.collide(edges[3]);

    if(flamingo.isTouching(balloonGroup)){
      balloonGroup.destroyEach();
    }

    if(flamingo.isTouching(obstacleGroup)){
      gameState = END;
    }
  }
  else if(gameState === END){
    flamingo.velocityX = 0;
    flamingo.velocityY = 0;

    obstacleGroup.setVelocityXEach = 0;
    balloonGroup.setVelocityXEach = 0;
    //FgGroup.velocityX = 0;

    backP.velocityX = 0;
    
  }
  obstacle();
  balloons();
  //floatingGround();

  drawSprites();
}

function obstacle(){

  if (frameCount % 100 === 0) {
    var rand = Math.round(random(1,2));
    obstacles = createSprite(590,385,10,10);
        switch(rand){
            case 1: obstacles.addImage(rockImg);
            break;
            case 2: obstacles.addImage(bombImg);
            break;
            default: break;
        }
    obstacles.scale = 0.6;
    obstacles.velocityX = -3;
    
    obstacles.lifetime = 400;
    
    obstacleGroup.add(obstacles);
  }
}

function balloons(){

    if (World.frameCount % 250 === 0) {
      var balloon = createSprite(590,10,10,10);
      balloon.y = random(10,237);
      balloon.addImage("balloonz", balloonImg);
      balloon.scale = 0.5;
      balloon.velocityX = -3;
      
      balloon.lifetime = 400;
      
      balloon.depth = flamingo.depth;
      flamingo.depth = flamingo.depth + 1;
      
      balloonGroup.add(balloon);

    }
  
  }

function floatingGround(){

  if (World.frameCount % 90 === 0) {
    var FG = createSprite(0,320,10,4);
    FG.addImage("FGz", FGimg);
    FG.scale = 0.5;
    FG.velocityX = -3;
    
    FG.lifetime = 400;
    
    FgGroup.add(FG);
  }
}
