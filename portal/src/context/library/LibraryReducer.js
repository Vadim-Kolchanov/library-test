import ActionType from "../action-type";

const handlers = {
    [ActionType.SET_LOADING]: state => ({...state, loading: true}),

    [ActionType.GET_CATALOGS]: (state, {payload}) => ({...state, catalogs: payload, loading: false}),
    [ActionType.GET_BOOKS_BY_CATALOG_ID]: (state, {payload}) => ({...state, books: payload, loading: false}),
    [ActionType.GET_AUTHORS]: (state, {payload}) => ({...state, authors: payload}),

    [ActionType.SAVE_BOOK]: (state, {payload}) => ({...state, books: state.books.map(it => it.id === payload.id ? payload : it)}),

    DEFAULT: state => state
};

export const LibraryReducer = (state, action) => {
    const handler = handlers[action.type] || handlers.DEFAULT;

    return handler(state, action);
};
