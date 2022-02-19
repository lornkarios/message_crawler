import {Message} from "../Message";

export abstract class BaseSender {
    abstract send(type:string,message:Message):Promise<void>;
}