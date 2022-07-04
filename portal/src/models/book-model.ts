import AuthorModel from "./author-model";
import AbstractModel from "./abstract-model";
import CatalogModel from "./catalog-model";

export default class BookModel extends AbstractModel {

    private readonly releaseDate: bigint
    private readonly author: AuthorModel
    private readonly catalog: CatalogModel

    private readonly isNewBook: boolean
    private readonly isDeleted: boolean

    constructor(id: number, name: string, releaseDate: bigint, author: AuthorModel, catalog: CatalogModel, isNewBook: boolean = false, isDeleted: boolean = false) {
        super(id, name);

        this.releaseDate = releaseDate;
        this.author = author;
        this.catalog = catalog;
        this.isNewBook = isNewBook;
        this.isDeleted = isDeleted;
    }
}
