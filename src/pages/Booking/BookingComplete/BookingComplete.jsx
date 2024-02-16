import React from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowRight2 } from "iconsax-react";
import { MVscheduled } from "./MVscheduled";
import { MVPingMuvers } from "./MVPingMuvers";
import greenTick from "../../../assets/images/icons/green-tick-big.svg";
import "./BookingComplete.css";
import { useSelector } from "react-redux";
import moment from "moment";

export const BookingComplete = () => {
  const location = useLocation();
  const { bookingCreateFormData } = useSelector((state) => state?.bookingReducer);
  console.log(bookingCreateFormData);
  const roundedDetailsBoxStyle = {
    marginTop: "48px",
  };
  return (
    <>
      <section className="content-full main-wrapper">
        {location?.state?.fromBooking === false ? (
          <div className="w-100">
            <div className="green-tick">
              <img src={greenTick} alt="greenTick" />
            </div>
            <h2 className="fw-600 text-center mb-2">Request sent to Muvrs</h2>
            <h5 className="darkgray fw-500 text-center">We have sent a request to your favorite Muvrs. Once they accept your request, we will inform you.</h5>
            <h2 className="fw-600 text-left mb-2" style={roundedDetailsBoxStyle}>
              Ping your Muvrs
            </h2>
            <MVPingMuvers muvrInfo={bookingCreateFormData?.bookingMuvrs} />
          </div>
        ) : (
          <MVscheduled
            pickUpDate={moment(bookingCreateFormData?.pickupDate).format("MMMM DD")}
            pickUpTime={bookingCreateFormData?.pickupTime}
            vehicleName={bookingCreateFormData?.vehicle?.name}
          />
        )}

        <div className="view-bookingbook-muvrlink-wrap">
          <Link to={`/booking-details/${bookingCreateFormData?.id}`} className="link link-primary fw-600 d-flex align-center justify-center">
            View booking details <ArrowRight2 size="20" color="currentcolor" />
          </Link>
          <Link to={"/"} className="link link-primary fw-600 d-flex align-center justify-center">
            Book a new Muvr <ArrowRight2 size="20" color="currentcolor" />
          </Link>
        </div>
      </section>
    </>
  );
};

export default BookingComplete;
