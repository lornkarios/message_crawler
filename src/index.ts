const puppeteer = require('puppeteer');
const BUTTON_SELECTOR = '#index_login_button';
const CREDS = require('./creds');
const MSG_SEND_BTN_SELECTOR = '.im-send-btn.im-chat-input--send._im_send.im-send-btn_send';
(async () => {
    const browser = await puppeteer.launch({
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox'
        ]
    });
    const page = await browser.newPage();
    await page.goto('https://vk.com');
    await page.keyboard.type(CREDS.password);
    await page.click(BUTTON_SELECTOR);
    // await page.waitForNavigation();
    // await page.waitForSelector(MSG_SEND_BTN_SELECTOR, {visible: true});
    await page.screenshot({path: '../screenshots/example.png'});
    await browser.close();

})();