class Bullets {
    constructor(x,y,w,h){
        this.x = x;
        this.y = y;
        this.width = 5;
        this.height = 5;
    }


  movebullet() {
    if(player.directionFace ==="Right"){

setInterval(()=>{

    this.x += 10;
  },70);
  
}else{

  setInterval(()=>{

    this.x -=10;
  
  },70);
}

  }


  eneBulletMove(){
    this.x -= 10;
  }

}
  