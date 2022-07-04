import AbstractModel from "./abstract-model";

export default class CatalogModel extends AbstractModel {

    constructor(id: number, name: string) {
        super(id, name);
    }

    static fromObject(catalog: {id: number, name: string}): CatalogModel {
        return new CatalogModel(
            catalog.id,
            catalog.name
        );
    }
}
