import {CatalogContext} from "./CatalogContext";
import React, {useReducer} from "react";
import ActionType from "../action-type";
import axios from "axios";
import LibraryApi from "../../enums/library-api";
import {CatalogReducer} from "./CatalogReducer";

export const CatalogState = ({children}) => {
    const initialState = {
        catalogs: [],
        books: [],
        loading: false
    };

    const [state, dispatch] = useReducer(CatalogReducer, initialState);

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
    const getBooks = async catalogId => {
        setLoading();

        const response = await axios.get(LibraryApi.BOOK.BY_CATALOG_ID(catalogId));

        dispatch({
            type: ActionType.GET_BOOKS_BY_CATALOG_ID,
            payload: response.data
        });
    };

    /**
     * Удалить книгу по её идентификатору
     */
    const deleteBook = async (bookId, catalogId) => {
        await axios.get(LibraryApi.BOOK.DELETE(bookId));

        await getBooks(catalogId);
    };

    /**
     * Перемещает книгу в другую директорию
     */
    const changeCatalog = async (bookId, fromCatalogId, toCatalogId) => {
        if (fromCatalogId.toString() === toCatalogId.toString()) {
            return;
        }

        await axios.get(LibraryApi.BOOK.CHANGE_CATALOG(bookId, toCatalogId));

        await getBooks(fromCatalogId);
    }

    /**
     * Уведомить, что идёт загрузка
     */
    const setLoading = () => dispatch({type: ActionType.SET_LOADING});

    const {loading, catalogs, books} = state;

    return (
        <CatalogContext.Provider value={{
            setLoading, getCatalogs, getBooks, deleteBook, changeCatalog,
            loading, catalogs, books
        }}>
            {children}
        </CatalogContext.Provider>
    );
};