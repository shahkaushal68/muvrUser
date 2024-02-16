import { Steps } from "antd";
import {
  Link,
} from "react-router-dom";
import styles from "./MuvrBookingSteps.module.css";
import { SearchNormal1 } from "iconsax-react";
import {
  MovingLocationStep,
  SelectItemsStep,
  YourVehicleStep,
  RequestFavoriteMuvrsStep,
  DateTimeStep,
  WhatYouMoveStep,
  Payment,
} from "../../components/MuvrBookingSteps";

import { MVHeader, MVIcon } from "../../components";
import { useMuvrBookingStepsHook } from "../../hooks";

const MuvrBookingSteps = () => {

  const { bookingCreateFormData, current, previousStepToCurrent, successResponse } = useMuvrBookingStepsHook();

  //console.log("current------------>", current);

  const steps = [
    {
      title: "Moving locations",
      content: (
        <MovingLocationStep current={current} successResponse={successResponse} bookingCreateFormData={bookingCreateFormData} />
      ),
    },
    {
      title: "Select items",
      content: <SelectItemsStep current={current} successResponse={successResponse} bookingCreateFormData={bookingCreateFormData} />,
    },
    {
      title: "Your vehicle",
      content: <YourVehicleStep current={current} successResponse={successResponse} bookingCreateFormData={bookingCreateFormData} />,
    },
    {
      title: "Request favorite Muvrs",
      content: <RequestFavoriteMuvrsStep current={current} successResponse={successResponse} bookingCreateFormData={bookingCreateFormData} />,
    },
    {
      title: "Date and time",
      content: <DateTimeStep current={current} successResponse={successResponse} bookingCreateFormData={bookingCreateFormData} />,
    },
    {
      title: "What are you moving?",
      content: <WhatYouMoveStep current={current} successResponse={successResponse} bookingCreateFormData={bookingCreateFormData} />,
    },
    {
      title: "Payment",
      content: <Payment current={current} successResponse={successResponse} bookingCreateFormData={bookingCreateFormData} />,
    },
    // {
    //   title: "Select service",
    //   content: <SelectServiceStep current={current} />,
    // },
    // {
    //   title: "Your Muvrs",
    //   content: <YourMuvrsStep current={current} />,
    // },
    // {
    //   title: "Booking options",
    //   content: "Booking options",
    // },
  ];

  const prev = (event) => {
    event?.preventDefault();
    // if (current !== 1) {
    previousStepToCurrent();
    // } else {
    // navigate("/");
    // }
  };

  const items = steps.map((item) => ({
    key: item?.title,
    title: item?.title,
  }));


  return (
    <>
      <MVHeader>
        <div className="position-relative w-100">
          <Link
            to={"#"}
            onClick={(event) => prev(event)}
            className={"positioned-left header-btn"}
          >
            {MVIcon.BackArrow}
          </Link>
          <h3 className="text-center fw-600">{steps[current]?.title}</h3>

          {current === 3 && (
            <button className={"positioned-right header-btn"}>
              <SearchNormal1 variant="Linear" size={24} color="#1d1721" />
            </button>
          )}
        </div>
      </MVHeader>
      <section className="content-full">
        <Steps
          current={current}
          items={items}
          size="small"
          className={styles.muvrSteps}
          progressDot
          responsive={false}
        />
        <div className="content-full">{steps[current]?.content}</div>
        {/* <div>
          {current === steps.length - 1 && (
            <Link
              to="/booking-complete"
              className={`w-100 align-self-end white-hover-text ${styles.stepsBtn}`}
              onClick={() => message.success("Processing complete!")}
            >
              Book Now
            </Link>
          )}
        </div> */}
      </section>
    </>
  );
};

export default MuvrBookingSteps;
