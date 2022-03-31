import { UI } from './UI.js';

export class Timer extends UI{
    
    numberOfSeconds = "";
    minNumberOfSeconds = 0;
    interval = null;
   
    addNumber(number){
        this.numberOfSeconds = number
    }

    starTimer(){
       this.interval = setInterval(() => this.updateTimer(), 1000);
    }

    updateTimer(){
       this.updateTimerTime();
       this.updateTimerColorRed();
    }

    updateTimerTime(){
        this.numberOfSeconds--;
        this.numberOfSeconds >= this.minNumberOfSeconds
         ? this.updateAddNumberOfsecondsToDataTimer(this.numberOfSeconds)
         : this.stopTimer();
    }

    updateTimerColorRed(){
       if(this.numberOfSeconds <= 10){
           this.htmlElements.dataTimerContainer.style.color = "red";
       }
    }

    updateTimerColorBlack(){
      this.htmlElements.dataTimerContainer.style.color = "black";
    }

    stopTimer(){
       clearInterval(this.interval);
    }

    updateAddNumberOfsecondsToDataTimer(value) {
       this.htmlElements.dataTimerContainer.textContent = value;
    }

    addNumberOfsecondsToDataTimer(){
        this.htmlElements.dataTimerContainer.textContent = this.numberOfSeconds;
    }
}