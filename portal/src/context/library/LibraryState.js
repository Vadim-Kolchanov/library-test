import {LibraryContext} from "./LibraryContext";
import React, {useReducer} from "react";
import ActionType from "../action-type";
import axios from "axios";
import LibraryApi from "../../enums/library-api";
import {LibraryReducer} from "./LibraryReducer";

export const pageableInit = {page: 0, totalPages: 1, limit: 5, totalElements: 0};

export const LibraryState = ({children}) => {
    const initialState = {
        catalogs: [],
        books: [],
        authors: [],
        pageable: pageableInit,
        loading: false
    };

    const [state, dispatch] = useReducer(LibraryReducer, initialState);

    const {loading, catalogs, books, authors, pageable} = state;

    /**
     * Получить список каталогов
     */
    const getCatalogs = async () => {
        setLoading();

        const response = await axios.get(LibraryApi.CATALOG.GET_ALL);

        dispatch({
            type: ActionType.GET_CATALOGS,
            payload: response.data
        });
    };

    /**
     * Получить список книг по идентификатору каталога
     */
    const getBooks = async (catalogId, {page, limit}) => {
        setLoading();

        const response = await axios.get(LibraryApi.BOOK.BY_CATALOG_ID(catalogId, page, limit));

        dispatch({
            type: ActionType.GET_BOOKS_BY_CATALOG_ID,
            payload: response.data
        });
    };

    /**
     * Удалить книгу
     */
    const deleteBook = async book => {
        await axios.get(LibraryApi.BOOK.DELETE(book.id));

        dispatch({
            type: ActionType.DELETE_BOOK,
            payload: book
        });
    };

    /**
     * Перемещает книгу в другую директорию
     */
    const changeCatalog = async (book, toCatalogId) => {
        if (book.catalog.id.toString() === toCatalogId.toString()) {
            return;
        }

        await axios.get(LibraryApi.BOOK.CHANGE_CATALOG(book.id, toCatalogId));

        dispatch({
            type: ActionType.DELETE_BOOK,
            payload: book
        });
    };

    /**
     * Сохраняет книгу
     */
    const saveBook = async book => {
        const response = await axios.post(LibraryApi.BOOK.SAVE, book);

        dispatch({
            type: ActionType.SAVE_BOOK,
            payload: response.data,
            isNewBook: !!book.isNewBook
        });
    };

    /**
     * Получить список авторов
     */
    const getAuthors = async () => {
        const response = await axios.get(LibraryApi.AUTHOR.GET_ALL);

        dispatch({
            type: ActionType.GET_AUTHORS,
            payload: response.data
        });
    };

    /**
     * Уведомить, что идёт загрузка
     */
    const setLoading = () => dispatch({type: ActionType.SET_LOADING});

    /**
     * Устанавливает номер страницы
     */
    const setPage = page => dispatch({type: ActionType.SET_PAGE, payload: page});

    /**
     * Устанавливает кол-во отображаемых элементов на странице
     */
    const setLimit = limit => dispatch({type: ActionType.SET_LIMIT, payload: limit});

    /**
     * Добавить новую книгу
     */
    const addNewBook = book => dispatch({type: ActionType.ADD_BOOK, payload: book});

    /**
     * Отменить создание новой книги
     */
    const undoBookCreation = book => dispatch({type: ActionType.DELETE_BOOK, payload: book});

    return (
        <LibraryContext.Provider value={{
            setLoading,
            getCatalogs, changeCatalog,
            getBooks, deleteBook, saveBook, addNewBook, undoBookCreation,
            setPage, setLimit,
            getAuthors,
            loading, catalogs, books, authors, pageable
        }}>
            {children}
        </LibraryContext.Provider>
    );
};
