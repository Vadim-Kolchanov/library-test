import {DropdownAuthor} from "../Dropdown/DropdownAuthor";
import React, {useContext} from "react";
import {Button} from "react-bootstrap";
import {useState} from "react";
import DateUtil from "../../../utils/date-util";
import {LibraryContext} from "../../../context/library/LibraryContext";

const SaveBookButton = ({saveEdit, undoEdit}) => (
    <div className="d-flex align-items-center">
        <Button className="btn btn-success"
                style={{marginRight: '10px'}}
                onClick={saveEdit}
        >Сохранить</Button>

        <Button className="btn btn-danger"
                onClick={undoEdit}
        >Отменить</Button>
    </div>
);

const initialStateFields = book => ({
    name: book.name,
    releaseDate: DateUtil.inputDate(book.releaseDate),
    author: book.author
});

export const Editor = ({number, book, addBookActions, setEdit}) => {
    const {authors, saveBook} = useContext(LibraryContext);
    const [fields, setFields] = useState(initialStateFields(book));

    const updateFields = fields => setFields(prevState => ({...prevState, ...fields}));

    const saveEdit = async () => {
        setEdit(false);
        await saveBook({...book, ...fields});
        if (!!book.isNewBook) addBookActions.onSaveCreatedBook();
    }

    const undoEdit = () => {
        if (!!book.isNewBook) addBookActions.onUndoBookCreation(book);
        setEdit(false);
        setFields(initialStateFields(book));
    }

    return (
        <tr>
            <th scope="row">{number}</th>
            <td>
                <input type="text" value={fields.name} onChange={event => updateFields({name: event.target.value})}/>
            </td>

            <td>
                <DropdownAuthor authors={authors} author={fields.author} updateFields={updateFields}/>
            </td>

            <td>
                <input type="date" value={fields.releaseDate} onChange={event => updateFields({releaseDate: event.target.value})}/>
            </td>

            <td style={{width: 0}}><SaveBookButton {...{saveEdit, undoEdit}}/></td>
        </tr>
    );
}