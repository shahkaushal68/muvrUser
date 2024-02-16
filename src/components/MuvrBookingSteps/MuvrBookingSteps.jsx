import { useState } from "react";
import { message, Steps, theme } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { MVHeader, MVIcon } from "../../components/";
import {
  SelectItemsStep,
  MovingLocationStep,
  WhatYouMoveStep,
  DateTimeStep,
  YourVehicleStep,
  RequestFavoriteMuvrsStep,
  SelectServiceStep,
  YourMuvrsStep,
  BookingOptions,
  OrderDetails,
} from "../MuvrBookingSteps/";
import { SearchNormal1 } from "iconsax-react";
import Payment from "./Payment/Payment";
import styles from "./MuvrBookingSteps.module.css";

const MuvrBookingSteps = () => {
  const steps = [
    {
      title: "Moving locations",
      content: <MovingLocationStep current={current} setCurrent={setCurrent} />,
    },
    {
      title: "Select items",
      content: <SelectItemsStep current={current} setCurrent={setCurrent} />,
    },
    {
      title: "Your vehicle",
      content: <YourVehicleStep current={current} setCurrent={setCurrent} />,
    },
    {
      title: "Request favorite Muvrs",
      content: (
        <RequestFavoriteMuvrsStep current={current} setCurrent={setCurrent} />
      ),
    },
    {
      title: "Date and time",
      content: <DateTimeStep current={current} setCurrent={setCurrent} />,
    },
    {
      title: "What are you moving?",
      content: <WhatYouMoveStep current={current} setCurrent={setCurrent} />,
    },
    {
      title: "Payment",
      content: <Payment current={current} setCurrent={setCurrent} />,
    },
    {
      title: "Select service",
      content: <SelectServiceStep current={current} setCurrent={setCurrent} />,
    },
    {
      title: "Your Muvrs",
      content: <YourMuvrsStep current={current} setCurrent={setCurrent} />,
    },
    {
      title: "Booking options",
      content: <BookingOptions current={current} setCurrent={setCurrent} />,
    },
    {
      title: "Order details",
      content: <OrderDetails current={current} setCurrent={setCurrent} />,
    },
  ];

  const { token } = theme.useToken();

  const [path, setPath] = useState(null);
  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    if (current !== 0) {
      setCurrent(current - 1);
    } else {
      navigate("/");
    }
  };

  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));
  const contentStyle = {
    marginTop: 0,
    height: "calc(100vh - 52px)",
    overflowY: "auto",
  };
  return (
    <>
      <MVHeader>
        <div className="position-relative w-100">
          <Link
            to={path}
            onClick={() => prev()}
            className={"positioned-left header-btn"}
          >
            {MVIcon.BackArrow}
          </Link>
          <h3 className="text-center fw-600">{steps[current].title}</h3>

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
        {steps[current].content}
      </section>
    </>
  );
};

export default MuvrBookingSteps;
