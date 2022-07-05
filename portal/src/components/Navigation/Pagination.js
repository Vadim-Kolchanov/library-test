import './style/pagination.css';
import {useState} from "react";

const DISABLED = 'disabled';
const MAX_LIMIT = 25;

const checkFirstPage = page => page < 1 ? DISABLED : '';
const checkLastPage = (page, totalPages) => page + 1 >= totalPages ? DISABLED : '';

const onChangeLimit = (limit, setLimit) => {
    if (limit <= 0 || limit > MAX_LIMIT) return;

    setLimit(limit);
};

/**
 * @param {number} page - индекс страницы, начинается с нуля
 * @param {number} totalPages - кол-во всего страниц
 * @param {number} totalElements - кол-во всего элементов
 * @param {number} limit - ограничение элементов
 * @param {function} setPage - callback функция для установки страницы при нажатии на одну из кнопок
 * @param {function} setLimit - callback функция для установки кол-ва отображаемых элементов на странице
 */
export const Pagination = ({page, totalPages, totalElements, limit, setPage, setLimit}) => {
    const [pageLimit, setPageLimit] = useState(limit);

    return (
        <div className="d-flex justify-content-between">
            <div className="pagination-info">
                <label>Всего: {totalElements} | Страница: {page + 1} из {totalPages}</label>
            </div>
            <nav aria-label="Переключение страниц">
                <ul className="pagination pagination-lg mb-0">
                    <li className={'page-item ' + checkFirstPage(page)}>
                        <button className="page-link" onClick={() => setPage(--page)}>Предыдущая</button>
                    </li>
                    <li className={'page-item ' + checkLastPage(page, totalPages)}>
                        <button className="page-link" onClick={() => setPage(++page)}>Следующая</button>
                    </li>
                </ul>
            </nav>
            <div className="pagination-limit">
                <label>Показывать по</label>
                <input type="number"
                       value={pageLimit}
                       onChange={event => onChangeLimit(event.target.value, setPageLimit)}
                       onBlur={() => setLimit(pageLimit)}
                       onClick={event => event.target.select()}
                />
            </div>
        </div>
    );
}