import {BaseCrawler} from "./crawler/BaseCrawler";
import {Page} from "puppeteer";
import {SkypeCrawler} from "./crawler/SkypeCrawler";
import {BaseSender} from "./sender/BaseSender";
import {Zorg1CCrawler} from "./crawler/Zorg1CCrawler";

export class CrawlerFactory{

    static create(page:Page,type:string,sender:BaseSender):BaseCrawler{
        switch (type) {
            case "skype":
                return new SkypeCrawler(page,sender);
            case "zorg1c":
                return new Zorg1CCrawler(page,sender);
            default:
                throw new DOMException('Типа crawler '+type+' не сушествует!')
        }
    }
}