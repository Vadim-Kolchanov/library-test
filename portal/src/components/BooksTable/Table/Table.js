import React, {Fragment, useState} from "react";
import {Row} from "./Row";
import {Pagination} from "../../Navigation/Pagination";
import {Header} from "./Header";

export const Table = ({catalog, books, actionsConfig}) => {
    const [isAdding, setIsAdding] = useState(false);

    const addBookActions = {
        onUndoBookCreation: book => {
            actionsConfig.undoBookCreation(book);
            setIsAdding(false);
        },
        onSaveCreatedBook: () => {
            if (books.length > actionsConfig.pageable.limit) {
                actionsConfig.getBooks(catalog.id, actionsConfig.pageable);
                return;
            }
            setIsAdding(false);
        }
    };

    const header = <Header catalog={catalog} isAdding={isAdding} setIsAdding={setIsAdding}
                           addNewBook={actionsConfig.addNewBook}/>;

    if (books.length === 0) {
        if (actionsConfig.pageable.totalPages > 1) {
            const currentPage = actionsConfig.pageable.page;
            actionsConfig.getBooks(catalog.id, {
                ...actionsConfig.pageable,
                page: currentPage === 0 ? currentPage : actionsConfig.pageable.page - 1
            });
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
            <Pagination {...actionsConfig.pageable} setPage={actionsConfig.setPage} setLimit={actionsConfig.setLimit}/>
        </Fragment>
    );
};
