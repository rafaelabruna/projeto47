var cidade, cidadeImg;
var balao, balaoImg;
var obstaculo1, obstaculoImg;
var obstaculos;
var PLAY=1;
var END=0;
var gameState=PLAY;
var gameOverImg, gameOver, restartImg, restart;
var score=0;

function preload(){
    cidadeImg=loadImage("assets/cityImage.png");
    balaoImg=loadAnimation("assets/balloon1.png", "assets/balloon2.png", "assets/balloon3.png");
    obstaculoImg=loadImage("assets/obsTop1.png");
    gameOverImg=loadImage("assets/fimdejogo.png");
    restartImg=loadImage("assets/restart.png");
}

function setup(){
    createCanvas(700,560);

    //imagem de fundo
    cidade=createSprite(350,280);
    cidade.addImage(cidadeImg);
    cidade.scale= 0.4;

    //personagem principal
    balao=createSprite(100,200,20,50);
    balao.addAnimation("balao", balaoImg);
    balao.scale= 0.35;

    //grupo dos obstaculos
    obstaculos=new Group();

    //criando gameOver e restart
    gameOver=createSprite(350,180);
    gameOver.addImage(gameOverImg);
    gameOver.scale= 0.6;

    restart=createSprite(350,220);
    restart.addImage(restartImg);
    restart.scale= 0.6;

    rectMode(CENTER);

}

function draw() {
    background("black");

    if (gameState==PLAY){

        // colocando gameOver e restart invisíveis
        gameOver.visible=false;
        restart.visible=false;

        //cálculo da pontuação
        score += Math.round(frameCount/120);

        //movendo o fundo
        cidade.velocityX= -2;
        if (cidade.x<200) {
            cidade.x= cidade.width/2-750;
        }

        //movendo o balao
        if (keyDown("space")) {
            balao.velocityY=-4;
        }

        //gravidade
        balao.velocityY+=0.4;


        //chamando a função dos obstaculos
        spawnObstacles();   
        
        //função para mudar de estado
        if (obstaculos.isTouching(balao)){
            gameState=END;
        }
    }

    if (gameState==END){

        //tornando gameOver e restart visíveis
        gameOver.visible=true;
        restart.visible=true;

        //parando o balao
        balao.velocityY=0;

        //parando o fundo
        cidade.velocityX=0;

        //parando os adversarios
        obstaculos.setVelocityXEach(0);

        //tempo de vida para que subtraindo 1 nunca chegue em 0
        obstaculos.setLifetimeEach(-1);

        //voltando a jogar
        if (mousePressedOver(restart)){
            reset();
        }
    }
    

    drawSprites();

    //configuração do texto da pontuação para que ela fique em cima da imagem de fundo
    push();
    fill("black");
    textSize(20);
    textFont("algerian");
    text("distância percorrida: " + score, 400,75);
    pop();
   
}

//função para gerar obstáculos
function spawnObstacles(){
    if(frameCount%75==0){
        var obstaculo=createSprite(650,50,40,50);
        obstaculo.addImage(obstaculoImg);
        obstaculo.scale=0.15
        obstaculo.y= Math.round(random(20,550));
        obstaculo.velocityX= -4;

        //adicionando ao grupo
        obstaculos.add(obstaculo);

        //tempo de vida dos obstaculos
        obstaculo.lifetime=200;
    }
}

//função para voltar a jogar 
function reset(){
    gameState=PLAY;
    gameOver.visible=false;
    restart.visible=false;
    //destruindo os obstáculos
    obstaculos.destroyEach();
    //zerando a pontuação
    score=0;
}
