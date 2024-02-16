import clsx from "clsx";
import Calendar from "react-calendar";
import styles from "./MVCalendar.module.css";

export const MVCalendar = ({ minDate, onDateChange, date, maxDate }) => {
  //const [onChange] = useState(new Date());

  return (
    <>
      <Calendar className={clsx(styles.customCalendar)} minDate={minDate} onChange={onDateChange} value={date} maxDate={maxDate} />
    </>
  );
};
