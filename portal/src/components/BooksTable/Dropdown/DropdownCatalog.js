import React from "react";
import {DropdownCustom} from "../../UI/DropdownCustom";

const CustomToggle = React.forwardRef(({children, onClick}, ref) => (
    <i className="bi bi-chevron-double-right"
       role="button"
       title="Переместить в другой каталог"
       ref={ref}
       onClick={e => {
           e.preventDefault();
           onClick(e);
       }}
    >{children}</i>
));

export const DropdownCatalog = ({catalogs, onSelect}) => (
    <DropdownCustom CustomComponent={CustomToggle} items={catalogs} onSelect={onSelect}/>
);
