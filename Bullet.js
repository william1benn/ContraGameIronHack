class Bullets {
    constructor(x,y,w,h){
        this.x = x;
        this.y = y;
        this.width = 5;
        this.height = 5;
    }


  movebullet() {
    
      this.x += 10;
  }
  eneBulletMove(){
    this.x -= 10;
  }

}
  