import AuthorModel from "./author-model";
import AbstractModel from "./abstract-model";
import CatalogModel from "./catalog-model";

export default class BookModel extends AbstractModel {

    public readonly releaseDate: number
    public readonly author: AuthorModel
    public readonly catalog: CatalogModel

    public readonly isNewBook: boolean
    public readonly isDeleted: boolean

    constructor(id: number, name: string, releaseDate: number, author: AuthorModel, catalog: CatalogModel, isNewBook: boolean = false, isDeleted: boolean = false) {
        super(id, name);

        this.releaseDate = releaseDate;
        this.author = author;
        this.catalog = catalog;
        this.isNewBook = isNewBook;
        this.isDeleted = isDeleted;
    }

    static newBook(catalog, releaseDate): BookModel {
        return new BookModel(
            0,
            'Название книги',
            releaseDate,
            new AuthorModel(-1, 'Неизвестный автор'),
            CatalogModel.fromObject(catalog),
            true
        );
    }
}
