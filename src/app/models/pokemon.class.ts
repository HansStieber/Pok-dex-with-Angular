export class Pokemon {
    name: string;
    url: string;
    

    constructor(obj?: any) {
        this.name = obj ? obj.name : '';
        this.url = obj ? obj.url: '';
    }
/*
    public toJSON() {
        return {
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            birthDate: this.birthDate,
            street: this.street,
            zipCode: this.zipCode,
            city: this.city,
            id: this.id
        }
    }*/
}