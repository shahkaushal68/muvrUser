import { Link, useLocation } from "react-router-dom";
import { MVHeader, MVIcon } from "../../../components";
import clsx from "clsx";

const MyBookingCancellationPolicy = () => {
  const location = useLocation();
  return (
    <>
      <MVHeader>
        <div className="position-relative w-100 d-flex align-center">
          {location?.state?.bookingId ? (
            <Link to={`/booking-details/${location?.state?.bookingId}?dateType=${location?.state?.dateType}`} state={{ firstPopup: true }} className={"header-btn"}>
              {MVIcon.BackArrow}
            </Link>
          ) : (
            <Link to={`/booking-details/${location?.state?.booking_id}?dateType=${location?.state?.dateType}`} state={{ secondPopup: true }} className={"header-btn"}>
              {MVIcon.BackArrow}
            </Link>
          )}

          <div className="pl-2 pr-8 d-flex mx-auto">
            <h3 className="fw-500">Cancellation policy</h3>
          </div>
        </div>
      </MVHeader>
      <section className="main-wrapper main-wrapper-scroll">
        <ul className="pl-6">
          <li className="dark fw-400 mb-4">If it is more than 24 hours before the services are to be performed, the customer will not be charged.</li>
          <li className="dark fw-400 mb-4">
            If the customer cancels within 24 hours of when the services are to be performed, there will be a 20% charge of the total order amount.
          </li>
          <li className="dark fw-400 mb-4">
            In the instance where the order is already in progress and the Muvrs attempt to fulfill the request but cannot do so for reasons out of the Helper's or Muvr's control,
            the customer's credit card will be charged 50% of the total order amount. These fees compensate Muvrs for their gas, time, and lost income from the booked time in their
            schedule. All fees are non-refundable.
          </li>
        </ul>
      </section>
    </>
  );
};
export default MyBookingCancellationPolicy;
