import {DropdownCatalog} from "../Dropdown/DropdownCatalog";
import React, {useContext} from "react";
import {LibraryContext} from "../../../context/library/LibraryContext";

export const Actions = ({book, setEdit}) => {
    const {deleteBook, catalogs, changeCatalog} = useContext(LibraryContext);

    return (
        <div className="d-flex align-items-center justify-content-around">
            <i onClick={() => setEdit(true)}
               className="bi bi-pencil-fill" role="button"
               title="Редактировать"/>

            <i onClick={() => deleteBook(book)}
               className="bi bi-trash" role="button"
               title="Удалить"/>

            <DropdownCatalog catalogs={catalogs.filter(it => it.id !== book.catalog.id)}
                             onSelect={eventKey => changeCatalog(book, eventKey)}
            />
        </div>
    );
};
