import React, {useContext, useEffect} from "react";
import {LibraryContext} from "../../context/library/LibraryContext";
import {Table} from "./Table/Table";
import {Waiter} from "../UI/Waiter";

export const BooksTable = ({catalog}) => {
    const {loading, getAuthors, getBooks, pageable} = useContext(LibraryContext);

    useEffect(() => {
        getBooks(catalog.id, pageable);
        getAuthors();
        // eslint-disable-next-line
    }, [pageable.page, pageable.limit]);

    return (
        <React.Fragment>
            {loading
                ? <Waiter/>
                : <Table catalog={catalog}/>}
        </React.Fragment>
    );
};
