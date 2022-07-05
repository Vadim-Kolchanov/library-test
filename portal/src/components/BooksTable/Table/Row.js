import React, {useState} from "react";
import DateUtil from "../../../utils/date-util";
import {Actions} from "./Actions";
import {DropdownAuthor} from "../Dropdown/DropdownAuthor";
import {Button} from "react-bootstrap";

const saveBookButton = (setEdit, saveBook, book, fields, setFieldsBook, addBookActions) => (
    <div className="d-flex align-items-center">
        <Button className="btn btn-success"
                style={{marginRight: '10px'}}
                onClick={async () => {
                    setEdit(false);
                    await saveBook({...book, ...fields});
                    if (!!book.isNewBook) addBookActions.onSaveCreatedBook();
                }}
        >Сохранить</Button>

        <Button className="btn btn-danger"
                onClick={() => {
                    if (!!book.isNewBook) {
                        addBookActions.onUndoBookCreation(book);
                        return;
                    }

                    setEdit(false);
                    setFieldsBook(initialStateFields(book));
                }}
        >Отменить</Button>
    </div>
);

const initialStateFields = book => ({
    name: book.name,
    releaseDate: DateUtil.inputDate(book.releaseDate),
    author: book.author
});

export const Row = ({book, number, actionsConfig, addBookActions}) => {
    const [isEdit, setEdit] = useState(!!book.isNewBook);
    const [fields, setFields] = useState(initialStateFields(book));

    const updateFields = fields => setFields(prevState => ({...prevState, ...fields}));

    if (isEdit) {
        return (
            <tr>
                <th scope="row">{number}</th>
                <td><input type="text" value={fields.name} onChange={event => updateFields({name: event.target.value})}/></td>
                <td><DropdownAuthor authors={actionsConfig.authors} author={fields.author} updateFields={updateFields}/></td>
                <td><input type="date" value={fields.releaseDate} onChange={event => updateFields({releaseDate: event.target.value})}/></td>
                <td style={{width: 0}}>{saveBookButton(setEdit, actionsConfig.saveBook, book, fields, setFields, addBookActions)}</td>
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
