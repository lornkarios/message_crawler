import {BaseCrawler} from './BaseCrawler'
import {Message} from "../Message";

const CREDS = require('../creds');
const MAIN_DIALOG_SELECTOR = "[data-text-as-pseudo-element='Надежда']";

export class SkypeCrawler extends BaseCrawler {

    getName(): string {
        return "skype";
    }

    protected async login(): Promise<void> {
        const EMAIL_SELECTOR = '#i0116';
        const BUTTON_SELECTOR = '#idSIButton9';
        const PASSWORD_SELECTOR = '#i0118';
        const FORGOT_SELECTOR = '#idA_PWD_ForgotPassword';
        const LOGIN_BTN_SELECTOR = '#idSIButton9';
        const NOT_GO_FROM_SYSTEM_SELECTOR = '#idSIButton9'

        await this.page.goto('https://web.skype.com/');

        //введем email и нажмем кнопку далее

        await this.page.waitForSelector(EMAIL_SELECTOR, {visible: true});
        await this.page.click(EMAIL_SELECTOR);
        await this.page.keyboard.type(CREDS.skype.email);
        await this.page.click(BUTTON_SELECTOR);

        //введем пароль и войдем

        await this.page.waitForSelector(FORGOT_SELECTOR);
        await this.page.click(PASSWORD_SELECTOR);
        await this.page.keyboard.type(CREDS.skype.password);

        await this.page.click(LOGIN_BTN_SELECTOR);


        //нажмем кнопку того что мы не хотим выходить из системы
        await this.page.waitForSelector(NOT_GO_FROM_SYSTEM_SELECTOR,{visible:true});

        await this.page.click(NOT_GO_FROM_SYSTEM_SELECTOR);

        await this.page.waitForSelector(MAIN_DIALOG_SELECTOR,{timeout:60000});
    }


    protected async findMessage(): Promise<Message> {

        let message:Message;
        do {

            await this.page.waitForTimeout(3000);
            message = await this.page.evaluate(function (dialogSelector) {

                let dialog: Element;

                let nameElement = document.querySelector(dialogSelector);
                dialog = nameElement.parentElement.parentElement;
                let message = dialog.children[1].children[0].children[0].textContent;

                let author = nameElement.getAttribute('data-text-as-pseudo-element');
                let time = dialog.parentElement.children[2].children[0].getAttribute('data-text-as-pseudo-element')

                let indicatorElem = dialog.parentElement.children[2].children[1];

                if(indicatorElem && message){
                    return {time:time,text:message,author:author};
                }else{
                    return null;
                }

            },MAIN_DIALOG_SELECTOR)
        } while (message == null)

        return message;
    }
}