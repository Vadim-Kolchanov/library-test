import React from "react";
import {Dropdown} from "react-bootstrap";

const CustomToggle = React.forwardRef(({children, onClick}, ref) => (
    <a href="" ref={ref}
       onClick={e => {
           e.preventDefault();
           onClick(e);
       }}
    >
        <i className="bi bi-chevron-double-right" title="Переместить в другой каталог"></i>
        {children}
    </a>
));

export const DropdownCustom = ({catalogs, onSelect}) => (
    <Dropdown onSelect={onSelect}>
        <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components"/>
        <Dropdown.Menu>
            {catalogs.map((it, index) => (<Dropdown.Item key={it.id + index} eventKey={it.id}>{it.name}</Dropdown.Item>))}
        </Dropdown.Menu>
    </Dropdown>
);