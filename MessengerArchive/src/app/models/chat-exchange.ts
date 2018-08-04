export class ChatExchange {
    public sender: string;
    public message: string;

    constructor(s: string, m: string) {
        this.sender = s;
        this.message = m;
    }
}
