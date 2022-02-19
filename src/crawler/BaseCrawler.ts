import {Page} from "puppeteer";
import {Message} from "../Message";
import {BaseSender} from "../sender/BaseSender";

export abstract class BaseCrawler {
    //вернем название типа
    abstract getName(): string;

    page: Page;
    sender: BaseSender;

    constructor(page: Page,sender: BaseSender) {
        this.page = page;
        this.sender = sender;
    }

    //логинимся
    protected abstract login(): Promise<void>;

    protected abstract findMessage(): Promise<Message>;

    //ищем сообщения
    protected async findingMessages():Promise<void> {
        while (true) {
            let message = await this.findMessage();
            console.log('We found a new message in ' + this.getName() + '. Sending it to api.');
            console.log(message);
            // await this.sender.send(message);
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