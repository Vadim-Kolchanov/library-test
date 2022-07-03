import React, {useContext, useEffect} from "react";
import {Link, useParams} from "react-router-dom";
import {BooksTable} from "../components/Catalog/BooksTable";
import {CatalogContext} from "../context/catalog/CatalogContext";
import LinksType from "../enums/links-type";

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
    const {loading, catalogs, getCatalogs} = useContext(CatalogContext);
    const {id} = useParams();

    useEffect(() => {
        getCatalogs();
        // eslint-disable-next-line
    }, [id]);

    if (id) {
        return <BooksTable catalogId={id}/>;
    }

    return (
        <React.Fragment>
            <h1 className="text-center">Каталоги</h1>

            {loading
                ? <p className="text-center">Загрузка...</p>
                : renderCatalogs(catalogs)}
        </React.Fragment>
    );
};