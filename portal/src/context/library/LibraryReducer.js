import ActionType from "../action-type";
import {pageableInit} from "./LibraryState";

const handlers = {
    [ActionType.SET_LOADING]: state => ({...state, loading: true}),

    [ActionType.SET_PAGE]: (state, {payload}) => ({...state, pageable: {...state.pageable, page: payload}}),
    [ActionType.SET_LIMIT]: (state, {payload}) => ({...state, pageable: {...state.pageable, limit: payload}}),

    [ActionType.GET_AUTHORS]: (state, {payload}) => ({...state, authors: payload}),

    [ActionType.GET_CATALOGS]: (state, {payload}) => ({...state, catalogs: payload, pageable: pageableInit, loading: false}),

    [ActionType.GET_BOOKS_BY_CATALOG_ID]: (state, {payload}) => ({
        ...state,
        books: payload.content,
        pageable: {
            ...state.pageable,
            page: payload.pageable.pageNumber,
            totalPages: payload.totalPages,
            totalElements: payload.totalElements
        },
        loading: false
    }),
    [ActionType.SAVE_BOOK]: (state, {payload, isNewBook}) => ({
        ...state,
        authors: findItemById(payload.author.id, state.authors) ? state.authors : [...state.authors, payload.author],
        books: isNewBook ? addNewBook(state.books, payload) : updateItemInArray(state.books, payload)
    }),
    [ActionType.ADD_BOOK]: (state, {payload}) => ({
        ...state,
        books: [...state.books, payload],
        pageable: updatePageableWhenBookIsAdded(state)
    }),
    [ActionType.DELETE_BOOK]: (state, {payload}) => ({
        ...state,
        books: state.books.filter(it => it.id !== payload.id),
        pageable: pageableWithPlusTotalElements(state, -1)
    }),

    DEFAULT: state => state
};

/**
 * Обновить обьект в массиве
 */
const updateItemInArray = (items, payload) => items.map(it => it.id === payload.id ? payload : it);

/**
 * Найти обьект по идентификатору
 */
const findItemById = (id, items) => items.find(item => item.id.toString() === id.toString());

/**
 * Для новой книги требуется поменять идентификатор на сгенерированный с бэка
 */
const addNewBook = (books, book) => [...(books.filter(it => it.id !== 0)), book];

const pageableWithPlusTotalElements = (state, number) => ({
    ...state.pageable,
    totalElements: state.pageable.totalElements + number
});

const updatePageableWhenBookIsAdded = state => {
    const totalPages = state.pageable.totalPages;

    return {
        ...pageableWithPlusTotalElements(state, 1),
        totalPages: totalPages === 0 ? 1 : totalPages
    }
}

export const LibraryReducer = (state, action) => {
    const handler = handlers[action.type] || handlers.DEFAULT;

    return handler(state, action);
};
