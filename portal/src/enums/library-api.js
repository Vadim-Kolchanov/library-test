const url = value => `http://localhost:8080/api/${value}`;

const LibraryApi = {
    CATALOG: {
        GET_ALL: url('catalog')
    },
    BOOK: {
        BY_CATALOG_ID: (catalogId, page, limit) => url(`book/all-by-catalog-${catalogId}?page=${page}&limit=${limit}`),
        DELETE: bookId => url(`book/delete/${bookId}`),
        CHANGE_CATALOG: (bookId, catalogId) => url(`book/change-catalog?bookId=${bookId}&catalogId=${catalogId}`),
        SAVE: url('book/save')
    },
    AUTHOR: {
        GET_ALL: url('author/all'),
        SAVE: url('author/save')
    }
};

export default Object.freeze(LibraryApi);
