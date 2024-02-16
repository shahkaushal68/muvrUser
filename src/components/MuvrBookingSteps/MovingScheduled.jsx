import React from "react";
import greenTick from "../../assets/images/icons/green-tick-big.svg";
import Truck from "../../assets/images/covers/truck.png";
import { Link } from "react-router-dom";
import { ArrowRight2 } from "iconsax-react";
import styles from "./MuvrBookingSteps.module.css";

const MovingScheduled = () => {
  return (
    <>
      <section className="content-full">
        <div className={styles.greenTick}>
          <img src={greenTick} alt="greenTick" />
        </div>
        <h2 className="fw-600 text-center mb-2">Your move is scheduled!</h2>
        <h5 className="darkgray fw-500 text-center">
          Your booking for MuvrXL is successfully scheduled for April 12 Between 8:00 AM - 10:00 AM
        </h5>
        <div>
          <div className={styles.vehicleImg}>
            <img src={Truck} alt="Truck" />
          </div>
          <h4 className="fw-500 text-center">MuvrXL</h4>
          <h5 className="darkgray fw-500 text-center mt-2">
            We will notify you when a Muvr is assigned to your booking and on the way to the pickup location.
          </h5>
        </div>
        <div className={styles.viewBookingBookMuvrLinkWrap}>
          <Link
            to={"/"}
            className="link link-primary fw-600 d-flex align-center justify-center"
          >
            View booking details <ArrowRight2 size="20" color="currentcolor" />
          </Link>
          <Link
            to={"/"}
            className="link link-primary fw-600 d-flex align-center justify-center"
          >
            Book a new Muvr <ArrowRight2 size="20" color="currentcolor" />
          </Link>
        </div>
      </section>
    </>
  );
};

export default MovingScheduled;
