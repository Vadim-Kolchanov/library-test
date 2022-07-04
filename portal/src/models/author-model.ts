import AbstractModel from "./abstract-model";

export default class AuthorModel extends AbstractModel {

    constructor(id: number, name: string) {
        super(id, name);
    }
}
