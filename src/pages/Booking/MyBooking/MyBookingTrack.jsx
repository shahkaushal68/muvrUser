import { Link } from "react-router-dom";
import { MVHeader, MVIcon } from "../../../components";
import styles from "./MyBooking.module.css";
import clsx from "clsx";
import { MVTrackMuvers } from "../BookingComplete/MVTrackMuvers";
import { MVProgressChain } from "../../../components/MVProgressChain/MVProgressChain";
import { GoogleMap } from "@react-google-maps/api";
import { useBookingTrackingMuvrHook } from "../../../hooks";

const MyBookingTrack = () => {
  const { containerStyle, center, trackingInfo, bookingInfo } = useBookingTrackingMuvrHook();
  return (
    <>
      <MVHeader>
        <div className="position-relative w-100 d-flex align-center">
          <Link to={`/booking-details/${bookingInfo?.id}?dateType=upcoming`} className={"header-btn"}>
            {MVIcon.BackArrow}
          </Link>
          <div className="pl-2 pr-8 d-flex mx-auto">
            <h3 className="fw-500">Track</h3>
          </div>
        </div>
      </MVHeader>
      <section className={clsx(styles.trackWrap, "main-wrapper main-wrapper-scroll py-0")}>
        <div className={clsx(styles.trackDriverMapWrap)}>
          <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={1}></GoogleMap>
        </div>
        <div className={clsx(styles.trackDriverDetailWrap)}>
          <div className="w-100 d-flex align-center">
            <h5 className="mb-0 darkgray fw-500">
              <span className="dark mr-1">24</span>min to pick up
            </h5>
            <h6 className="mb-0 darkgray p-sm ml-auto fw-400">16 miles</h6>
          </div>
          <div className="mt-4">
            <MVTrackMuvers trackClassName={clsx(styles.trackerDriverContactBox)} isRemoveBottom={true} muvrInfo={bookingInfo?.bookingMuvrs} />
          </div>
          <div className="mt-4">
            <MVProgressChain tracking={trackingInfo} />
          </div>
        </div>
      </section>
    </>
  );
};
export default MyBookingTrack;
