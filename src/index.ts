import {CrawlerFactory} from "./CrawlerFactory";

const puppeteer = require('puppeteer');
const ACTIVE_CRAWLERS = [
    'skype',
    'zorg1c'

];
(async () => {
    const browser = await puppeteer.launch({
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            "--proxy-server='direct://'",
            '--proxy-bypass-list=*',
            // '-disable-web-security'
        ],
        executablePath: "/usr/bin/chromium"
    });
    await ACTIVE_CRAWLERS.forEach(function (type: string) {
        (async () => {

            const page = await browser.newPage();

            try {
                let crawler = CrawlerFactory.create(page, type);
                await crawler.crawl();
            } catch (err) {
                if (err instanceof Error) {
                    console.log('Краулер ' + type + ' завершился с ошибкой -' + err);
                    console.log(err.stack);
                }
            }


        })();
    });
    // await browser.close();
})();