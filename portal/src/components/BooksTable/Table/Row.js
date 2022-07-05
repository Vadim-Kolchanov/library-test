import React, {useState} from "react";
import DateUtil from "../../../utils/date-util";
import {Actions} from "./Actions";
import {Editor} from "./Editor";

export const Row = ({book, number, addBookActions}) => {
    const [isEdit, setEdit] = useState(!!book.isNewBook);

    if (isEdit) {
        return <Editor {...{number, book, addBookActions, setEdit}}/>;
    }

    return (
        <tr>
            <th scope="row">{number}</th>
            <td>{book.name}</td>
            <td>{book.author.name}</td>
            <td>{DateUtil.dateToString(book.releaseDate)}</td>
            <td><Actions book={book} setEdit={setEdit}/></td>
        </tr>
    );
};
