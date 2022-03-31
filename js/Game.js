import { UI } from './UI.js';
import { PasswordDraw } from './PasswordDraw.js';
import { Wallet } from './Wallet.js';
import { Timer } from './Timer.js';

class Game extends UI {
    config = {
        easy: {
            points: 2,
            numerOfSeconds: 60,
        },
        medium: {
            points: 3,
            numerOfSeconds: 50,
        },
        difficult: {
            points: 4,
            numerOfSeconds: 40,
        },
    };

    intervalCheckGameTime = null;
    numerOfSecondsOfThisGame = null;
    pointsThisGame = null;
    level = null;
    buttonNextGameState = false;
    currentStep = 0;
    lastStep = 7;
    numbersOfGames = 0;
    moneyDepositValue = "";

    passwordDraw = new PasswordDraw();
    wallet = new Wallet(0);
    timer = new Timer();

    init(){
        this.chooseLevel();
        this.depositMoney();
        this.handleButtonPlay();
    }

    newGame(){
            this.htmlElements.imgStep[this.currentStep].style.opacity = 1;
            this.passwordDraw.drawTitleAndPassword();
            this.updateWallet();
            this.drawLetters();
            this.drawPassword();
            this.drawAuthor();
            this.timer.addNumber(this.numerOfSecondsOfThisGame);
            this.timer.addNumberOfsecondsToDataTimer();
            this.timer.starTimer();
            this.intervalCheckGameTime = setInterval(() => this.checkGameTime(), 1000);
            this.checkGameTime();
            this.addMoneyDepositValue();
            this.addPointsThisGame();
            this.wallet.drawPredictedWinnings(this.pointsThisGame);
            this.handleButtonEndGame();
            this.addResetGameButton();
    }

    handleButtonPlay(){
        this.htmlElements.buttonPlay.addEventListener('click', () => {
            if(!(this.htmlElements.selectLevel.value == "-1")){
               if(this.wallet.getWalletValue() > 0){
                this.htmlElements.wrapperStart.setAttribute('class', 'game_hide');
                this.htmlElements.wrapperGame.setAttribute('class', 'wrapper_game');
                this.addNumerOfSecondsOfThisGame();
                this.addAnimationClockTime();
                this.newGame();
               } else {
                   alert("Podaj kwotę gry !!!");
               }
            } else {
                alert("Wybierz poziom !!!");
            }
        });
    }

    addResetGameButton(){
        const resetButton = document.createElement('button');
        resetButton.innerHTML = "Nowa gra";
        this.htmlElements.wrapperReset.appendChild(resetButton);
        resetButton.addEventListener('click', () => this.resetGame());
    }

    resetGame(){
        this.reset();
        this.htmlElements.wrapperReset.innerHTML = "";
        this.htmlElements.wrapperWord.innerHTML = "";
        this.htmlElements.dataTimerContainer.innerHTML = "";
        this.htmlElements.wrapperStart.setAttribute('class', 'wrapper_start');
        this.htmlElements.wrapperGame.setAttribute('class', "wrapper_game game_hide");
        this.htmlElements.buttonDeposit.disabled = false;
        this.intervalCheckGameTime = null;
        this.numerOfSecondsOfThisGame = null;
        this.pointsThisGame = null;
        this.level = null;
        this.buttonNextGameState = false;
        this.currentStep = 0;
        this.lastStep = 7;
        this.numbersOfGames = 0;
        this.moneyDepositValue = "";
        this.htmlElements.selectLevel.value = "-1";
        this.htmlElements.inputDepositMoney.value = "podaj kwotę";
        this.wallet.changeWallet(0, "*");
        this.timer.updateTimerColorBlack();
        this.htmlElements.predictedWinningWrapper.setAttribute("class", "predicted_winnings");
        this.htmlElements.secondsContainer.classList.remove("animation_stop");
        this.passwordDraw.guessed.length = 0;
        this.htmlElements.imgStep.forEach(img => img.style.opacity = 0.1);
        this.htmlElements.predictedWinningWrapper.innerHTML = "";
    }

    reset(){
        this.htmlElements.wrapperLetters.innerHTML = "";
        this.htmlElements.wrapperCategory.innerHTML = "";
        
        this.timer.stopTimer();
        this.htmlElements.secondsContainer.classList.add("animation_stop");
    }

    handleButtonEndGame(){
        this.htmlElements.buttonEndGame.addEventListener('click',() => {
            this.endGame()
            this.htmlElements.secondsContainer.classList.add("animation_stop");
        });
    }

    addStyleToPredictetWin(){
        if(this.numbersOfGames == 1){
            this.htmlElements.predictedWinningWrapper.classList.add("style_red1");
        }
        else  if(this.numbersOfGames == 2){
            this.htmlElements.predictedWinningWrapper.classList.add("style_red2");
        }
        else  if(this.numbersOfGames == 3){
            this.htmlElements.predictedWinningWrapper.classList.add("style_red3");
        }
        else  if(this.numbersOfGames == 4){
            this.htmlElements.predictedWinningWrapper.classList.add("style_red4");
        }
        else  if(this.numbersOfGames == 5){
            this.htmlElements.predictedWinningWrapper.classList.add("style_red5");
        }
    } 
    
