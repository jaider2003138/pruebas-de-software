export class BussinesError extends Error{
    constructor (message:string) {
        super(message);
        this.name = "BusinessError";
    }
}