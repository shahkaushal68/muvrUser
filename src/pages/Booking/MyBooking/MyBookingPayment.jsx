import { Link } from "react-router-dom";
import { MVHeader, MVIcon } from "../../../components";
import styles from "./MyBooking.module.css";
import { Payment } from "../../../components/MuvrBookingSteps";
const MyBookingPayment = () => {
  return (
    <>
      <MVHeader>
        <div className="position-relative w-100 d-flex align-center">
          <Link to="/booking-edit" className={"header-btn"}>
            {MVIcon.BackArrow}
          </Link>
          <div className="pl-2 pr-8 d-flex mx-auto">
            <h3 className="fw-500">Payment</h3>
          </div>
        </div>
      </MVHeader>
      <Payment />
      <Link
        to="/booking-complete"
        variant={"primary"}
        className="w-100 d-flex align-center py-2 radius-none mt-7 primary-btn text-decoration-none"
      >
        <div>
          <h4 className="fw-600 white mb-0 text-left">$450</h4>
          <h5 className="fw-500 gray">Amount for changes</h5>
        </div>
        <h4 className="ml-auto fw-600 white mb-0">Pay & send request</h4>
      </Link>
    </>
  );
};
export default MyBookingPayment;
