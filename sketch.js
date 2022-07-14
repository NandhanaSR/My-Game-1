const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
var engine, world, backgroundImg;

var canvas, angle, tower, ground, cannon;



var gameState = 0;
var boy, boyFrontImg, boyFrontWalk;
var boyBackImg, boyBackWalk;

function preload() {
  backgroundImg = loadImage("./images/Texts/OpenTextBox.gif");
  openScreen = loadImage("images/Rooms/FarView.png");

    //textBoxData = loadJSON("images/Texts/OpenTextBox.json")
    textBoxImg = loadImage("./images/Texts/OpenTextBox.gif");

    doorRoom1 = loadImage("./images/Rooms/Door room -1.png");

    doorRoom2 = loadImage("./images/Rooms/doorRoom-2.gif  ")

    keyyImg = loadImage("./images/Key.gif");

    //Boy movements
    boyFrontImg = loadImage("./images/char/Char-1/front.png");
    boyFrontWalk = loadImage("./images/char/Char-1/frontWalk.gif");

    boyBackImg = loadImage("./images/char/Char-1/back.png");
    boyBackWalk = loadImage("./images/char/Char-1/backWalk.gif");

    boyLeftImg = loadImage("./images/char/Char-1/left.png");
    boyLeftWalk = loadImage("./images/char/Char-1/leftWalk.gif");

    boyRightImg = loadImage("./images/char/Char-1/right.png");
    boyRightWalk = loadImage("./images/char/Char-1/rightWalk.gif");

    soldierTextImg = loadImage("./images/soldierText.gif");



}

function setup() {

  var canvas = createCanvas(windowWidth, windowHeight);
  engine = Engine.create();
  world = engine.world;

  var options = {
    isStatic: true
  }

    bgSprite = createSprite(windowWidth/2, windowHeight/2);
    bgSprite.addImage(openScreen);
    bgSprite.addImage("Door Room 1", doorRoom1);
    bgSprite.addImage("Door Room 2", doorRoom2);

    boy = createSprite(width/2, height/2 + 350, 50, 50);
    boy.addImage("Front", boyFrontImg);
    boy.addImage("Back", boyBackImg);
    boy.addImage("Front Walk", boyFrontWalk);
    boy.addImage("Back Walk", boyBackWalk);
    boy.addImage("Left", boyLeftImg);
    boy.addImage("Left Walk", boyLeftWalk);
    boy.addImage("Right", boyRightImg);
    boy.addImage("Right Walk", boyRightWalk);

    keyy = createSprite(width/2 - 570, height/2 - 350, 100, 100);
    keyy.addImage(keyyImg);
    keyy.scale = 0.9;
    keyy.visible = false;

    playButton = createButton("Play");
    playButton.position(width / 2 - 130, height / 2 + 95);
    playButton.class("customButton");


}

function draw() {
  background(0);
    Engine.update(engine); 

    if (keyDown("UP_ARROW")){
      boy.position.y = boy.position.y - 10;
      boy.changeImage("Back Walk");
      boy.scale = 1;
    }

    if (keyDown("DOWN_ARROW")){
      boy.position.y = boy.position.y + 10;
      boy.changeImage("Front Walk");
      boy.scale = 1;
    }

    if (keyDown("LEFT_ARROW")){
      boy.position.x = boy.position.x - 10;
      boy.changeImage("Left Walk");
      boy.scale = 1;
    }

    if (keyDown("RIGHT_ARROW")){
      boy.position.x = boy.position.x + 10;
      boy.changeImage("Right Walk");
      boy.scale = 1;
    }

    drawSprites();

    if(gameState === 0){

        bgSprite.scale = 1.08;

        boy.visible = false;

        image(textBoxImg, width/2 - 450, height/2 - 250);

        playButton.mousePressed(() => {
            //textBox.visible = false;
            playButton.hide();
            gameState += 1;
        })
        
    }

    if (gameState === 1){

        bgSprite.changeImage("Door Room 1");
        bgSprite.scale = 2;
        playButton.hide();

        boy.visible = true;
        boy.changeImage("Back");
        boy.scale = 2;

        soldierText = createSprite(width/2 + 600, height/2 - 250, 100, 200);
        soldierText.addImage(soldierTextImg);
        soldierText.scale = 1;

        input1 = createInput("").attribute("placeholder", " ");
        input1.position(width / 2 + 370, height / 2 - 260);
        input1.class("customInput");

        keyy.visible = true;

        ansButton1 = createButton("Enter");
        ansButton1.position(width / 2 + 600, height / 2 - 260);
        ansButton1.class("customButton");

        ansButton1.mousePressed(() => {

          if(input1.value() === "Silence" || "silence"){
            key.visible = true;
          }
  
      })
        if(keyy.overlap(boy)){
          gameState += 1;
        }
        
        //console.log(boy);        
    } 

    if (gameState === 2){

      bgSprite.changeImage("Door Room 2");
      bgSprite.scale = 5;
      ansButton1.hide();
      input1.hide();
      soldierText.visible = false;

    }
}
