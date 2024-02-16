import { Link } from "react-router-dom";
import {
  MVButton,
  MVHeader,
  MVIcon,
  MVModal,
  MVSelect,
} from "../../../components";
import { Location } from "iconsax-react";
import clsx from "clsx";
import {
  PickupLocationDropdownItems,
  dropOffLocationDropdownItems,
} from "../../../constants/data";
import signBoard from "../../../assets/images/icons/exclamation-sign-board.svg";
import styles from "./MyBooking.module.css";
import { useState } from "react";

const MyBookingLocations = () => {
  const [isChangesBookingModalOpen, setIsChangesBookingModalOpen] =
    useState(false);
  return (
    <>
      <MVHeader>
        <div className="position-relative w-100 d-flex align-center">
          <Link to="/booking-edit" className={"header-btn"}>
            {MVIcon.BackArrow}
          </Link>
          <div className="pl-2 pr-8 d-flex mx-auto">
            <h3 className="fw-500">Locations</h3>
          </div>
        </div>
      </MVHeader>
      <section className="main-wrapper main-wrapper-scroll py-0 px-0 d-flex flex-column">
        <div className={clsx(styles.locationMapCol, "")}>
          {/* do use this space is add to maping area start */}
          {/* do use this space is add to maping area end */}
        </div>
        <div className={clsx(styles.locationDropdownCol, "mt-auto px-4 pt-4")}>
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
          <MVButton
            variant={"primary"}
            className="w-100 mt-2"
            handleClick={() => setIsChangesBookingModalOpen(true)}
          >
            Save changes
          </MVButton>
        </div>
      </section>
      {/* changes modal start */}
      <MVModal
        title="This is a modal title"
        open={isChangesBookingModalOpen}
        width={500}
        handleClose={() => setIsChangesBookingModalOpen(false)}
        centered
        confirmationModal
        className={"remove-close-icon"}
      >
        <div>
          <div className="d-flex align-center justify-center mb-6">
            <img src={signBoard} alt="sign board" />
          </div>
          <div className="mb-3">
            <h4 className="fw-500 mb-1">Changes in distance</h4>
            <p className="p-sm fw-400 darkgray">
              If you change your order's pickup and drop-off locations, we will
              verify with your assigned Muvrs. If they decline the changes, we
              will assign other Muvrs
            </p>
          </div>
          <div className="mb-3">
            <h4 className="fw-500 mb-1">Pay to confirm</h4>
            <p className="p-sm fw-400 darkgray">
              If your new location is further than the previous one, you'll need
              to pay an extra amount to confirm your order
            </p>
          </div>
          <div className="d-flex align-center justify-between space-gap-8 w-100 mt-6">
            <MVButton
              variant={"secondary"}
              className="w-50"
              handleClick={() => setIsChangesBookingModalOpen(false)}
            >
              Not now
            </MVButton>
            <Link
              to="/booking-pickup"
              role="button"
              variant={"primary"}
              className="w-50 primary-btn"
            >
              Confirm
            </Link>
          </div>
        </div>
      </MVModal>
      {/* changes modal end */}
    </>
  );
};
export default MyBookingLocations;
