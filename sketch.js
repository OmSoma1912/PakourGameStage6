var player, player_img1, player_img2;
var bg, bg_img;
var tri, obstacle2;
var wood1, obstacle3;
var wood2, obstacle4;
var ground;
var obstaclesGroup
var gameState = "intro";
var score = 0;
var reset, reset_img;
//var pause, pause_img;
var x = 20;

function preload(){
    player_img1 = loadImage("Images/player.png");
    player_img2 = loadImage("Images/player2.png");
    bg_img = loadImage("Images/bg.jpg");
    obstacle2 = loadImage("Images/obstacle2.png");
    obstacle3 = loadImage("Images/obstacle3.png");
    obstacle4 = loadImage("Images/obstacle4.png");
    reset_img = loadImage("Images/reset.jpg");
    //pause_img = loadImage("Images/pause.jpg")
}
function setup(){
    var canvas = createCanvas(800,400);
    
    ground = createSprite(400,400,800,50);
    ground.shapeColor = "green";
    ground.visible = false;

    player = createSprite(250,300,5,5);
    player.addImage("player", player_img1);
    player.scale = 0.07;
    player.visible = false;

    reset = createSprite(400,300,50,50);
    reset.addImage("reset", reset_img);
    reset.scale = 0.7;
    reset.visible = false;

    //pause = createSprite(750,350,50,50);
    //pause.addImage("pause", pause_img);
    //pause.scale = 0.07;
    //pause.visible = false;
    
    obstaclesGroup = new Group();
}

function draw(){
    if(gameState === "intro"){
        textSize(15);
        text("Instructions :", 300, 20);
        text("The object of this game is to get the highest score by pakouring on the blocks with the player and not fall off", 60, 50);
        text("Use the left and right arrow keys to move left and right. Use the space bar to jump.", 120, 80);
        text("Remember, the higher your score gets, the harder the game becomes", 150, 110);
        text("Your score will start increasing when you jump", 180, 140)
        text("Press 'S' to start the game", 260 , 200);
        
        if(keyDown("s")){
            gameState = "play";
        }
    }

    if(gameState === "play"){
        background(bg_img);
        textSize(15);
        text("Score : " + score,380,25);
        //text("M", 750,320);
        
        player.visible = true;
        ground.visible = true;
        //pause.visible = true;
        obstaclesGroup.setVisibleEach(true);
        reset.visible = false;

        player.velocityY = player.velocityY + 0.7;

        if(touches.length > 0 || keyDown("space")){
            player.y = player.y - 13.5;
            touches = [];
        }

        if(touches.length > 0 || keyDown("left_arrow")){
            player.x = player.x - 7;
            player.addImage("player", player_img2); 
            touches = [];
        }

        if(touches.length > 0 || keyDown("right_arrow")){
            player.x = player.x + 7;
            player.addImage("player", player_img1);
            touches = [];
        }

        if(player.y < 300){
            score = score + Math.round(getFrameRate()/60);
            ground.y = 1000;
        }

        player.collide(obstaclesGroup);
        player.collide(ground);

        spawnObstacles();
        
       /// if(keyDown("m")){
       //   gameState = "pause";
        //}

        if(player.x < 0 || player.y > 400){
            gameState = "end";
        }
    }

   // else if(gameState === "pause"){
     // obstaclesGroup.setVelocityXEach(0);
      //x = 1000000000000;
     // player.visible = false;
     // score = score;
  
   //   if(keyDown("m")){
     //   gameState = "play"
     // }
   // }

    else if(gameState === "end"){
        textSize(15);
        text("Score : " + score,380,25);
        player.visible = false;
        reset.visible = true;
        obstaclesGroup.destroyEach();
        score = score;
    
        if(touches.lenght > 0 || mousePressedOver(reset)){
           restart();
           touches = [];
        }
    }

    drawSprites();
}   
  
function spawnObstacles() {
    if(frameCount % x === 0) {
      var obstacle = createSprite(780,random(50,300),10,40);
      
      if(score < 100){
        obstacle.velocityX = -4;
        x = 20;
      }

      if(score < 200 && score > 100){
        obstacle.velocityX = -4.1;
        x = 21;
      }

      if(score < 300 && score > 200){
        obstacle.velocityX = -4.2;
        x = 22;
      }

      if(score < 400 && score > 300){
        obstacle.velocityX = -4.3;
        x = 23;
      }

      if(score < 500 && score > 400){
        obstacle.velocityX = -4.4;
        x = 24;
      }

      if(score < 600 && score > 500){
        obstacle.velocityX = -4.5;
        x = 25;
      }

      if(score < 700 && score > 600){
        obstacle.velocityX = -4.6;
        x = 26;
      }

      if(score < 800 && score > 700){
        obstacle.velocityX = -4.7;
        x = 27;
      }
        
      if(score < 900 && score > 800){
        obstacle.velocityX = -4.8;
        x = 28;
      } 
      
      if(score < 1000 && score > 900){
        obstacle.velocityX = -4.9;
        x = 29;
      }

      if(score > 1000){
        obstacle.velocityX = -5;
        x = 30;
      }
      
      var rand = Math.round(random(1,3));
      switch(rand) {
        case 1: obstacle.addImage(obstacle2);
                break;
        case 2: obstacle.addImage(obstacle3);
                break;
        case 3: obstacle.addImage(obstacle4);
                break;
        default: break;
      }
      
      obstacle.scale = 0.5;
      obstacle.lifetime = 210;
      obstaclesGroup.add(obstacle);

     
    }
  }

function restart(){
    player.y = 300;
    player.x = 250;
    gameState = "play";
    score = 0;
    ground.y = 400;
    obstaclesGroup.setVelocityXEach(0);
    frameCount = 0;
    x = 20;
}