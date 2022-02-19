import {BaseCrawler} from "./crawler/BaseCrawler";
import {Page} from "puppeteer";
import {SkypeCrawler} from "./crawler/SkypeCrawler";

export class CrawlerFactory{

    static create(page:Page,type:string):BaseCrawler{
        switch (type) {
            case "skype":
                return new SkypeCrawler(page);
            default:
                throw new DOMException('Типа crawler '+type+' не сушествует!')
        }
    }
}