import ActionType from "../action-type";

const handlers = {
    [ActionType.SET_LOADING]: state => ({...state, loading: true}),
    [ActionType.GET_CATALOGS]: (state, {payload}) => ({...state, catalogs: payload, loading: false}),
    [ActionType.GET_BOOKS_BY_CATALOG_ID]: (state, {payload}) => ({...state, books: payload, loading: false}),

    DEFAULT: state => state
};

export const CatalogReducer = (state, action) => {
    const handler = handlers[action.type] || handlers.DEFAULT;

    return handler(state, action);
};