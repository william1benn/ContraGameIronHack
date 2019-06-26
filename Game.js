let player;
let bullets; 
let game;


class Game {
constructor(){
this.cvs = document.getElementById("canvas")
this.ctx = this.cvs.getContext("2d");
    this.playerImg="images/ContraRun1.png"
    this.playerImg2 = "images/ContraRun2.png"
    this.playerImg3 = "images/contraRun3.png";
    this.playerLeft = "images/contraRunLeft1.png";
    this.playerLeft2 = "images/contraRunLeft2.png";
    this.playerLeft3 = "images/contraRunLeft3.png";
    this.background="images/Cbackground.png";
    this.enemyImg ="images/contraEneRight.png";
    this.enemyLeft="images/contraEneLeft.png"
    this.power = "images/contraPowerU.png";
    this.mainSong = "music/main.mp3";
    this.powerUpTokenY = 430;
    this.powerUpTokenX = Math.floor(Math.random()*11)*90; //needed muliples of ten
    this.movement =[];
    this.FPS =1;
    this.endGame;
    this.shutdown;
    this.eneBullet=[];
    this.enemy=[];
    this.bulletArr = [];
    //Double Bullet Shooting
    this.doubleBullet =[];
    this.DoublePower = false;
    //Double Bullet Shooting
    this.score=0;
    this.stop;
    this.stopGame;
    this.width = 5;
    this.height = 5;
    this.eneCounter=0;
    this.powerup = false;
    this.moveCount =0;
}

startGame(){
    let mainSong = new Audio();
    mainSong.src = game.mainSong;
    //mainSong.play();
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
    
    this.ctx.font = "23px 'Press Start 2P'Press Start 2P"
    this.ctx.fillStyle = "white";
    this.ctx.fillText("Score" + game.score, 40, 30);
    
    this.ctx.font = "23px 'Press Start 2P'"
    this.ctx.fillStyle = "white";
    this.ctx.fillText("Lives Left" + player.lives, 740, 30);
    
    //Player

    let mainP = new Image();
    mainP.src= this.playerImg;
    let mainP2 = new Image();
    mainP2.src = this.playerImg2;
    let mainP3 = new Image();
    mainP3.src = this.playerImg3;


    let leftP = new Image();
    leftP.src = this.playerLeft;
    let leftP2 = new Image();
    leftP2.src = this.playerLeft2;
    let leftP3 = new Image();
    leftP3.src = this.playerLeft3;


    //Running Images To Left 
     
    if (player.directionFace === "Left"){
        if(player.moveCount % 3 ===0){
            this.ctx.drawImage(leftP,player.x,player.y);  
          }else if(player.moveCount % 3 ===1 ){
            this.ctx.drawImage(leftP2,player.x,player.y); 
          }else if (player.moveCount % 3 ===2){
            this.ctx.drawImage(leftP3,player.x,player.y); 
          }
    }

    //Running Images To Right
    if (player.directionFace === "Right"){
      if(player.moveCount % 3 ===0){
        this.ctx.drawImage(mainP,player.x,player.y);  
      }else if(player.moveCount % 3 ===1 ){
        this.ctx.drawImage(mainP2,player.x,player.y); 
      }else if (player.moveCount % 3 ===2){
        this.ctx.drawImage(mainP3,player.x,player.y); 
      } 
    }
     
   
    
    
    this.eneCounter +=1;
    
    if(game.eneCounter % 500 === 0){
        
        game.createEnemy();
        
    }

    game.FPS +=1;

    // if(game.FPS %500 === 0){
    //Ene Generate
    game.enemy.forEach((badGuy,i)=>{
        // if(player.directionFace ==="Left"){
        let eneLeft = new Image();
        eneLeft.src = this.enemyLeft;
        
        this.ctx.drawImage(eneLeft,badGuy.eneX,badGuy.eneY);
        
        // }

        // if(player.direction !=="Left"){
        // let eneRight = new Image();
        // eneRight.src = this.enemyImg;
        
        // this.ctx.drawImage(eneRight,badGuy.eneX,badGuy.eneY);
        // }
    
    });
// }
    //Power Up Image
    if(game.score % 250 ===0 ){
        let powerUp = new Image();
        powerUp.src = this.power;
        game.powerup = true;
        
        if(game.powerup===true){
            this.ctx.drawImage(powerUp,game.powerUpTokenX,game.powerUpTokenY);
        }
        
        if (player.x === game.powerUpTokenX){
            
            game.powerup = null; 
            game.DoublePower = true;  

           
        }
        
    }
    this.eneShooting();
    this.attack();
    this.doubleAttack();
    requestAnimationFrame(this.drawing.bind(this));
    
}
 

doubleAttackBullet(e){
if(game.DoublePower === true){
    if(this.doubleBullet.length ===4){
        setTimeout(function(){ 

    if(e.keyCode == 16){
        let bullet = new Bullets(player.x,player.y,this.width,this.height);
          this.doubleBullet.push(bullet);
          bullet.movebullet();
      }
    
    });
}else{
    if(e.keyCode == 16){
        let bullet = new Bullets(player.x,player.y,this.width,this.height);
          this.doubleBullet.push(bullet);
          bullet.movebullet();
}
}
}
}



doubleAttack(){
    
    game.doubleBullet.forEach((theBullets, i) =>{
        
        
        //theBullets.movebullet();
        
        this.ctx.fillStyle = "blue";
        this.ctx.fillRect(theBullets.x + 30,theBullets.y + 15 ,theBullets.width,theBullets.height);

    if(theBullets.x > 970) {
        game.doubleBullet.splice(1,i);
    }
 });
}
 
attack(){

    game.bulletArr.forEach((theBullets, i) =>{
       
    this.ctx.fillStyle = "#FF0000";
    this.ctx.fillRect(theBullets.x + 30,theBullets.y + 15 ,theBullets.width,theBullets.height);

    if(theBullets.x > 970) {
        game.bulletArr.splice(1,i);
    }
 });

}

bulletMaker(e) {
    
    if(this.bulletArr.length === 3){
        setTimeout(function(){  

            if(e.keyCode === 9){
              let bullet = new Bullets(player.x,player.y,this.width,this.height);
              bullet.movebullet();
              
              this.bulletArr.push(bullet);
            }

        }, 2000);

} else {
    if(e.keyCode === 9){
        let bullet = new Bullets(player.x,player.y,this.width,this.height);
        bullet.movebullet();
       
        this.bulletArr.push(bullet);
            }
}
    }
//Collisions For Second Gun Power Up
    doubleGunCollison(){
        
    for(let i = 0; i <  game.doubleBullet.length; i++ ){
        for(let k =0; k <  game.enemy.length; k++ ){


if(game.doubleBullet[i].x + game.doubleBullet[i].width > game.enemy[k].eneX && game.doubleBullet[i].x <  game.enemy[k].eneX + 23 && game.doubleBullet[i].y + game.doubleBullet[i].height > game.enemy[k].eneY && game.doubleBullet[i].y <  game.enemy[k].eneY + 23){
   
                game.enemy.splice(k, 1);
                game.doubleBullet.splice(i, 1)
                game.score += 50;

        }
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
    
//See if player get shot
    playerCollison(){

    for(let t=0; t < game.eneBullet.length; t++){

        if(game.eneBullet[t].x + game.eneBullet[t].width > player.x && game.eneBullet[t].x < player.x + 10 && game.eneBullet[t].y + game.eneBullet[t].height > player.y && game.eneBullet[t].y <  player.y +23){


            player.lives -=1;

            game.DoublePower=false;

             if(player.lives === 0){
                // game.gameOver();
                // alert("Game Over");

             }

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

    
    gameStart(){

        game = new Game();
        player = new Character();
     
        game.startGame();
        
        game.endGame = setInterval(function(){
            if(game.enemy.length > 0) {
                game.collisions();
                game.playerCollison();
                game.doubleGunCollison();
                
            }
            game.eneShooting();
            
            
        },70);
        
        
        game.shutdown = setInterval(()=>{
            if(game.enemy.length > 0) {
                
                game.eneLeadMaker();
            }
        },2000);
        
        
        
        game.drawing();
        
        }

 }//End 

 

 document.addEventListener("keydown",function(e){
  
 player.move(e);
 game.bulletMaker(e);
 game.doubleAttackBullet(e);



});

