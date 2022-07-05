import React, {useContext, useEffect} from "react";
import {LibraryContext} from "../../context/library/LibraryContext";
import {Table} from "./Table/Table";
import {Waiter} from "../UI/Waiter";

export const BooksTable = ({catalogId}) => {
    const {
        loading,
        authors, getAuthors,
        books, getBooks, deleteBook, saveBook, addNewBook, undoBookCreation,
        pageable, setPage, setLimit,
        catalogs, changeCatalog
    } = useContext(LibraryContext);

    useEffect(() => {
        getBooks(catalogId, pageable);
        getAuthors();
        // eslint-disable-next-line
    }, [pageable.page, pageable.limit]);

    const catalog = catalogs.find(it => it.id.toString() === catalogId);

    if (catalog == null) {
        return <p className="text-center">Каталог не найден!</p>;
    }

    const actionsConfig = {
        authors, changeCatalog,
        getBooks, saveBook, deleteBook, addNewBook, undoBookCreation,
        pageable, setPage, setLimit,

        catalogs: catalogs.filter(it => it.id !== catalog.id),
    };

    return (
        <React.Fragment>
            {loading
                ? <Waiter/>
                : <Table catalog={catalog} books={books} actionsConfig={actionsConfig}/>}
        </React.Fragment>
    );
};
