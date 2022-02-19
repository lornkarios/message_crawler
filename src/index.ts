import {CrawlerFactory} from "./CrawlerFactory";

const puppeteer = require('puppeteer');
const ACTIVE_CRAWLERS = [
    'skype'
];

ACTIVE_CRAWLERS.forEach(function (type: string) {
    (async () => {
        const browser = await puppeteer.launch({
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox'
            ]
        });
        const page = await browser.newPage();

        let crawler = CrawlerFactory.create(page,type);
        await crawler.crawl();

        await browser.close();

    })();
});
