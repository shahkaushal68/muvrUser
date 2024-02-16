import { Link } from "react-router-dom";
import { MVHeader, MVIcon, MVTextArea } from "../../../components";
import styles from "./MyBooking.module.css";
import clsx from "clsx";
import { MVImageUploadGallary } from "../../../components/MVImageUploadGallary/MVImageUploadGallary";
const MyBookingMakeAdjustment = () => {
  return (
    <>
      <MVHeader>
        <div className="position-relative w-100 d-flex align-center">
          <Link to="/booking-edit" className={"header-btn"}>
            {MVIcon.BackArrow}
          </Link>
          <div className="pl-2 pr-8 d-flex mx-auto">
            <h3 className="fw-500">What are you moving?</h3>
          </div>
        </div>
      </MVHeader>
      <section className="main-wrapper main-wrapper-scroll d-flex flex-column">
        <h2 className="fw-600">Special instructions</h2>
        <div className="w-100 mt-3">
          <MVTextArea
            label={
              <span className="accent-primary fw-500 p-sm">
                Share instructions with your Muvrs
              </span>
            }
            placeholder={""}
            className="w-100"
          />
        </div>
        <div className="mt-6">
          <h2 className="fw-600">Add images</h2>
          <MVImageUploadGallary />
        </div>
        <div className="mt-auto">
          <Link
            to="/booking-edit"
            role="button"
            variant={"primary"}
            className="w-100 primary-btn"
          >
            Save changes
          </Link>
        </div>
      </section>
    </>
  );
};
export default MyBookingMakeAdjustment;
