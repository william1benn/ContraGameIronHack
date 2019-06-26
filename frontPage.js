window.onload = function () {
    let theGame;

    let buttonA = document.querySelector(".aButton");
    let buttonB = document.querySelector(".Bbutton");
    let startButton = document.querySelector(".Start");
    let nes = document.querySelector("#NES");
    let blinkStart = document.querySelector(".Start-Game");

    startButton.addEventListener("click", startSound);
    buttonA.addEventListener("click", aSound);
    buttonB.addEventListener("click", bSound);

    function startSound(e) {

        let startGame = new Audio();
        startGame.src = "music/Title.mp3";
        startGame.play();

        setTimeout(() => {
            theGame = new Game();
            nes.remove();
            blinkStart.remove();
            theGame.gameStart();

        }, 50);

    }

    function aSound() {
        let Abutton = new Audio();
        Abutton.src = "music/Mario.wav";
        Abutton.play();
    }

    function bSound() {
        let Bbutton = new Audio();
        Bbutton.src = "music/Pokemon.wav";
        Bbutton.play();
    }




} //End