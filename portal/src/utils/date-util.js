import moment from "moment";
import DateFormat from "../enums/date-format";

export default class DateUtil {

    static dateToString(date) {
        return this.format(date, DateFormat.CLIENT_FORMAT);
    }

    /**
     * Формат даты для <input/>. Другие он не принимает
     */
    static inputDate(date) {
        return this.format(date, DateFormat.INPUT_DATE_FORMAT);
    }

    static format(date, format) {
        return moment(date).format(format);
    }
}
