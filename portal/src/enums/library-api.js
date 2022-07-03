const url = value => `http://localhost:8080/api/${value}`;

const LibraryApi = {
    CATALOG: {
        GET_ALL: url('catalog')
    },
    BOOK: {
        BY_CATALOG_ID: catalogId => url(`book/all-by-catalog-${catalogId}`),
        DELETE: bookId => url(`book/delete/${bookId}`),
        CHANGE_CATALOG: (bookId, catalogId) => url(`book/change-catalog?bookId=${bookId}&catalogId=${catalogId}`)
    }
};

export default Object.freeze(LibraryApi);