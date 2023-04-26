export class Pokemon {
    name: string;
    url: string;
    

    constructor(obj?: any) {
        this.name = obj ? obj.name : '';
        this.url = obj ? obj.url: '';
    }

    public toJSON() {
        return {
            name: this.name,
            url: this.url
        }
    }
}