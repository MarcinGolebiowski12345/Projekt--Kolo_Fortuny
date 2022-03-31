import { UI } from "./UI.js";

export class Wallet extends UI {
    constructor(money){
        super();
        this.money = money;
        this.getWalletValue = () => this.money;
    }

    changeWallet(value, type = "+"){

        if(typeof value === "number" && !isNaN(value)){
            if(type == "+"){
               return this.money += value;
            }
            else if(type == "-"){
               return this.money -= value;
            }
            else if(type == "*"){
               return this.money *= value;
            }
            else {
                throw new Error("nieprawidłowy typ działąnia")
            }
        }
        else {
            throw new Error("nieprawidłowa liczba")
        }
    }

    drawPredictedWinnings(points){
        let predictedMoneyWinnings = this.money;
        for(let i = 0; i<5; i++){
            const moneyToWin = document.createElement("div");
            moneyToWin.innerHTML = predictedMoneyWinnings;
            this.htmlElements.predictedWinningWrapper.appendChild(moneyToWin);
            predictedMoneyWinnings *= points;
         } 
         
    }
}