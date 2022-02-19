import {BaseCrawler} from "./crawler/BaseCrawler";
import {Page} from "puppeteer";
import {SkypeCrawler} from "./crawler/SkypeCrawler";
import {BaseSender} from "./sender/BaseSender";

export class CrawlerFactory{

    static create(page:Page,type:string,sender:BaseSender):BaseCrawler{
        switch (type) {
            case "skype":
                return new SkypeCrawler(page,sender);
            default:
                throw new DOMException('Типа crawler '+type+' не сушествует!')
        }
    }
}