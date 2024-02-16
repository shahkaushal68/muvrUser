import clsx from "clsx";
import signBoard from "../../assets/images/icons/exclamation-sign-board.svg";
import { MVRadioBtn } from "../MVRadioBtn/MVRadioBtn";
import styles from "./MuvrBookingSteps.module.css";
import { MVButton } from "../MVButton/MVButton";

export const BookingOptions = ({ current, setCurrent }) => {
  const BookingOptions = [
    {
      label: "I'm happy to wait as long as necessary for their response.",
      value: "I'm happy to wait as long as necessary for their response.",
    },
    { label: "Continue with any Muvr", value: "Continue with any Muvr" },
    { label: "Cancel my booking", value: "Cancel my booking" },
  ];
  return (
    <>
      <div className="content-full">
        <section className="main-wrapper">
          <div className={styles.signBoard}>
            <img src={signBoard} alt="signBoard" />
          </div>
          <h4 className={clsx("fw-500", styles.bookingOptionsRadioBtn)}>
            How would you like us to proceed if your favorite Muvr does not accept or respond to the request within 24
            hours?
          </h4>
          <MVRadioBtn options={BookingOptions} className={styles.bookingOptions} />
        </section>
      </div>
      <MVButton variant="primary" className={`w-100 align-self-end ${styles.stepsBtn}`} handleClick={() => setCurrent(current + 1)}>
        Next
      </MVButton >
    </>
  );
};
