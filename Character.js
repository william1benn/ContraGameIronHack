let m;

class Character{
    constructor(){
    this.eneX = Math.floor(Math.random()*950);
    this.eneY = 400;
    this.x = 50;
    this.y = 400;
    this.width;
    this.height;
    this.hitPoints=1;
    this.directionFace ="Right";
    this.jump = false;
    this.jumpHeight = 55;
    this.lives =3;
    this.moveCount = 3;
    }


    eneLeadMaker(e) {
        game.enemy.forEach((eneGuy,i)=>{

          let theEneBullet = new Bullets(eneGuy.eneX,eneGuy.eneY,this.width,this.height);
            this.bulletArr.push(bullet);
            
        });
    
    }



    attack(){

        game.eneBullet.forEach((eneBullets, i) =>{
           
        this.ctx.clearRect(eneBullets.x + 35,eneBullets.y + 15,eneBullets.width,eneBullets.height);
          
        eneBullets.movebullet();
    
        this.ctx.fillStyle = "#FF0000";
        this.ctx.fillRect(eneBullets.x + 30,eneBullets.y + 15 ,eneBullets.width,eneBullets.height);
    
        if(eneBullets.x < 10) {
            game.enebullet.splice(1,i);
        };
     });
    
    }

    move(e){
    
        if(e.keyCode == 37){
            this.moveCount +=1;
        this.directionFace ="Left";
        
        this.x -= 10;
        }

       else if (e.keyCode ==38){
        
        //    console.log("UP");

           if (!this.jumping) {
            
            this.y -= this.jumpHeight;
            this.jumping = true;

            setTimeout(() => {
                
            this.y += 55;          
            this.jumping = false;
            
        }, 300);
          }
        }

        else if (e.keyCode == 39){
            this.moveCount +=1;
             this.directionFace = "Right";

             this.x+=10;
            }

            if(this.x >950)
            this.x = 950;
        
            if(this.x < 0)
            this.x = 0;
        
        

           e.preventDefault();
        }
          
          draw(){
        
    }
}
