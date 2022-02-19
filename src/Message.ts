export class Message {
    time: string;
    text: string;
    author: string;

    constructor(time: string, text: string, author: string) {
        this.text = text;
        this.time = time;
        this.author = author;
    }
}