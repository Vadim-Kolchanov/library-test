import {Link} from "react-router-dom";
import LinksType from "../../../enums/links-type";
import React, {Fragment, useState} from "react";
import {Row} from "./Row";
import {Button} from "react-bootstrap";
import moment from "moment";
import AuthorModel from "../../../models/author-model";
import CatalogModel from "../../../models/catalog-model";
import BookModel from "../../../models/book-model";

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

export const Table = ({catalog, books, actionsConfig}) => {
    const [isAdding, setIsAdding] = useState(false);

    const addBookActions = {
        onUndoBookCreation: book => {
            actionsConfig.undoBookCreation(book);
            setIsAdding(false);
        },
        onSaveCreatedBook: () => setIsAdding(false)
    };

    const goBack = <Link to={LinksType.CATALOG.to}><i className="bi bi-arrow-left-circle" role="button"></i></Link>;
    const header = <h1 className="text-center">{goBack} {catalog.name} каталог</h1>;

    const addBookButton = () => (
        <div className="d-flex justify-content-around mt-5">
            <Button disabled={isAdding}
                    className="btn btn-success"
                    onClick={() => onAddBook(catalog, actionsConfig.addNewBook, setIsAdding)}
            >Добавить книгу <i className="bi bi-plus-circle"></i></Button>
        </div>
    );

    if (books.length === 0) {
        return (<>
            {header}
            <p className="text-center mt-5">Данных нет</p>
            {addBookButton()}
        </>);
    }

    return (
        <Fragment>
            {header}
            <table className="table table-striped">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Название книги</th>
                    <th scope="col">Автор</th>
                    <th scope="col">Дата выпуска</th>
                    <th scope="col"></th>
                </tr>
                </thead>
                <tbody>
                {books.map((book, index) => <Row key={book.id}
                                                     book={book}
                                                     number={index + 1}
                                                     actionsConfig={actionsConfig}
                                                     addBookActions={addBookActions}/>)}
                </tbody>
            </table>

            {addBookButton()}
        </Fragment>
    );
};
