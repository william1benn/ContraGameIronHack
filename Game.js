let player;
let bullets; 


class Game {
constructor(){
this.cvs = document.getElementById("canvas")
this.ctx = this.cvs.getContext("2d");
    this.playerImg="images/contraPlayer.png"
    this.background="images/Cbackground.png";
    this.enemyImg ="images/contraenemy.png";
    this.power = "images/contraPowerU.png";
    this.mainSong = "music/main.mp3";
    this.powerUpTokenY = 430;
    this.powerUpTokenX = Math.floor(Math.random()*11)*90; //needed muliples of ten
    this.gravity = 5;
    this.endGame;
    this.shutdown;
    this.eneBullet=[];
    this.enemy=[];
    this.bulletArr = [];
    this.score=0;
    this.stop;
    this.stopGame;
    this.width = 5;
    this.height = 5;
    this.eneCounter=0;
    this.powerup = false;
}


//First Item in the array doesnt disappear, and Jump Bullet still removes enemy.
startGame(){
    let mainSong = new Audio();
    mainSong.src = game.mainSong;
    mainSong.play();
}
createEnemy(){

    let badGuy = new Character(player.eneX,player.eneY);

    this.enemy.push(badGuy);

}

gameOver(){
    clearInterval(game.stop);
    clearInterval(game.stopGame);
    clearInterval(game.shutdown);
    clearInterval(game.endGame);

}

//Drawing the Images

 drawing(){
    
   //Background
   let backG = new Image();
   backG.src = this.background;
   this.ctx.drawImage(backG,0,0);

    this.ctx.font = "23px 'Press Start 2P'"
    this.ctx.fillStyle = "white";
    this.ctx.fillText("Score" + game.score, 40, 30);

    this.ctx.font = "23px 'Press Start 2P'"
    this.ctx.fillStyle = "white";
    this.ctx.fillText("Lives Left" + player.lives, 740, 30);

   //Player
   let mainP = new Image();
   mainP.src= this.playerImg;
   this.ctx.drawImage(mainP,player.x,player.y);    

   
    this.eneCounter +=1;

    if(game.eneCounter % 100 === 0){

        game.createEnemy();
        
    }

       game.enemy.forEach((badGuy,i)=>{

        let badImg = new Image();
        badImg.src = this.enemyImg;
       
        this.ctx.drawImage(badImg,badGuy.eneX,badGuy.eneY);

        if(badGuy.eneX < 10) {
            game.enemy.splice(1,i);
        }
    });

//Power Up Image
    if(game.score === 50){//divisable
        let powerUp = new Image();
        powerUp.src = this.power;
        this.powerup = true;

        if(this.powerup){
            this.ctx.drawImage(powerUp,game.powerUpTokenX,game.powerUpTokenY);
        }
       

        if (player.x === game.powerUpTokenX){

            this.powerup = false;



            // this.ctx.clearRect(game.powerUpTokenX,game.powerUpTokenY,50,50);

            
        }
    }
   game.attack();
}
 




attack(){

    game.bulletArr.forEach((theBullets, i) =>{
       
    this.ctx.clearRect(theBullets.x + 35,theBullets.y + 15,theBullets.width,theBullets.height);
      
    theBullets.movebullet();

    this.ctx.fillStyle = "#FF0000";
    this.ctx.fillRect(theBullets.x + 30,theBullets.y + 15 ,theBullets.width,theBullets.height);

    if(theBullets.x > 970) {
        game.bulletArr.splice(1,i);
    };
 });

}

bulletMaker(e) {
    
    if(this.bulletArr.length === 3){
        setTimeout(function(){  

            if(e.keyCode === 32){
              let bullet = new Bullets(player.x,player.y,this.width,this.height);
                this.bulletArr.push(bullet);
            }

        }, 2000);

} else {
    if(e.keyCode === 32){
              let bullet = new Bullets(player.x,player.y,this.width,this.height);
                this.bulletArr.push(bullet);
            }
}
    }



//Loops  //Keeps looping and counting
    collisions(){
        for(let i = 0; i <  game.bulletArr.length; i++ ){
            for(let k =0; k <  game.enemy.length; k++ ){


    if(game.bulletArr[i].x + game.bulletArr[i].width > game.enemy[k].eneX && game.bulletArr[i].x <  game.enemy[k].eneX + 23 && game.bulletArr[i].y + game.bulletArr[i].height > game.enemy[k].eneY && game.bulletArr[i].y <  game.enemy[k].eneY + 23){
       
                    
                    game.enemy.splice(k, 1);
                    game.bulletArr.splice(i, 1)
                    game.score += 50;
            }
    }

    }
    
    }
    
    liveRemoval(){
        return player.lives -=1;
    }

//See if player get shot
    playerCollison(){

    for(let t=0; t < game.eneBullet.length; t++){

        if(game.eneBullet[t].x + game.eneBullet[t].width > player.x && game.eneBullet[t].x < player.x + 23 && game.eneBullet[t].y + game.eneBullet[t].height > player.y && game.eneBullet[t].y <  player.y +23){
        
            //game.liveRemoval();   
            alert("you got hit");
        }
    }
    }
//Enemy Bullet Create
    eneLeadMaker(e) {

        let randomNum = Math.floor(Math.random()*game.enemy.length);
        let eneGuy = game.enemy[randomNum];

          let theEneBullet = new Bullets(eneGuy.eneX,eneGuy.eneY,this.width,this.height);
            this.eneBullet.push(theEneBullet);
    
    }


//Enemy Bullet Shoot
    eneShooting(){

        game.eneBullet.forEach((eneBullets, i) =>{
           
        eneBullets.eneBulletMove();
    
        this.ctx.fillStyle = "green";
        this.ctx.fillRect(eneBullets.x + 40,eneBullets.y + 8 ,eneBullets.width,eneBullets.height);
    
        if(eneBullets.x < 10) {
            game.eneBullet.splice(i,1);
        };
     });
    
    }


 }//End 




document.addEventListener("click",gameStart);
let game = new Game();

function gameStart(){

    player = new Character();
    bullets = new Bullets();
    
    game.startGame();

    game.endGame = setInterval(function(){
        if(game.enemy.length > 0) {
            game.collisions();
            game.playerCollison();

        }
        game.drawing();
        game.eneShooting();
        

     },50);

   game.shutdown = setInterval(()=>{
        if(game.enemy.length > 0) {
            
            game.eneLeadMaker();
        }
    },3000);

 


    }


document.addEventListener("keydown",function(e){
  
 player.move(e);
game.bulletMaker(e);

console.log(game.bulletArr);

});

