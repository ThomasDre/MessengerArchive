export class ChatDTO {
    public users: Array<string>;
    public file: string;
    public valid: boolean;

    constructor() {
        this.users = new Array<string>();
        this.valid = true;
    }

    public containUser(user: string): boolean {
        return this.users.includes(user);
    }

    public addUser(user: string) {
        this.users.push(user);
    }
}
