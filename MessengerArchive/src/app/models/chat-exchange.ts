export class ChatExchange {
    public sender: string;
    public message: string;
    public attr: string;
    public id: number;
    public picture: string;

    constructor(sender: string, message: string, attr: string, id: number, picture: string) {
        this.sender = sender;
        this.message = message;
        this.attr = attr;
        this.id = id;
        this.picture = picture;
    }
}
