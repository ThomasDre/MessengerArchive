export class ChatDTO {
    public users: Array<string>;
    public mainUser: string;        // has to be one of the users
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

    public isGroup(): string {
        if (this.users.length > 2) {
            return "true";
        } else {
            return "false";
        }
    }

    public getChatName(): string {
        // no group chat -> then name of chat is equal to the name of the chat partner
        if (this.users.length == 2) {
            for(let i = 0; i < 2; i++) {
                if (this.users[i] != this.mainUser) {
                    return this.users[i];
                }
            }
        }
        // TODO FIX THAT
        // in case of group chat only dummy name is returned 
        else {
            return "Group Chat";
        }
    }

    public getChatMembers(): string[] {
        let ret: string[] = [];

        for (let i = 0; i < this.users.length; i++) {
            if (this.users[i] != this.mainUser) {
                ret.push(this.users[i]);
            }
        }

        return ret;
    }
}
