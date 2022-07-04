import React, {useState} from "react";
import {DropdownCustom} from "../../UI/DropdownCustom";

const CustomToggle = (authors, author, setAuthor) => React.forwardRef(({children, onClick}, ref) => {
    const [value, setValue] = useState(author.name);

    return (
        <>
            <input type="text"
                   value={value}
                   onChange={event => setValue(event.target.value)}
                   onBlur={() => {
                       const author = findAuthorByName(value, authors)
                       setAuthor(author ? author : {name: value})
                   }}
                   ref={ref}
                   onClick={e => {
                       e.preventDefault();
                       onClick(e);
                   }}
            />
            {children}
        </>
    );
});

const findAuthorById = (id, authors) => authors.find(author => author.id.toString() === id.toString());
const findAuthorByName = (name, authors) => authors.find(author => author.name === name);

export const DropdownAuthor = ({authors, author, setAuthor}) => (
    <DropdownCustom CustomComponent={CustomToggle(authors, author, setAuthor)}
                    items={authors}
                    onSelect={eventKey => setAuthor(findAuthorById(eventKey, authors))}
    />
);
