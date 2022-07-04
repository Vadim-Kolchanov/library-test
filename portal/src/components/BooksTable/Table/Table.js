import {Link} from "react-router-dom";
import LinksType from "../../../enums/links-type";
import React, {Fragment} from "react";
import {Row} from "./Row";

export const Table = ({catalogName, books, actionsConfig}) => {
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
                {books.map((book, index) => <Row key={book.id} book={book} number={index + 1} actionsConfig={actionsConfig}/>)}
                </tbody>
            </table>
        </Fragment>
    );
};
