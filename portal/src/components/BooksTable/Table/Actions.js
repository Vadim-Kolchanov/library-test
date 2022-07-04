import {DropdownCatalog} from "../Dropdown/DropdownCatalog";
import React from "react";

export const Actions = ({book, setEdit, config}) => {
    return (<>
        <i onClick={() => setEdit(true)}
           className="bi bi-pencil-fill" role="button"
           title="Редактировать"/>

        <i onClick={() => config.deleteBook(book.id, book.catalog.id)}
           className="bi bi-trash" role="button"
           title="Удалить"/>

        <DropdownCatalog catalogs={config.catalogs}
                         onSelect={eventKey => config.changeCatalog(book.id, book.catalog.id, eventKey)}
        />
    </>);
};
