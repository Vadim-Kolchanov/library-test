import React, {useState} from "react";
import DateUtil from "../../../utils/date-util";
import {Actions} from "./Actions";
import {DropdownAuthor} from "../Dropdown/DropdownAuthor";
import {Button} from "react-bootstrap";

const saveBookButton = (setEdit, saveBook, book, name, author, releaseDate) => (
    <>
        <Button className="btn btn-success"
                onClick={() => {
                    setEdit(false);
                    saveBook({...book, name, author, releaseDate});
                }}
        >Сохранить</Button>

        <Button className="btn btn-danger"
                onClick={() => setEdit(false)}
        >Отменить</Button>
    </>
);

export const Row = ({book, number, actionsConfig}) => {
    const [isEdit, setEdit] = useState(false);
    const [name, setName] = useState(book.name);
    const [date, setDate] = useState(DateUtil.inputDate(book.releaseDate));
    const [author, setAuthor] = useState(book.author);

    if (isEdit) {
        return (
            <tr>
                <th scope="row">{number}</th>
                <td><input type="text" value={name} onChange={event => setName(event.target.value)}/></td>
                <td><DropdownAuthor authors={actionsConfig.authors} author={author} setAuthor={setAuthor}/></td>
                <td><input type="date" value={date} onChange={event => setDate(event.target.value)}/></td>
                <td className="d-flex align-items-center justify-content-around">{saveBookButton(setEdit, actionsConfig.saveBook, book, name, author, date)}</td>
            </tr>
        );
    }

    return (
        <tr>
            <th scope="row">{number}</th>
            <td>{book.name}</td>
            <td>{book.author.name}</td>
            <td>{DateUtil.dateToString(book.releaseDate)}</td>
            <td className="d-flex align-items-center justify-content-around"><Actions book={book}
                                                                                      setEdit={setEdit}
                                                                                      config={actionsConfig}/></td>
        </tr>
    );
};
