import moment from "moment";
import DateFormat from "../enums/date-format";

export default class DateUtil {

    static dateToString(date) {
        return moment(date).format(DateFormat.CLIENT_FORMAT);
    }
}