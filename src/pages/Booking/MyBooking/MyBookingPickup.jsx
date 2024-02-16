import { Link } from "react-router-dom";
import { MVButton, MVHeader, MVIcon, MVSelect } from "../../../components";
import { Location } from "iconsax-react";
import clsx from "clsx";
import {
  PickupLocationDropdownItems,
  dropOffLocationDropdownItems,
} from "../../../constants/data";
import styles from "./MyBooking.module.css";

const MyBookingPickup = () => {
  return (
    <>
      <MVHeader>
        <div className="position-relative w-100 d-flex align-center">
          <Link to="/booking-location" className={"header-btn"}>
            {MVIcon.BackArrow}
          </Link>
          <div className="pl-2 pr-8 d-flex mx-auto">
            <h3 className="fw-500">Pickup</h3>
          </div>
        </div>
      </MVHeader>
      <section className="main-wrapper main-wrapper-scroll pb-0 px-0 d-flex flex-column">
        <div className={clsx(styles.picupDropdownCol, "px-4")}>
          <div className={"mb-4"}>
            <MVSelect
              id={"mv-select"}
              defaultValue={"New York, NY, USA"}
              label="Pickup location"
              labelClass="fw-500"
              prefix={
                <>
                  <div className="select-ico-round-box d-flex align-center justify-center">
                    <Location
                      variant="Bold"
                      size={20}
                      color="var(--accent-primary)"
                    />
                  </div>
                </>
              }
              options={PickupLocationDropdownItems}
            />
          </div>
          <div className={"mb-4"}>
            <MVSelect
              id={"mv-select"}
              defaultValue={"Select end point"}
              label="Drop-off location"
              labelClass="fw-500"
              prefix={
                <>
                  <div
                    className="
                    select-ico-round-box d-flex align-center justify-center"
                  >
                    <Location
                      variant="Bold"
                      size={20}
                      color="var(--accent-primary)"
                    />
                  </div>
                </>
              }
              options={dropOffLocationDropdownItems}
            />
          </div>
          {/* <MVButton
            variant={"primary"}
            className="w-100 mt-2"
            handleClick={() => setIsChangesBookingModalOpen(true)}
          >
            Save changes
          </MVButton> */}
        </div>
        <div className={clsx(styles.picupMapCol, "mt-auto position-relative")}>
          {/* do use this space is add to maping area start */}
          {/* do use this space is add to maping area end */}
          <div
            className={clsx(
              styles.confirmLocationWrap,
              "px-4 position-sticky w-100"
            )}
          >
            <Link
              to="/booking-location"
              role="button"
              variant={"primary"}
              className="w-100 primary-btn"
            >
              Confirm location
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};
export default MyBookingPickup;
