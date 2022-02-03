const puppeteer = require('puppeteer');
const USERNAME_SELECTOR = '#index_email';
const PASSWORD_SELECTOR = '#index_pass';
const BUTTON_SELECTOR = '#index_login_button';
const CREDS = require('./creds');
const NADYA_DIALOG_SELECTOR = '#im_dialogs > div.ui_scroll_overflow > div.ui_scroll_outer > div > div.ui_scroll_content.clear_fix > li.nim-dialog._im_dialog._im_dialog_182029340';
const MSG_INPUT_SELECTOR = '#im_editable0';
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

    await page.click(USERNAME_SELECTOR);
    await page.keyboard.type(CREDS.username);

    await page.click(PASSWORD_SELECTOR);
    await page.keyboard.type(CREDS.password);

    await page.click(BUTTON_SELECTOR);
    await page.waitForNavigation();

    await page.goto('https://vk.com/im');
    await page.click(NADYA_DIALOG_SELECTOR);

     await page.waitForSelector(MSG_INPUT_SELECTOR,{visible:true});
    await page.keyboard.type('Надюха с тобой говорит робот, а нечеловек!');

     await page.waitForSelector(MSG_SEND_BTN_SELECTOR,{visible:true});

     await page.click(MSG_SEND_BTN_SELECTOR);
    await page.screenshot({path: 'screenshots/example.png'});

    await browser.close();

})();