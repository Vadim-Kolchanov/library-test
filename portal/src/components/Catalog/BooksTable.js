import React, {Fragment, useContext, useEffect} from "react";
import {CatalogContext} from "../../context/catalog/CatalogContext";
import DateUtil from "../../utils/date-util";
import {Link} from "react-router-dom";
import LinksType from "../../enums/links-type";
import {DropdownCustom} from "./DropdownCustom";

function renderTable(catalogName, books, actionsConfig) {
    const goBack = <Link to={LinksType.CATALOG.to}><i className="bi bi-arrow-left-circle" role="button"></i></Link>;
    const header = <h1 className="text-center">{goBack} {catalogName} каталог</h1>;

    if (books.length === 0) {
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
                {books.map((book, index) => renderRow(book, index, actionsConfig))}
                </tbody>
            </table>
        </Fragment>
    );
}

function renderRow(book, index, actionsConfig) {
    return (
        <tr key={book.name + index}>
            <th scope="row">{index + 1}</th>
            <td>{book.name}</td>
            <td>{book.author.name}</td>
            <td>{DateUtil.dateToString(book.releaseDate)}</td>
            <td className="d-flex align-items-center justify-content-around">{renderActions(book, actionsConfig)}</td>
        </tr>
    );
}

function renderActions(book, config) {
    return (<>
        <i onClick={() => config.onDeleteBook(book.id, book.catalog.id)}
           className="bi bi-trash" role="button"
           title="Удалить"/>

        <DropdownCustom catalogs={config.catalogs}
                        onSelect={eventKey => config.changeCatalog(book.id, book.catalog.id, eventKey)}/>
    </>);
}


export const BooksTable = ({catalogId}) => {
    const {loading, books, getBooks, catalogs, deleteBook, changeCatalog} = useContext(CatalogContext);

    useEffect(() => {
        getBooks(catalogId);
        // eslint-disable-next-line
    }, []);

    const catalog = catalogs.find(it => it.id.toString() === catalogId);

    if (catalog == null) {
        return <p className="text-center">Каталог не найден!</p>;
    }

    const actionsConfig = {
        catalogs: catalogs.filter(it => it.id !== catalog.id),
        onDeleteBook: deleteBook,
        changeCatalog: changeCatalog
    };

    return (
        <React.Fragment>
            {loading
                ? <p className="text-center">Загрузка...</p>
                : renderTable(catalog.name, books, actionsConfig)}
        </React.Fragment>
    );
};