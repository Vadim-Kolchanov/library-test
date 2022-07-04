import React, {useContext, useEffect} from "react";
import {LibraryContext} from "../../context/library/LibraryContext";
import {Table} from "./Table/Table";
import {Waiter} from "../UI/Waiter";

export const BooksTable = ({catalogId}) => {
    const {loading, books, getBooks, catalogs, deleteBook, changeCatalog, authors, getAuthors, saveBook} = useContext(LibraryContext);

    useEffect(() => {
        getBooks(catalogId);
        getAuthors();
        // eslint-disable-next-line
    }, []);

    const catalog = catalogs.find(it => it.id.toString() === catalogId);

    if (catalog == null) {
        return <p className="text-center">Каталог не найден!</p>;
    }

    const actionsConfig = {
        authors, changeCatalog, saveBook, deleteBook,

        catalogs: catalogs.filter(it => it.id !== catalog.id),
    };

    return (
        <React.Fragment>
            {loading
                ? <Waiter/>
                : <Table catalogName={catalog.name} books={books} actionsConfig={actionsConfig}/>}
        </React.Fragment>
    );
};
