export class UI {
    htmlElements = {
        buttonPlay: document.querySelector('[data-button-play]'),
        buttonDeposit: document.querySelector('[data-button-deposit]'),
        inputDepositMoney: document.querySelector('[data-money]'),
        selectLevel: document.querySelector('[data-level]'),
        wrapperStart: document.querySelector('[data-wrapper-start]'),
        wrapperGame: document.querySelector('[data-wrapper-game]'),
        depositMoney: document.querySelector('[data-deposit-money]'),
        winMoney: document.querySelector('[data-win-money]'),
        wrapperWord: document.querySelector('[data-word]'),
        wrapperCategory: document.querySelector('[data-category]'),
        wrapperLetters: document.querySelector('[data-letters]'),
        imgStep: document.querySelectorAll('[data-step]'),
        buttonContinuePlaying: document.querySelector('[data-button-continue-playing]'),
        buttonEndGame: document.querySelector('[data-button-end-game]'),
        secondsContainer: document.querySelector('[data-seconds-container]'),
        dataTimerContainer: document.querySelector('[data-timer]'),
        predictedWinningWrapper: document.querySelector('[data-predicted-winnings]'),
        dataWinMoneyContainer: document.querySelector('[data-win-money-container]'),
        buttonEndGame: document.querySelector('[data-button-end-game]'),
        wrapperReset: document.querySelector('[data-reset]'),
    }
}