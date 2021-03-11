var balloon,background;
var database,position;

function preload()
{
 backgroundImg=loadImage("images/bg.png");
 balloonImg=loadAnimation("images/1.png","images/2.png","images/3.png");
}

function setup() 
{
  database=firebase.database();
  console.log(database);
  createCanvas(500,500);
 balloon=createSprite(100, 400, 20, 20);
 balloon.addAnimation("balloon",balloonImg);
 balloon.scale=0.4;

 var balloonPosition=database.ref('balloon/height');
 balloonPosition.on("value",readHeight,showError); 
}



function draw()
{
  background(backgroundImg);  

  if(keyDown(LEFT_ARROW))
  {
    balloon.x=balloon.x-10;
  }

  else if(keyDown(RIGHT_ARROW))
  {
    balloon.x=balloon.x+10;
  }

  else if(keyDown(UP_ARROW))
  {
    balloon.y=balloon.y-10;
  }

  else if(keyDown(DOWN_ARROW))
  {
    balloon.y=balloon.y+10;
  }
  drawSprites();
}

function updateHeight(x,y)
{
  database.ref('balloon/height').set({
    'x':height.x+x,
    'y':height.y+y
  })
}

function readHeight(data)
{
  height=data.val();
  //console.log(position.x);
  balloon.x = height.x ;
  balloon.y = height.y;
}

function showError()
{
    console.log("error in writing the database");
}



