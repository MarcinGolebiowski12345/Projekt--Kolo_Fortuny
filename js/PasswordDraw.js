import { UI } from "./UI.js";

export class PasswordDraw extends UI {
    passwords = [
        {
            title: "pan tadeusz",
            author: "Adam Mickiewicz",
        },
        {
            title: "ogniem i mieczem",
            author: "Henryk Sienkiewicz",
        },
        {
            title: "nad niemnem",
            author: "Eliza Orzeszkowa",
        },
    ];

    constructor(){
        super();
        this.author = "";
        this.password = "";
        this.guessed = [];
    }

    drawTitleAndPassword() {
        let {title, author} = this.passwords[
            Math.floor(Math.random() * this.passwords.length)
        ];
        this.author = author;
        this.password = title;
    } 

    getPassword() {
        let content = "";
        for (const char of this.password) {
            if (char == " " || this.guessed.includes(char)) {
                content += char;
            } else {
                content += "_";
            }
        }
        return content;
    }

    getAuthor(){
        this.htmlElements.wrapperCategory.innerHTML = this.author;
    }

    guessLetter(letter){
        if(!this.password.includes(letter)){
            return false;
        } 
        this.guessed.push(letter);
        return true;
    }
}