    checkGameTime(){
        if(this.timer.numberOfSeconds == 0) {
            this.endGame();
            clearInterval(this.intervalCheckGameTime);
        }
    }
    
    addPointsThisGame(){
        if(this.level === "easy"){
            this.pointsThisGame = this.config.easy.points;
        } 
        else if(this.level === "medium"){
            this.pointsThisGame = this.config.medium.points;
        } 
        else if(this.level === "difficult"){
            this.pointsThisGame = this.config.difficult.points;
        } 
    }

    addMoneyDepositValue(){
        this.htmlElements.depositMoney.textContent = this.moneyDepositValue;
    }

    addAnimationClockTime(){
        if(this.level === "easy"){
            this.htmlElements.secondsContainer.classList.add("seconds_container_easy");
        } 
        else if(this.level === "medium"){
            this.htmlElements.secondsContainer.classList.add("seconds_container_medium");
        } 
        else if(this.level === "difficult"){
            this.htmlElements.secondsContainer.classList.add("seconds_container_difficult");
        } 
    }

    addNumerOfSecondsOfThisGame(){
        if(this.level === "easy"){
            this.numerOfSecondsOfThisGame = this.config.easy.numerOfSeconds;
        } 
        else if(this.level === "medium"){
            this.numerOfSecondsOfThisGame = this.config.medium.numerOfSeconds;
        } 
        else if(this.level === "difficult"){
            this.numerOfSecondsOfThisGame = this.config.difficult.numerOfSeconds;
        } 
    }

    updateWallet(){
        this.htmlElements.winMoney.textContent = this.wallet.getWalletValue();
    }

    drawLetters(){
        for(let i = 0; i < 26; i++){
            const label = (i + 10).toString(36);
            const button = document.createElement("button");
            button.innerHTML = label.toUpperCase();
            this.htmlElements.wrapperLetters.appendChild(button);
            button.addEventListener('click', event => this.guess(label, event));
        }   
    }

    guess(letter, event){
        event.target.disabled = true;
        if(this.passwordDraw.guessLetter(letter)){
            this.drawPassword();
        } else {
        this.currentStep++;
        this.htmlElements.imgStep[this.currentStep].style.opacity = 1;
        if(this.currentStep == this.lastStep){
            this.endGame();
        }
    }
    }

    drawPassword(){
        const content = this.passwordDraw.getPassword();
        this.htmlElements.wrapperWord.innerHTML = content;
        if(content === this.passwordDraw.password){
            this.wining();
        }
    }

    drawAuthor(){
        this.passwordDraw.getAuthor();
    }

    chooseLevel(){
        this.htmlElements.selectLevel.addEventListener('change', e => {
            this.level = this.htmlElements.selectLevel.value;
        });
    }

    depositMoney(){
        this.htmlElements.buttonDeposit.addEventListener('click', (e) => {
            const moneyValue = Math.floor(this.htmlElements.inputDepositMoney.value);
            this.wallet.changeWallet(moneyValue);
            e.target.disabled = true;
            this.moneyDepositValue = moneyValue;
        });
    }

    wining(){
        this.htmlElements.wrapperWord.innerHTML = "Odgadłeś hasło!! Graj dalej!!";
        this.reset();
        this.updateWallet();
        this.buttonNextGameState = true;
        this.buttonNextGame();
        this.numbersOfGames++;
        this.addStyleToPredictetWin();
        this.checkNumbersOfGames();
    }

    addMoneyToWallet(){
        if(this.level === "easy"){
            this.wallet.changeWallet(this.config.easy.points, "*");
        } 
        else if(this.level === "medium"){
            this.wallet.changeWallet(this.config.medium.points, "*");
        } 
        else if(this.level === "difficult"){
            this.wallet.changeWallet(this.config.difficult.points, "*");
        } 
    }

    checkNumbersOfGames(){
        if(this.numbersOfGames == 5){
            this.endGame();
        }
    }

    endGame(){
        this.htmlElements.wrapperWord.innerHTML = `Wygrałeś ${this.wallet.getWalletValue()} zł`;
        this.reset();
    }

    buttonNextGame(){
        this.htmlElements.buttonContinuePlaying.addEventListener('click', () => {
            if(this.buttonNextGameState){
                this.nextGame(); 
                this.buttonNextGameState = false;
            }
        });
    }

    nextGame(){
        this.htmlElements.secondsContainer.classList.remove("animation_stop");
        this.timer.starTimer();
        this.passwordDraw.drawTitleAndPassword();
        this.passwordDraw.guessed.length = 0;
        this.htmlElements.wrapperWord.innerHTML = "";
        this.drawLetters();
        this.drawPassword();
        this.drawAuthor();
        this.addStyleToPredictetWin();
        this.addMoneyToWallet();
    }
}

window.onload = function (){
    const game = new Game();
    game.init();
};