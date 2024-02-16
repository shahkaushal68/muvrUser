import React from "react";
import { Location, Calendar, Clock, Card, Profile, CardTick, CardPos } from "iconsax-react";
import { MVCheckbox } from "../../MVCheckbox/MVCheckbox";
import styles from "./Payment.module.css";
import { usePaymentStepHook } from "../../../hooks";
import { MVButton } from "../../MVButton/MVButton";
import { MVModal } from "../../MVModal/MVModal";
// import { ElementsConsumer, PaymentElement } from "@stripe/react-stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./MVCheckout";
import { formatNumberWithDecimal } from "../../../services";
import moment from "moment";
import OriginMarker from "../../../assets/images/marker/mapPicupIcon.png";
import DestinationMarker from "../../../assets/images/marker/mapDropIcon.png";
import { Image } from "antd";
import { loadStripe } from "@stripe/stripe-js";
import { appConfig } from "../../../config";

const stripePromise = loadStripe(appConfig.STRIPE_PUBLIC_KEY);
export const Payment = ({ successResponse, current }) => {
  const {
    bookingCreateFormData,
    listCardOption,
    // clickOnBookNowButton,
    onChangeCard,
    calculateFinalAmount,
    handleViewPaymentModal,
    viewPaymentModal,
    bookingData,
    handleClosePaymentModal,
  } = usePaymentStepHook(successResponse, current);
  return (
    <>
      <div className="content-full">
        <section className={"main-wrapper"}>
          <div className={styles.paymentDetailsCard}>
            <div className={styles.locationWrap}>
              <div className={styles.locationBg}>
                <Image src={OriginMarker} />
                {/* <Location size="16" color="var(--accent-primary)" variant="Bold" /> */}
              </div>
              <div className="ml-2">
                <h6 className="fw-400 darkgray mb-1">Pickup location</h6>
                <h5 className="fw-500">{bookingCreateFormData?.pickupLocation}</h5>
              </div>
            </div>
            <div className={styles.locationWrap}>
              <div className={styles.locationBg}>
                <Image src={DestinationMarker} />
                {/* <Location size="16" color="var(--accent-primary)" variant="Bold" /> */}
              </div>
              <div className="ml-2">
                <h6 className="fw-400 darkgray mb-1">Drop-off location</h6>
                <h5 className="fw-500">{bookingCreateFormData?.dropoffLocation}</h5>
              </div>
            </div>
            <div className={styles.dateTimeWrap}>
              <span>
                <Calendar size="14" color="var(--clr-darkgray)" variant="Bold" />
              </span>
              <h6 className="fw-400 ml-1">{moment(bookingCreateFormData?.pickupDate)?.format("ll")}</h6>
              <h3 className="lavender ml-3 mr-3">|</h3>
              <span>
                <Clock size="14" color="var(--clr-darkgray)" variant="Bold" />
              </span>
              <h6 className="fw-400 ml-1">{bookingCreateFormData?.pickupTime}</h6>
            </div>
            <div className={styles.priceVehicalItemsCardContainer}>
              <div className={styles.priceVehicalItemsCard}>
                <h6 className="fw-400  darkgray">Price</h6>
                <h5 className="fw-500 green">
                  ${Number(bookingCreateFormData?.amount) > 0 ? formatNumberWithDecimal(Number(bookingCreateFormData?.amount)) : calculateFinalAmount}
                </h5>
              </div>
              <div className={styles.priceVehicalItemsCard}>
                <h6 className="fw-400  darkgray">Vehicle</h6>
                <h5 className="fw-500">{bookingCreateFormData?.vehicle?.name}</h5>
              </div>
              <div className={styles.priceVehicalItemsCard}>
                <h6 className="fw-400  darkgray">No. of items</h6>
                <h5 className="fw-500">{bookingCreateFormData?.bookingItems?.length}</h5>
              </div>
            </div>
          </div>
          <div className={styles.titleSectionWrap}>
            <h2 className="fw-600 mb-3">Muvr Credit</h2>
            <div className={styles.earnedCreditWrap}>
              <h5 className="fw-500 darkgray">Earned Credit</h5>
              <MVCheckbox className={styles.earnedCreditCheckbox}>$0</MVCheckbox>
            </div>
          </div>
        </section>
      </div>

      <MVButton variant="primary" className={`w-100 align-self-end radius-none ${styles.stepsBtn}`} handleClick={() => handleViewPaymentModal()}>
        Book Now
      </MVButton>

      <MVModal title={viewPaymentModal?.modalTitle} open={viewPaymentModal?.isModal} width={400} handleClose={() => handleClosePaymentModal()} centered>
        {}
        <Elements stripe={stripePromise}>
          <CheckoutForm
            amount={calculateFinalAmount}
            currency={"USD"}
            bookingId={bookingCreateFormData?.id}
            bookingData={bookingData}
            modalClose={() => handleClosePaymentModal()}
          />
        </Elements>
      </MVModal>
    </>
  );
};
export default Payment;
