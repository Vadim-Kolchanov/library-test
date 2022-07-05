import React, {Fragment, useContext, useState} from "react";
import {Row} from "./Row";
import {Pagination} from "../../Navigation/Pagination";
import {Header} from "./Header";
import {LibraryContext} from "../../../context/library/LibraryContext";

const HEADERS = ['#', 'Название книги', 'Автор', 'Дата выпуска', ''];

const FIRST_PAGE = 0;

export const Table = ({catalog}) => {
    const {undoBookCreation, getBooks, pageable, books, addNewBook, setPage, setLimit} = useContext(LibraryContext);
    const [isAdding, setIsAdding] = useState(false);

    const addBookActions = {
        onUndoBookCreation: book => {
            undoBookCreation(book);
            setIsAdding(false);
        },
        onSaveCreatedBook: () => {
            if (books.length > pageable.limit) {
                getBooks(catalog.id, pageable);
                return;
            }
            setIsAdding(false);
        }
    };

    const header = <Header {...{catalog, isAdding, setIsAdding, addNewBook}}/>;

    if (books.length === 0) {
        if (pageable.totalElements > 0) {
            const currentPage = pageable.limit >= pageable.totalElements ? FIRST_PAGE : pageable.page;

            getBooks(catalog.id, {...pageable, page: currentPage === FIRST_PAGE ? currentPage : currentPage - 1});
            return;
        }

        return (<>
            {header}
            <p className="text-center mt-5">Данных нет</p>
        </>);
    }

    return (
        <Fragment>
            {header}
            <table className="table table-striped">
                <thead>
                <tr>
                    {HEADERS.map((name, i) => <th scope="col" key={name + i}>{name}</th>)}
                </tr>
                </thead>
                <tbody>
                {books.map((book, index) => <Row key={book.id} number={index + 1} {...{book, addBookActions}}/>)}
                </tbody>
            </table>
            <Pagination {...{...pageable, setPage, setLimit}}/>
        </Fragment>
    );
};
