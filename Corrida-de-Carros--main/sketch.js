const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
var bg;
var player;
var quadras, policiais;

var gameState = 1;
var chegada;
// 0 = menu
// 1 =  escolha o carro
// 2 = historinha
// 3 = play

var title, input, playerName, playButton, displayName;

function preload() {
    bg = loadImage("./assests/bg.jpeg");
}

function setup() {
    createCanvas(824, 768);

    chegada = createSprite(3050,705,100,100);
    chegada.shapeColor = "green";

    player = createSprite( 95, 105, 10,10);
    player.shapeColor = "red"

    quadras = new Group();
    policiais = new Group();

    geradorQuadras(10,000);
    geradorQuadras(10,200);
    geradorQuadras(10,400);
    geradorQuadras(10,600);
    geradorQuadras(10,800);
    geradorQuadras(10,1000);
    geradorQuadras(10,1200);
    geradorQuadras(10,1400);

    geradorPolicia();
   

    // criação do "menu"
    title = createElement("h1","Corrida de Carros");
    title.class("title");

    input =  this.input = createInput("").attribute("placeholder", "Digite Seu Nome");;
    input.class("customInput");

    playButton = createButton("play");
    playButton.class("customButton");
    playButton.mouseClicked(()=>{
        gameState = 1;
    })

    displayName = createElement("h3");
    displayName.class("display");

}

function draw() {
    background("black");
   

   // console.log("player: " +player.x, player.y)
    // console.log(camera.position.x, camera.position.y)
   

    if(gameState == 0 ){
        playerName = input.value();
        console.log(playerName)
    }

    if(gameState == 1){
        
        hideMenu();
        displayName.html(playerName);
        //image(bg, 0,0,width*3, height*3);
        player.collide(quadras);
        policiais.collide(quadras);

        camera.position.x =  player.x ;
        camera.position.y =  player.y ;

        if(player.collide(chegada)){
            gameState = 2
        }

        if(player.isTouching(policiais)){
            gameState = 3
        }


        drawSprites();
        controls();
    }

    if(gameState == 2) {
        fill("green");
        text("parabéns! "+ playerName +" Você ganhou!", player.x + 20, player.y+ 20);
    }
   
    if(gameState == 3) {
        fill("red");
        text(playerName +", Você perdeu :(", player.x + 20, player.y+ 20);

    }
   
    if(policiais.collide(quadras)){
        policiais.velocityX = 5
        policiais.velocityY = 5
    }
}


function controls(){
    if (keyDown(LEFT_ARROW)){
        player.x -= 10;
    }
    if (keyDown(RIGHT_ARROW)){
        player.x += 10;
    }
    if (keyDown(UP_ARROW)){
        player.y -= 10;
    }
    if (keyDown(DOWN_ARROW)){
        player.y += 10;
    }
}


function geradorQuadras(numberOfSquares,y){
 var chao = createSprite (1600,1515, 3200,50);
 chao.shapeColor = "blue";
 quadras.add(chao);

 var teto = createSprite (1600 ,-100, 3200,50);
 teto.shapeColor = "blue";
 quadras.add(teto);

 var esquerda = createSprite ( -20, 710, 50,1670)
 esquerda.shapeColor = "blue";
 quadras.add(esquerda);

 var direita = createSprite(3205,710,50,1670)
 direita.shapeColor = "blue";
 quadras.add(direita);




    //     var quadra1 = createSprite(1232,2245, 707,500);
//     quadra1.shapeColor = "blue";
//     quadras.add(quadra1);

//    var quadra2 = createSprite(1816, 2010, 380, 30)
//    quadra2.shapeColor = "blue";
//     quadras.add(quadra2);
    
   
//    // quadras2.rotation = quadras2.rotation + 33

//     var quadra3 = createSprite(1640, 2200, 30, 380)
//     //quadra3.shapeColor = "blue";
//     quadras.add(quadra3);

//     var quadra4 = createSprite(1640, 2010, 380, 30)
//     quadras.add(quadra4);



    for(var i = 0; i < numberOfSquares; i++){
        var quadra = createSprite(200+300*i,y, 250,80);
        quadra.shapeColor = "blue";
        quadras.add(quadra);
    }
}

function geradorPolicia(){
    for(var i = 0; i < 8; i++){
        var x = random(200, 300);
        var y = random(200, 890);
        var policia = createSprite(x,y, 30,30);
        var speeds = [-8,8];
        policia.velocityY = random(speeds)
        policia.velocityX = random(speeds)
        policia.shapeColor = "purple";
         
       //if(policia.collide(quadras)){policia.velocityY = 5}

        policiais.add(policia);
    }
}

function hideMenu(){
    playButton.hide();
    title.hide();
    input.hide();
}