import clsx from "clsx";
import { Link, useNavigate } from "react-router-dom";
import { MVAvatar } from "../MVAvatar/MVAvatar";
import MVCounter from "../MVCounter/MVCounter";
import { MVIcon } from "../MVIcon/MVIcon";
import { MVRadioBtn } from "../MVRadioBtn/MVRadioBtn";
import { MVToggle } from "../MVToggle/MVToggle";
import { MVToggleSwitch } from "../MVToggleSwitch/MVToggleSwitch";
import Microwave from "../../assets/images/icons/microwave.svg";
import { MVSelect } from "../MVSelect/MVSelect";
import { Location } from "iconsax-react";
import { styleguideSelectOptions } from "../../constants/data";
import styles from "./MuvrBookingSteps.module.css";
import { useState } from "react";
import { MVButton } from "../MVButton/MVButton";
import { MVModal } from "../MVModal/MVModal";
import signBoard from "../../assets/images/icons/exclamation-sign-board.svg";

export const OrderDetails = ({ current, setCurrent }) => {
  const [isRequestFavoriteMuvrModalOpen, setIsRequestFavoriteMuvrModalOpen] = useState(false);
  const navigate = useNavigate();

  const OrderDetailsOptions = [
    {
      label: (
        <>
          <h4 className="fw-500">In-home pickup</h4>
          <h6 className="fw-400 darkgray">Your Muvrs will remove and transport your item(s) from inside your home.</h6>
        </>
      ),
      value: "In-home pickup",
    },

    {
      label: (
        <>
          <div className={styles.curbsideTitleWrap}>
            <h4 className="fw-500 mb-0">Curbside pickup</h4>
            <div className={styles.purpleDot}></div>
            <h6 className="fw-400 accent-primary mb-0">$10 discount</h6>
          </div>
          <h6 className="fw-400 darkgray mb-0">
            Your Muvrs will pick up your items from outside your home or building.{" "}
            <span className="black">
              {" "}
              *You are responsible for placing your item(s) out on the curb or driveway and you are not required to be
              present during the pickup.
            </span>
          </h6>
        </>
      ),
      value: "Curbside pickup",
    },
  ];
  return (
    <>
      <div className="content-full">
        <section className="main-wrapper">
          <div className="rounded-detail-box">
            <div className="d-flex align-center mb-3">
              <div className="pr-1">
                <h2 className="dark fw-600 mb-1">1 Muvr (I'll Help)</h2>
                <h5 className="fw-600 mb-0 gradiant-text-color">Get 35% Off</h5>
              </div>
              <div className="ml-auto flex-0-auto">
                <MVToggle className="green-switch-color" />
              </div>
            </div>
            <p className="fw-400 mb-0 darkgray">
              You can get 35% off on your booking but make sure you are ready to help other muvr
            </p>
          </div>
          <div className="rounded-detail-box">
            <h4 className={clsx(styles.cardTitle, "fw-600")}>Selected Muvrs</h4>
            <div className={clsx(styles.selectMuvrCard, styles.yourVehicleCard)}>
              <div className={"d-flex align-center pr-2"}>
                <MVAvatar src={"https://i.pravatar.cc/300"} alt="User Name" size={44} className={"flex-0-auto"} />
                <div className="ml-2">
                  <h5 className="fw-400 mb-1">John smith</h5>
                  <h5 className="fw-400 darkgray">Driver</h5>
                </div>
              </div>
              <Link className="link link-primary fw-bold" onClick={() => setIsRequestFavoriteMuvrModalOpen(true)}>
                Change
              </Link>
            </div>
            <div className={clsx(styles.selectMuvrCard, styles.yourVehicleCard)}>
              <div className={"d-flex align-center pr-2"}>
                <MVAvatar src={"https://i.pravatar.cc/300"} alt="User Name" size={44} className={"flex-0-auto"} />
                <div className="ml-2">
                  <h5 className="fw-400 mb-1">John smith</h5>
                  <h5 className="fw-400 darkgray">Driver</h5>
                </div>
              </div>
              <div className="d-flex">
                <Link className="link link-primary fw-bold">Change</Link>
                <Link className="link link-darkgray fw-bold ml-3">{MVIcon.crossSmall}</Link>
              </div>
            </div>
          </div>
          <div className="rounded-detail-box">
            <h4 className={clsx(styles.pickupDetails, "fw-600")}>In-home or Curbside pickup</h4>
            <div>
              <MVRadioBtn options={OrderDetailsOptions} className={styles.orderDetailsRadio} />
            </div>
          </div>
          <div className="rounded-detail-box">
            <div className="d-flex mb-3">
              <div className="pr-1">
                <h2 className="dark fw-600 mb-1">Any flights of stairs?</h2>
                <p className="fw-400 mb-0 darkgray">
                  A flight of stairs is 6 or more steps inside or outside your home
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
            <div className="mb-3">
              <MVCounter />
            </div>
            <p className="fw-400 mb-0 darkgray text-center mb-2">$20/flight of stairs</p>
          </div>
          <div className="rounded-detail-box">
            <div className={styles.itemsRequireWrap}>
              <div className="pr-1">
                <h4 className="dark fw-600 mb-1">Any items require disassembly?</h4>
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
                      <h6 className="fw-400 pr-1">Microwave</h6>
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
                    </div>
                  </div>
                </div>
                <MVCounter />
              </div>
            </div>
          </div>
          <div className="rounded-detail-box">
            <div className={clsx("d-flex pb-2", styles.donateTitle)}>
              <div className="pr-1">
                <h4 className="dark fw-600 mb-1">If possible, would you like us to donate your items?</h4>
                <p className="fw-400 mb-0 darkgray">
                  We do our best to coordinate donation of your items with the charity of your choice
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
            <div className="mt-3">
              <MVSelect
                id={"mv-select"}
                defaultValue={"Select a charity location"}
                label={
                  <>
                    Donation location <span className="accent-primary">(optional)</span>
                  </>
                }
                prefix={
                  <div className={styles.roundBg}>
                    <Location size="16" color="var(--accent-primary)" variant="Bold" />
                  </div>
                }
                options={styleguideSelectOptions}
              />
            </div>
          </div>
        </section>

        <MVModal
          title="This is a modal title"
          open={isRequestFavoriteMuvrModalOpen}
          width={500}
          handleClose={() => setIsRequestFavoriteMuvrModalOpen(false)}
          centered
          confirmationModal
          className={styles.requestFavoriteMuvrModal}
        >
          <div>
            <div className="d-flex align-center justify-center mb-6">
              <img src={signBoard} alt="sign board" />
            </div>
            <h4 className="fw-500 mb-5">
              In order to select the 1 Muvr (I'll Help) option, you need to remove your helper. Click remove to select
              this option.
            </h4>
            <div className={clsx(styles.selectMuvrCard, "mb-6")}>
              <div className={"d-flex align-center pr-2"}>
                <MVAvatar src={"https://i.pravatar.cc/300"} alt="User Name" size={44} />
                <div className="ml-2">
                  <h5 className="fw-400 mb-1">John smith</h5>
                  <h5 className="fw-400 darkgray">Driver</h5>
                </div>
              </div>
            </div>
            <div className={styles.confirmNotnowBtn}>
              <MVButton
                variant={"secondary"}
                className="w-100 mr-2"
                handleClick={() => setIsRequestFavoriteMuvrModalOpen(false)}
              >
                Not now
              </MVButton>
              <MVButton variant={"primary"} className="w-100">
                Remove
              </MVButton>
            </div>
          </div>
        </MVModal>
      </div>
      <MVButton
        variant="primary"
        className={`w-100 align-self-end radius-none ${styles.stepsBtn}`}
        handleClick={() => {
          current === 10 ? navigate("/booking-complete") : setCurrent(current + 1);
        }}
      >
        Next
      </MVButton>
    </>
  );
};
