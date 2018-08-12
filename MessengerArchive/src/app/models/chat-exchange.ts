export class ChatExchange {
    public sender: string;
    public message: string;
    public attr: string;
    public id: number;

    constructor(sender: string, message: string, attr: string, id: number) {
        this.sender = sender;
        this.message = message;
        this.attr = attr;
        this.id = id;
    }
}
