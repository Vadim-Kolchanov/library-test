import React, {useState} from "react";
import {DropdownCustom} from "../../UI/DropdownCustom";

const CustomToggle = (authors, author, updateFields) => React.forwardRef(({children, onClick}, ref) => {
    const [value, setValue] = useState(author.name);

    return (
        <>
            <input type="text"
                   value={value}
                   onChange={event => setValue(event.target.value)}
                   onBlur={() => {
                       const author = findAuthorByName(value, authors)
                       updateFields(author ? {author} : {author: {name: value}})
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

const findAuthorByName = (name, authors) => authors.find(author => author.name === name);

export const DropdownAuthor = ({authors, author, updateFields}) => (
    <DropdownCustom CustomComponent={CustomToggle(authors, author, updateFields)}
                    items={authors}
                    onSelect={eventKey => updateFields({author: authors.find(author => author.id.toString() === eventKey.toString())})}
    />
);
