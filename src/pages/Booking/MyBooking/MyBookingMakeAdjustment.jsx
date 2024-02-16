import { Link } from "react-router-dom";
import {
  MVButton,
  MVCollapse,
  MVCounter,
  MVHeader,
  MVIcon,
  MVModal,
  MVRadioBtn,
  MVSelect,
  MVToggleSwitch,
} from "../../../components";
import Microwave from "../../../assets/images/icons/microwave.svg";
import signBoard from "../../../assets/images/icons/exclamation-sign-board.svg";
import styles from "./MyBooking.module.css";
import clsx from "clsx";
import { useState } from "react";
import { Location } from "iconsax-react";
import { PickupLocationDropdownItems } from "../../../constants/data";
import { Space } from "antd";
const MyBookingMakeAdjustment = () => {
  const [
    isMakeAdjustmentConfirmModalOpen,
    setIsMakeAdjustmentConfirmModalOpen,
  ] = useState(false);
  // curbside picup Options start
  const curbsidePicupOptions = [
    {
      label: (
        <>
          <h4 className="fw-500 dark">In-home pickup</h4>
          <p className="fw-400 p-sm darkgray mb-0">
            Your Muvrs will remove and transport your item(s) from inside your
            home.
          </p>
        </>
      ),
      value: "inHomePickup",
    },
    {
      label: (
        <>
          <h4 className="fw-500 dark d-flex align-center">
            Curbside pickup
            <b className="points-dot mx-2"></b>
            <small className="violet p-sm fw-500">$10 discount</small>
          </h4>
          <p className="fw-400 p-sm darkgray mb-0">
            Your Muvrs will pick up your items from outside your home or
            building.{" "}
            <span className="black">
              *You are responsible for placing your item(s) out on the curb or
              driveway and are not required to be present during the pickup.
            </span>
          </p>
        </>
      ),
      value: "curbsidePickup",
    },
  ];
  // curbside picup Options end
  return (
    <>
      <MVHeader>
        <div className="position-relative w-100 d-flex align-center">
          <Link to="/booking-edit" className={"header-btn"}>
            {MVIcon.BackArrow}
          </Link>
          <div className="pl-2 pr-8 d-flex mx-auto">
            <h3 className="fw-500">Make adjustment</h3>
          </div>
        </div>
      </MVHeader>
      <section className="main-wrapper main-wrapper-scroll d-flex flex-column">
        <div className={clsx(styles.addItemsCollapseWrap, "mb-6")}>
          <MVCollapse
            headerTitle={
              <div className="d-flex align-center w-100">Added items</div>
            }
            className={styles.Collapsemy}
          >
            <>
              <h5
                role="button"
                className="fw-500 mb-0 violet ml-auto extra-head-text-collapse cursor-pointer link"
              >
                + Add more items
              </h5>
              <div className={styles.addedItemsContainer}>
                <div className={styles.itemWithCounterWrap}>
                  <div className={styles.addedItemContainer}>
                    <div className={styles.addedItemsbg}>
                      <div className={clsx(styles.addedItemsWrap)}>
                        <img src={Microwave} alt="Microwave" />
                        <div className="new-item-label d-flex align-center justify-center">
                          <span className="fw-600">New</span>
                        </div>
                      </div>
                    </div>
                    <div className={styles.itemTitlePriceWrap}>
                      <h4 className="green fw-600">$60</h4>
                      <div className={styles.itemTitleQuantity}>
                        <h6 className="fw-400 pr-1">Microwave</h6>
                        <span className="lavender mr-1">|</span>
                        <h6 className="fw-400 darkgray">$30 x 2</h6>
                      </div>
                    </div>
                  </div>
                  <MVCounter />
                </div>
                <div className={styles.itemWithCounterWrap}>
                  <div className={styles.addedItemContainer}>
                    <div className={styles.addedItemsbg}>
                      <div className={styles.addedItemsWrap}>
                        <img src={Microwave} alt="Microwave" />
                      </div>
                    </div>
                    <div className={styles.itemTitlePriceWrap}>
                      <h4 className="green fw-600">$60</h4>
                      <div className={styles.itemTitleQuantity}>
                        <h6 className="fw-400 pr-1">Microwave</h6>
                        <span className="lavender mr-1">|</span>
                        <h6 className="fw-400 darkgray">$30 x 2</h6>
                      </div>
                    </div>
                  </div>
                  <MVCounter />
                </div>
              </div>
            </>
          </MVCollapse>
        </div>
        <div className="rounded-detail-box mb-6">
          <h2 className="dark fw-600 mb-0">In-home or Curbside pickup</h2>
          <span className="border-line"></span>
          <Space className="radio-input-label-bottom-borderline">
            <MVRadioBtn options={curbsidePicupOptions} />
            <span className="border-line"></span>
          </Space>
        </div>
        <div className="rounded-detail-box mb-0">
          <div className="d-flex align-center">
            <div className="pr-1">
              <h2 className="dark fw-600 mb-1">Any flights of stairs?</h2>
              <p className="fw-400 mb-0 darkgray">
                A flight of stairs is 6 or more steps inside or outside your
                home
              </p>
            </div>
            <div className="ml-auto flex-0-auto">
              <MVToggleSwitch
                defaultValue="yes"
                buttonStyle="solid"
                value0="yes"
                value1="no"
                name0="Yes"
                name1="No"
                className=""
              />
            </div>
          </div>
          <div className="mt-5 mb-3">
            <MVCounter />
          </div>
          <p className="fw-400 mb-0 darkgray text-center mb-2">
            $20/flight of stairs
          </p>
        </div>
        <div className={clsx(styles.addItemsCollapseWrap, "mb-6")}>
          <MVCollapse
            headerTitle={
              <div className="d-flex align-center w-100">
                Any items require disassembly?
              </div>
            }
            className={styles.Collapsemy}
          >
            <>
              {/* <h5 className="fw-500 mb-0 violet ml-auto extra-head-text-collapse">
                + Add more items
              </h5> */}
              <div className="extra-head-text-collapse extra-yes-no-head-text-collapse mv-collapse-less-space-switch">
                <MVToggleSwitch
                  defaultValue="yes"
                  buttonStyle="solid"
                  value0="yes"
                  value1="no"
                  name0="Yes"
                  name1="No"
                  className=""
                />
              </div>
              <div className={styles.addedItemsContainer}>
                <div className={styles.itemWithCounterWrap}>
                  <div className={styles.addedItemContainer}>
                    <div className={styles.addedItemsbg}>
                      <div className={styles.addedItemsWrap}>
                        <img src={Microwave} alt="Microwave" />
                      </div>
                    </div>
                    <div className={styles.itemTitlePriceWrap}>
                      <h4 className="green fw-600">$60</h4>
                      <div className={styles.itemTitleQuantity}>
                        <h6 className="fw-400 pr-1">Mattress</h6>
                      </div>
                    </div>
                  </div>
                  <MVCounter />
                </div>
                <div className={styles.itemWithCounterWrap}>
                  <div className={styles.addedItemContainer}>
                    <div className={styles.addedItemsbg}>
                      <div className={styles.addedItemsWrap}>
                        <img src={Microwave} alt="Microwave" />
                      </div>
                    </div>
                    <div className={styles.itemTitlePriceWrap}>
                      <h4 className="green fw-600">$40</h4>
                      <div className={styles.itemTitleQuantity}>
                        <h6 className="fw-400 pr-1">Recliner</h6>
                      </div>
                    </div>
                  </div>
                  <MVCounter />
                </div>
              </div>
            </>
          </MVCollapse>
        </div>
        <div className="rounded-detail-box mb-6">
          <div
            className={clsx(
              styles.donationLocakationFlex,
              "d-flex align-center"
            )}
          >
            <div className="pr-1">
              <h2 className="dark fw-600 mb-1">
                If possible, would you like us to donate your items?
              </h2>
              <p className="fw-400 mb-0 darkgray">
                We do our best to coordinate donation of your items with the
                charity of your choice
              </p>
            </div>
            <div className="ml-auto flex-0-auto">
              <MVToggleSwitch
                defaultValue="yes"
                buttonStyle="solid"
                value0="yes"
                value1="no"
                name0="Yes"
                name1="No"
                className=""
              />
            </div>
          </div>
          <span className="border-line"></span>
          <div className={"mb-4"}>
            <MVSelect
              id={"mv-select"}
              defaultValue={"Select a charity location"}
              label={
                <>
                  Donation location
                  <span className="violet pl-1">(Optional)</span>
                </>
              }
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
        </div>
        <div className="mt-auto">
          <Link
            to="/booking-make-adjustment"
            role="button"
            variant={"primary"}
            className="w-100 primary-btn"
            onClick={({}) => setIsMakeAdjustmentConfirmModalOpen(true)}
          >
            Save changes
          </Link>
        </div>
      </section>
      {/* changes modal start */}
      <MVModal
        title="This is a modal title"
        open={isMakeAdjustmentConfirmModalOpen}
        width={500}
        handleClose={() => setIsMakeAdjustmentConfirmModalOpen(false)}
        centered
        confirmationModal
        className={"remove-close-icon"}
      >
        <div>
          <div className="d-flex align-center justify-center mb-6">
            <img src={signBoard} alt="sign board" />
          </div>
          <div className="mb-3">
            <h4 className="fw-500 mb-1">Add items</h4>
            <p className="p-sm fw-400 darkgray">
              If you add any additional items to your order, we will confirm
              with your Muvrs first. If they deny the item adjustment, your
              order will be assigned to other Muvrs.s
            </p>
          </div>
          <div className="mb-3">
            <h4 className="fw-500 mb-1">Remove items</h4>
            <p className="p-sm fw-400 darkgray">
              If an item is removed, you will receive a refund for that specific
              item within 24 hours.
            </p>
          </div>
          <div className="mb-3">
            <h4 className="fw-500 mb-1">Pay to confirm</h4>
            <p className="p-sm fw-400 darkgray">
              If you decide to add items, you will be prompted to pay an
              additional amount to confirm your edited order.
            </p>
          </div>
          <div className="d-flex align-center justify-between space-gap-8 w-100 mt-6">
            <MVButton
              variant={"secondary"}
              className="w-50"
              handleClick={() => setIsMakeAdjustmentConfirmModalOpen(false)}
            >
              Not now
            </MVButton>
            <Link
              to="/booking-edit"
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
export default MyBookingMakeAdjustment;
