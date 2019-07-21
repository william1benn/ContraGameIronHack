window.onload = function () {
    let theGame;
    let character;

    let mainTitle = document.querySelector("#main-title");
    let startButton = document.querySelector(".startgamebtn");
    let startGameBtn = document.querySelector(".startgamebtn");
    let blinkStart = document.querySelector(".start-game");
    let bubble = document.querySelector('#bubble');
    let canvasElement = document.querySelector("#canvas");

    startButton.addEventListener("click", startSound);
   

    
    function startSound(e) {

        let startGame = new Audio();
        startGame.src = "music/Title.mp3";
        startGame.play();

        setTimeout(() => {
            theGame = new Game();
             mainTitle.remove();
             startGameBtn.remove();
             blinkStart.remove();
             bubble.remove();
            theGame.gameStart();

        }, 50);

    }

    // function aSound() {
    //     let Abutton = new Audio();
    //     Abutton.src = "music/Mario.wav";
    //     Abutton.play();
    // }

    // function bSound() {
    //     let Bbutton = new Audio();
    //     Bbutton.src = "music/Pokemon.wav";
    //     Bbutton.play();
    // }

    
} //End


let canvasElement = document.querySelector("#canvas");

        function gameOver(){

        canvasElement.remove();

        img = document.getElementById("img");
        img.innerHTML +=`
        
        <img src="images/gameOver.jpg">
        
        ` 
        
        }