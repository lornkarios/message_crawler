import {Page} from "puppeteer";
import {Message} from "../Message";
import {BaseSender} from "../sender/BaseSender";

export abstract class BaseCrawler {
    //вернем название типа
    abstract getName(): string;

    page: Page;
    sender: BaseSender;
    stack: Array<Message>;

    constructor(page: Page, sender: BaseSender) {
        this.page = page;
        this.sender = sender;
        this.stack = [];
    }

    //логинимся
    protected abstract login(): Promise<void>;

    protected abstract findMessage(): Promise<Message>;

    //ищем сообщения
    protected async findingMessages(): Promise<void> {
        while (true) {
            let findedMessage = await this.findMessage();
            let alreadyExist = false;

            //узнаем записывали мы раньше это письмо в этой сессии
            this.stack.forEach(function (message) {
                if (message.time === findedMessage.time && message.author === findedMessage.author && message.text === findedMessage.text) {
                    alreadyExist = true;
                }
            });

            //если ещё не записывали
            if (!alreadyExist) {

                //запишем его в стек
                this.stack.push(findedMessage);
                console.log('We found a new message in ' + this.getName() + '. Sending it to api.');
                console.log(findedMessage);

                //отправим его в апи
                // await this.sender.send(message);
            }
        }
    }

    //функция в котоорой мы ищем нужное
    async crawl(): Promise<void> {
        console.log('Loginning to ' + this.getName() + ' ...');
        await this.login();

        console.log('Finding messages ' + this.getName() + ' ...');
        await this.findingMessages();
    }


}