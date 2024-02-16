import { MVBookingCard } from "../../../../components/MVBookingCard/MVBookingCard";
import { Link } from "react-router-dom";
import { InfoCircle } from "iconsax-react";
import styles from "./../MyBooking.module.css";
import { MVIcon } from "../../../../components";
import { MVTooltip } from "../../../../components/MVTooltip/MVTooltip";
import moment from "moment/moment";
import { formatNumberWithDecimal } from "../../../../services";

export const MBMovesContent = ({ bookingList, activeDateType }) => {
  return (
    <>
      <section className="pt-4">
        {bookingList?.map((bookingItem, bookingIndex) => {
          let bookingImages = bookingItem?.bookingMuvrs?.map((imageItem) => {
            return imageItem?.user?.profile_image;
          });
          let muvrname =
            bookingItem?.bookingMuvrs?.length > 0
              ? bookingItem?.bookingMuvrs
                  ?.map((muvrItem) => {
                    return muvrItem?.user?.first_name;
                  })
                  .join(" & ")
              : "Muvrs yet to assign";
          const vehicle_price = bookingItem?.vehicle?.base_price;
          const mile_price = bookingItem?.vehicle?.per_miles * bookingItem?.distance;
          const stair_price = bookingItem?.stairs_price * bookingItem?.no_of_stairs;

          const totalAmount = bookingItem?.bookingItems?.reduce((currentValue, bookingItems) => {
            let sum = (Number(bookingItems?.price) || 0) * Number(bookingItems?.quantity);
            return Number(currentValue || 0) + sum;
          }, 0);
          const totalSum = Number(vehicle_price) + Number(mile_price) + totalAmount + Number(stair_price);

          const ratingReview = bookingItem?.bookingMuvrs?.length > 0 && bookingItem?.bookingMuvrs?.every((item) => item?.review === null);
          const isCall = bookingItem?.isCall && bookingItem?.isChat ? true : false;
          return (
            <MVBookingCard
              activeDateType={activeDateType}
              id={bookingItem?.id}
              key={`booking_${bookingIndex}`}
              userImage={bookingImages}
              title={bookingItem?.pickup_date ? `${moment(bookingItem?.pickup_date).format("MMM DD")}, ${bookingItem?.vehicle?.name}` : ""}
              name={muvrname}
              price={`$${formatNumberWithDecimal(Number(bookingItem?.amount > 0 || totalSum ? (bookingItem?.amount > 0 ? bookingItem?.amount : totalSum) : 0))}`}
              isRequestTrue={bookingItem?.status !== "COMPLETED" ? bookingItem?.status : ""}
              requestText={`${bookingItem?.status !== "CANCEL_BOOKING" ? "Request" : ""} ${
                bookingItem?.status === "ACCEPTED_REQUEST" ? "Accepted" : bookingItem?.status === "PENDING" ? "Pending" : bookingItem?.status === "CANCEL_BOOKING" && "Cancelled"
              }`}
              isRequestAccepted={bookingItem?.status === "ACCEPTED_REQUEST" ? true : false}
              actions={
                <>
                  {bookingItem?.bookingMuvrs?.length > 0 ? (
                    activeDateType === "upcoming" ? (
                      <div className="d-grid align-center user-card-body-footer-grid">
                        <Link to="/" className={`${isCall ? "violet" : "darkgray"} fw-500 h6 cursor-pointer`}>
                          Call
                        </Link>
                        <Link to="/inbox" className={`${isCall ? "violet" : "darkgray"} fw-500 h6 cursor-pointer border-x`}>
                          Chat
                        </Link>
                        <Link to="/" className={`${!bookingList?.delivery_status ? "darkgray" : "violet"} fw-500 h6 cursor-pointer`}>
                          Track
                          {!bookingList?.delivery_status && (
                            <MVTooltip
                              trigger={"hover"}
                              content={<div className="w-100">You can track your mover only when they start their journey towards your location.</div>}
                              className={styles.trackTooltip}
                              overlayClassName={styles.trackTooltipData}
                              placement={"topLeft"}
                            >
                              <InfoCircle size="20" fill="currentColor" variant="Bold" className="darkgray ml-1 line-height-0" />
                            </MVTooltip>
                          )}
                        </Link>
                      </div>
                    ) : (
                      activeDateType === "past" &&
                      (bookingItem?.status !== "CANCEL_BOOKING" ? (
                        <div className="d-grid align-center user-card-body-footer-grid user-card-body-footer-grid-2">
                          {ratingReview ? (
                            <Link to={`/booking-details/${bookingItem?.id}?dateType=past`} className="violet fw-500 h6 cursor-pointer">
                              Rate
                            </Link>
                          ) : (
                            <div className="w-100 d-flex align-center">
                              {bookingItem?.bookingMuvrs?.map((muvrReview, muvrIndex) => {
                                return muvrReview?.review?.rating ? (
                                  <>
                                    {muvrIndex - 1 >= 0 && <b className="points-dot mx-2"></b>}
                                    <div className="d-flex align-center">
                                      <span className="orange line-height-0">{MVIcon.starIcon}</span>
                                      <h5 className="mb-0 black fw-500 pl-1 line-height-0">{muvrReview?.review?.rating}</h5>
                                    </div>
                                  </>
                                ) : (
                                  ""
                                );
                              })}
                            </div>
                          )}
                          <Link to="/" className="violet fw-500 h6 cursor-pointer border-x">
                            Book again
                          </Link>
                        </div>
                      ) : (
                        <p className="darkgray fw-400 p-sm text-center">Refund will be transfer within 24hrs </p>
                      ))
                    )
                  ) : (
                    activeDateType !== "draft" && (
                      <>
                        <p className="darkgray fw-400 p-sm text-center">
                          {activeDateType === "past" && bookingItem?.status === "CANCEL_BOOKING"
                            ? "Refund will be transfer within 24hrs "
                            : "We'll inform you once Muvrs are assigned"}
                        </p>
                      </>
                    )
                  )}
                  {activeDateType === "draft" && (
                    <div className={`d-grid align-center ${bookingItem?.step === 7 ? "user-card-body-footer-grid user-card-body-footer-grid-2" : styles.draftEditContent}`}>
                      <Link to={`/booking-steps?bookingId=${bookingItem?.id}`} className="violet fw-500 h6 cursor-pointer">
                        Edit
                      </Link>
                      {bookingItem?.step === 7 && (
                        <Link to={`/booking-steps?bookingId=${bookingItem?.id}`} className="violet fw-500 h6 cursor-pointer border-x">
                          Make payment
                        </Link>
                      )}
                    </div>
                  )}
                </>
              }
            />
          );
        })}
      </section>
    </>
  );
};
