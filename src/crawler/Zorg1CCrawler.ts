import {BaseCrawler} from './BaseCrawler'
import {Message} from "../Message";

const CREDS = require('../creds');

export class Zorg1CCrawler extends BaseCrawler {

    getName(): string {
        return "zorg1c";
    }

    protected async login(): Promise<void> {
        const LOGIN_SELECTOR = '#userName';
        const PASSWORD_SELECTOR = '#userPassword';
        const SUBMIT_BTN_SELECTOR = '#okButton';
        const MAIL_WIDGET = '#form0_HTML1_2_div';
        const MAILS_BLOCK = '#form1_СтраницыСписок';

        await this.page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36')
        await this.page.goto('https://zorg.1c.ru/z8/ru_RU/', {waitUntil: "networkidle0"});

        //введем email
        await this.page.waitForSelector(LOGIN_SELECTOR, {visible: true});
        await this.page.click(LOGIN_SELECTOR);
        await this.page.keyboard.type(CREDS.zorg1c.login);

        //введем пароль и войдем
        await this.page.click(PASSWORD_SELECTOR);
        await this.page.keyboard.type(CREDS.zorg1c.password);
        await this.page.click(SUBMIT_BTN_SELECTOR);

        //подождем пока появится виджет почты и нажмем его
        await this.page.waitForSelector(MAIL_WIDGET, {timeout: 30000});
        await this.page.click(MAIL_WIDGET);

        //подождем пока появятся письма
        await this.page.waitForSelector(MAILS_BLOCK);
    }


    protected async findMessage(): Promise<Message> {

        const LETTER_SELECTOR = '#grid_form1_Список > div.gridBody.flex-1-1-100 > div.gridLine .gridBoxText';
        let message: Message;
        do {

            await this.page.waitForTimeout(3000);
            let findedBlock = await this.page.evaluate(function (dialogSelector) {

                function getSelector(elm: HTMLElement) {
                    if (elm.tagName === "BODY") return "BODY";
                    const names = [];
                    while (elm.parentElement && elm.tagName !== "BODY") {
                        if (elm.id) {
                            names.unshift("#" + elm.getAttribute("id")); // getAttribute, because `elm.id` could also return a child element with name "id"
                            break; // Because ID should be unique, no more is needed. Remove the break, if you always want a full path.
                        } else {
                            let c = 1, e = elm;
                            for (; e.previousElementSibling; e = e.previousElementSibling, c++){} ;
                            names.unshift(elm.tagName + ":nth-child(" + c + ")");
                        }
                        elm = elm.parentElement;
                    }
                    return names.join(">");
                }

                let elems = document.querySelectorAll(dialogSelector);
                let findBlock = null;
                elems.forEach(function (elem) {

                    if (getComputedStyle(elem).fontWeight == '700') {
                        findBlock = getSelector(elem);
                    }
                });

                return findBlock;

            }, LETTER_SELECTOR)
            if (findedBlock) {
                await this.page.click(findedBlock);
                const frameHandle = await this.page.$("#form1_ПредпросмотрHTMLСВложениями > iframe");
                const frame = await frameHandle.contentFrame();
                await frame.waitForSelector('#From');
                await this.page.screenshot({path:'./res.jpg'});
                message = await this.page.evaluate(function (){
                    const AUTHOR_SELECTOR = '#From';
                    const IFRAME_SELECTOR = '#form1_ПредпросмотрHTMLСВложениями > iframe';
                    let iframe = document.querySelector(IFRAME_SELECTOR);

                    let author = iframe.contentWindow.document.body.querySelector(AUTHOR_SELECTOR).textContent;
                    return {time: '', author: author, text: ''}
                });
            }
        } while (message == null)

        return message;
    }

}