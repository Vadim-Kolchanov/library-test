import {Link} from "react-router-dom";
import LinksType from "../../../enums/links-type";
import {Button} from "react-bootstrap";
import React from "react";
import BookModel from "../../../models/book-model";
import moment from "moment/moment";

const onAddBook = (catalog, addNewBook, setIsAdding) => {
    setIsAdding(true);
    addNewBook(BookModel.newBook(catalog, moment()));
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