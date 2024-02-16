import { Link } from "react-router-dom";
import { MVCalendar, MVHeader, MVIcon, MVRadioBtn } from "../../../components";
import { Radio } from "antd";
import styles from "./MyBooking.module.css";
const MyBookingReschedule = (options_date, options_time) => {
  options_date = [
    {
      label: "Previous date",
      value: "Previous date",
    },
    {
      label: "Current date",
      value: "Current date",
    },
  ];
  options_time = [
    {
      label: "Previous time slot",
      value: "Previous time slot",
    },
    {
      label: "Current time slot",
      value: "Current time slot",
    },
  ];
  return (
    <>
      <MVHeader>
        <div className="position-relative w-100 d-flex align-center">
          <Link to="/booking-edit" className={"header-btn"}>
            {MVIcon.BackArrow}
          </Link>
          <div className="pl-2 pr-8 d-flex mx-auto">
            <h3 className="fw-500">Reschedule</h3>
          </div>
        </div>
      </MVHeader>
      <section className="main-wrapper main-wrapper-scroll d-flex flex-column">
        <div className="w-100">
          <h2 className="fw-600">Pickup date</h2>
          <div className="mt-3">
            <MVCalendar />
          </div>
          <div className="mt-6">
            <MVRadioBtn
              options={options_date}
              className={
                "radio-label-auto d-flex align-center flex-wrap space-gap-8 justify-center"
              }
            />
          </div>
        </div>
        <div className="w-100 mt-6">
          <h2 className="fw-600">Pickup between</h2>
          <div className="mt-3 custom-radio-style pickup-between-grid">
            <Radio.Group defaultValue="c" className="d-grid">
              <Radio.Button
                value="a"
                className="d-flex align-center justify-center fw-500 darkgray round-30"
              >
                8 AM - 10 AM
              </Radio.Button>
              <Radio.Button
                value="b"
                className="d-flex align-center justify-center fw-500 darkgray round-30"
              >
                10 AM - 12 PM
              </Radio.Button>
              <Radio.Button
                value="c"
                className="d-flex align-center justify-center fw-500 darkgray round-30"
              >
                12 PM - 2 PM
              </Radio.Button>
              <Radio.Button
                value="d"
                className="d-flex align-center justify-center fw-500 darkgray round-30"
              >
                2 PM - 4 PM
              </Radio.Button>
              <Radio.Button
                value="e"
                className="d-flex align-center justify-center fw-500 darkgray round-30"
              >
                4 PM - 6 PM
              </Radio.Button>
              <Radio.Button
                value="f"
                className="d-flex align-center justify-center fw-500 darkgray round-30"
              >
                6 PM - 8 PM
              </Radio.Button>
            </Radio.Group>
          </div>
          <div className="mt-6">
            <MVRadioBtn
              options={options_time}
              className={
                "radio-label-auto d-flex align-center flex-wrap space-gap-8 justify-center"
              }
            />
          </div>
        </div>
        <div className="mt-auto pt-6">
          <Link
            to="/booking-edit"
            role="button"
            variant={"primary"}
            className="w-100 primary-btn text-decoration-none"
          >
            Save changes
          </Link>
        </div>
      </section>
    </>
  );
};
export default MyBookingReschedule;
