import React, {useContext, useEffect} from "react";
import {Link, useParams} from "react-router-dom";
import {BooksTable} from "../components/BooksTable/BooksTable";
import {LibraryContext} from "../context/library/LibraryContext";
import LinksType from "../enums/links-type";
import {Waiter} from "../components/UI/Waiter";

const urlCatalog = id => `${LinksType.CATALOG.to}/${id}`;

function renderCatalogs(catalogs) {
    return catalogs.map(catalog => (
        <div className="card mb-3 mx-auto w-50" key={catalog.id}>
            <div className="card-body">
                <h5>
                    <Link to={urlCatalog(catalog.id)}>
                        {catalog.name}
                    </Link>
                </h5>
            </div>
        </div>
    ));
}

export const Catalog = () => {
    const {loading, catalogs, getCatalogs} = useContext(LibraryContext);
    const {id} = useParams();

    useEffect(() => {
        getCatalogs();
        // eslint-disable-next-line
    }, [id]);

    if (id) {
        const catalog = catalogs.find(it => it.id.toString() === id)

        return catalog ? <BooksTable catalog={catalog}/> : <h1 className="text-center">Каталог не найден!</h1>;
    }

    return (
        <React.Fragment>
            <h1 className="text-center">Каталоги</h1>

            {loading
                ? <Waiter/>
                : renderCatalogs(catalogs)}
        </React.Fragment>
    );
};