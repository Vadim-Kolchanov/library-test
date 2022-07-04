import ActionType from "../action-type";

const updateItemInArray = (items, payload) => items.map(it => it.id === payload.id ? payload : it);

const addNewBook = (books, book) => [...(books.filter(it => it.id !== 0)), book];

const findAuthorById = (id, authors) => authors.find(author => author.id.toString() === id.toString());

const handlers = {
    [ActionType.SET_LOADING]: state => ({...state, loading: true}),

    [ActionType.GET_CATALOGS]: (state, {payload}) => ({...state, catalogs: payload, loading: false}),
    [ActionType.GET_BOOKS_BY_CATALOG_ID]: (state, {payload}) => ({...state, books: payload, loading: false}),
    [ActionType.GET_AUTHORS]: (state, {payload}) => ({...state, authors: payload}),

    [ActionType.SAVE_BOOK]: (state, {payload, isNewBook}) => ({
        ...state,
        authors: findAuthorById(payload.author.id, state.authors) ? state.authors : [...state.authors, payload.author],
        books: isNewBook ? addNewBook(state.books, payload) : updateItemInArray(state.books, payload)
    }),
    [ActionType.ADD_BOOK]: (state, {payload}) => ({...state, books: [...state.books, payload]}),
    [ActionType.DELETE_BOOK]: (state, {payload}) => ({...state, books: state.books.filter(it => it.id !== payload.id)}),

    DEFAULT: state => state
};

export const LibraryReducer = (state, action) => {
    const handler = handlers[action.type] || handlers.DEFAULT;

    return handler(state, action);
};
