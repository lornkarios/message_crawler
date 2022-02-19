import {Message} from "../Message";

export abstract class BaseSender {
    abstract send(message:Message):Promise<void>;
}