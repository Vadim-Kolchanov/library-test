import {Link} from "react-router-dom";
import LinksType from "../../../enums/links-type";
import {Button} from "react-bootstrap";
import React from "react";
import BookModel from "../../../models/book-model";
import moment from "moment";
import AuthorModel from "../../../models/author-model";
import CatalogModel from "../../../models/catalog-model";

const onAddBook = (catalog, addNewBook, setIsAdding) => {
    setIsAdding(true);

    const newBook = new BookModel(
        0,
        'Название книги',
        moment(),
        new AuthorModel(-1, 'Неизвестный автор'),
        CatalogModel.fromObject(catalog),
        true
    );

    addNewBook(newBook);
};

export const Header = ({catalog, isAdding, setIsAdding, addNewBook}) => (
    <h1 className="text-center">
        <Link to={LinksType.CATALOG.to}><i className="bi bi-arrow-left-circle me-3" role="button"></i></Link>

        {catalog.name} каталог

        <Button disabled={isAdding}
                className="btn btn-success ms-3"
                onClick={() => onAddBook(catalog, addNewBook, setIsAdding)}
        >Добавить книгу <i className="bi bi-plus-circle"></i></Button>
    </h1>
);