import {Dropdown} from "react-bootstrap";
import React from "react";

export const DropdownCustom = ({CustomComponent, items, onSelect}) => (
    <Dropdown onSelect={onSelect}>
        <Dropdown.Toggle as={CustomComponent} id="dropdown-custom-components"/>
        <Dropdown.Menu>
            {items.map(it => (<Dropdown.Item key={it.id} eventKey={it.id}>{it.name}</Dropdown.Item>))}
        </Dropdown.Menu>
    </Dropdown>
);
