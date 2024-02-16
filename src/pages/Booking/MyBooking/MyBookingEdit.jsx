import { Link } from "react-router-dom";
import { MVButton, MVHeader, MVIcon } from "../../../components";
import clsx from "clsx";
import {
  ArrowRight2,
  Box,
  Calendar,
  Gallery,
  Location,
  Truck,
} from "iconsax-react";
import styles from "./MyBooking.module.css";
const MyBookingEdit = (isSuccessfullyTrue) => {
  const editBookingListData = [
    {
      icon: (
        <>
          <Location
            size="24"
            fill="currentColor"
            variant="Bold"
            className="violet"
          />
        </>
      ),
      title: "Pickup & Drop-off locations",
      successfullyText: "Changes saved successfully",
      link: "/booking-location",
      isSuccessfullyTrue: true,
    },
    {
      icon: (
        <>
          <Box
            size="24"
            fill="currentColor"
            variant="Bold"
            className="violet"
          />
        </>
      ),
      title: "Make adjustment",
      successfullyText: "Changes saved successfully",
      link: "/booking-make-adjustment",
      isSuccessfullyTrue: true,
    },
    {
      icon: (
        <>
          <Truck
            size="24"
            fill="currentColor"
            variant="Bold"
            className="violet"
          />
        </>
      ),
      title: "Change vehicle",
      successfullyText: "Changes saved successfully",
      link: "/booking-change-vehicle",
      isSuccessfullyTrue: true,
    },
    {
      icon: (
        <>
          <Calendar
            size="24"
            fill="currentColor"
            variant="Bold"
            className="violet"
          />
        </>
      ),
      title: "Reschedule",
      successfullyText: "Changes saved successfully",
      link: "/booking-reschedule",
      isSuccessfullyTrue: true,
    },
    {
      icon: (
        <>
          <Gallery
            size="24"
            fill="currentColor"
            variant="Bold"
            className="violet"
          />
        </>
      ),
      title: "Instructions & Images",
      successfullyText: "",
      link: "/booking-instructions-images",
      isSuccessfullyTrue: false,
    },
  ];
  return (
    <>
      <MVHeader>
        <div className="position-relative w-100 d-flex align-center">
          <Link to="/my-bookings" className={"header-btn"}>
            {MVIcon.BackArrow}
          </Link>
          <div className="pl-2 pr-8 d-flex mx-auto">
            <h3 className="fw-500">Edit</h3>
          </div>
        </div>
      </MVHeader>
      <section
        className={clsx(
          styles.bookingEditSectionWrap,
          "main-wrapper main-wrapper-scroll px-0 pb-0"
        )}
      >
        <div className={clsx(styles.editBookingList, "px-4")}>
          {editBookingListData.map((item, index) => (
            <Link
              to={item.link}
              className="d-flex align-center text-decoration-none"
              key={index}
            >
              <div className="w-100 d-flex align-center">
                {item.icon}
                <div className="pl-2">
                  <h4 className="fw-500 dark mb-0">{item.title}</h4>
                  {isSuccessfullyTrue ? (
                    <>
                      <span className="green fw-400 p-sm">
                        {item.successfullyText}
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="green fw-400 p-sm">
                        {item.successfullyText}
                      </span>
                    </>
                  )}
                </div>
              </div>
              <div className="flex-0-auto, ms-auto pl-3 cursor-pointer">
                <ArrowRight2
                  size="20"
                  fill="currentcolor"
                  className="darkgray svg-hover-primary stroke-width-3"
                />
              </div>
            </Link>
          ))}
        </div>
        <Link
          to="/booking-review-changes"
          className="d-flex align-center justify-center fw-600 violet h4 hover-text text-decoration-none mt-7"
        >
          Review your changes
          <ArrowRight2
            size="20"
            fill="currentcolor"
            className="violet stroke-width-3 line-height-0"
          />
        </Link>
        <Link
          to="/booking-payment"
          variant={"primary"}
          className="w-100 d-flex align-center py-2 radius-none mt-7 primary-btn text-decoration-none"
        >
          <div>
            <h4 className="fw-600 white mb-0 text-left">$115</h4>
            <h5 className="fw-500 gray">Amount for changes</h5>
          </div>
          <h4 className="ml-auto fw-600 white mb-0">Pay & send request</h4>
        </Link>
      </section>
    </>
  );
};
export default MyBookingEdit;
