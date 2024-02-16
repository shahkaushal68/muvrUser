import { Link } from "react-router-dom";
import { MVHeader, MVCollapse, MVIcon, MVModal, MVButton, MVRadioBtn, MVTextArea, MVAvatar, MVCheckbox, MVTextInput } from "../../../components";
import clsx from "clsx";
import { Checkbox, Dropdown, Image, Radio, Rate } from "antd";
import { ArrowRight2, Calendar, Clock, DollarCircle, GalleryAdd, Heart, Location, User, Image as Img, Truck, Box } from "iconsax-react";
import bigCloseIcon from "./../../../assets/images/icons/big-close-icon.svg";
import { MVPingMuvers } from "../BookingComplete/MVPingMuvers";
import { MVmuvrNameCard } from "../BookingComplete/MVmuvrNameCard";
import { MVTrackMuvers } from "../BookingComplete/MVTrackMuvers";
import { MVDriverLikeCard } from "../../../components/MVDriverLikeCard/MVDriverLikeCard";
import OriginMarker from "../../../assets/images/marker/mapPicupIcon.png";
import DestinationMarker from "../../../assets/images/marker/mapDropIcon.png";
import MasterCard from "./../../../assets/images/icons/mastercard.png";
import styles from "./BookingDetails.module.css";
import MVstyles from "../MyBooking/MyBooking.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { useBookingMovesDetailsHook } from "../../../hooks";
import moment from "moment/moment";
import { formatNumberWithDecimal } from "../../../services";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../../../components/MuvrBookingSteps/Payment/MVCheckout";
import { loadStripe } from "@stripe/stripe-js";
import { appConfig } from "../../../config";

const stripePromise = loadStripe(appConfig.STRIPE_PUBLIC_KEY);

// item images end
const BookingDetails = () => {
  const {
    searchParamData,
    bookingDetails,
    images,
    displayedImages,
    totalQuantity,
    itemPrice,
    loadMoreImages,
    cancellationData,
    cancelBookingViewModal,
    editBookingViewModal,
    handleEditBookingViewModal,
    handleEditBookingCloseModal,
    handleEditGotoSteps,
    handleCancelBookingViewModal,
    handleConfirmBookingViewModal,
    handleCancelBookingCloseModal,
    handleBookingSubmit,
    handleChangeInput,
    navigateToPage,
    handleAddFavoriteMuvr,
    muvrViewData,
    muvrRatingTipViewModal,
    TipValue,
    tipData,
    handleTipAmountChange,
    handleMuvrRateViewModal,
    handleMuvrTipViewModal,
    handleRatingTipCloseModal,
    onHandleChangeRating,
    rattingValue,
    onHandleCheckedValue,
    handleOnChangeComment,
    handleChangeFavMuvrCheck,
    handleFileInputChange,
    uploadingImages,
    handleDeleteFile,
    handleSubmitRating,
    viewPaymentModal,
    handleViewPaymentModal,
    handleClosePaymentModal,
  } = useBookingMovesDetailsHook();

  const items = [
    {
      label: (
        <div role="button" className="fw-400 p-sm dark" onClick={() => handleEditBookingViewModal()}>
          Edit booking
        </div>
        // <Link to={`/booking-steps?bookingId=${bookingDetails?.id}`}>Edit</Link>
      ),
      key: "0",
    },
    {
      label: (
        <div role="button" className="fw-400 p-sm red" onClick={() => handleCancelBookingViewModal()}>
          Cancel booking
        </div>
      ),
      key: "1",
    },
  ];

  const cancleBookingReasons = [
    {
      label: "Change of dates or locations",
      value: "Change of dates or locations",
    },
    {
      label: "Made bookings for the same date",
      value: "Made bookings for the same date",
    },
    {
      label: "Going with a different service",
      value: "Going with a different service",
    },
    { label: "Personal reasons", value: "Personal reasons" },
    { label: "None of the above", value: "none" },
  ];

  const moreThanThreeStarExperienceOptions = [
    { label: "On Time", value: "On Time" },
    { label: "Reliable", value: "Reliable" },
    { label: "Friendly", value: "Friendly" },
    { label: "Communicative", value: "Communicative" },
    { label: "Efficient", value: "Efficient" },
  ];

  const upToThreeStarExperienceOptions = [
    { label: "Late", value: "Late" },
    { label: "Impolite", value: "Impolite" },
    { label: "Careless", value: "Careless" },
    { label: "Uncommunicative", value: "Uncommunicative" },
    { label: "Inefficient", value: "Inefficient" },
  ];

  return (
    <>
      <MVHeader>
        <div className="position-relative w-100 d-flex align-center">
          <Link to="/my-bookings" className={"header-btn"}>
            {MVIcon.BackArrow}
          </Link>
          <div className="px-2">
            <h3 className="fw-500">{bookingDetails?.pickup_date && moment(bookingDetails?.pickup_date).format("MMM DD")}</h3>
            <p className="p-sm fw-400 mb-0 d-flex align-center">
              {bookingDetails?.vehicle ? bookingDetails?.vehicle?.name : ""} <b className="points-dot mx-2"></b>{" "}
              {bookingDetails?.totalMoverCount ? `${bookingDetails?.totalMoverCount} Muvrs` : "0 Muvr"}
            </p>
          </div>
          {bookingDetails?.status !== "CANCEL_BOOKING" && (
            <Dropdown
              menu={{
                items,
              }}
              trigger={["click"]}
              className={clsx(styles.bookingDropdown, "header-btn ml-auto")}
            >
              <Link onClick={(e) => e.preventDefault()}>{MVIcon.column3Dot}</Link>
            </Dropdown>
          )}
        </div>
      </MVHeader>
      <section className="main-wrapper main-wrapper-scroll">
        {searchParamData?.dateType === "draft" ? (
          bookingDetails?.bookingMuvrs && bookingDetails?.bookingMuvrs?.length > 0 ? (
            <MVPingMuvers muvrInfo={bookingDetails?.bookingMuvrs} />
          ) : (
            <MVmuvrNameCard />
          )
        ) : (
          ""
        )}
        {searchParamData?.dateType === "upcoming" ? (
          bookingDetails?.bookingMuvrs && bookingDetails?.bookingMuvrs?.length > 0 ? (
            <MVTrackMuvers muvrInfo={bookingDetails?.bookingMuvrs} distance={formatNumberWithDecimal(Number(bookingDetails?.distance))} bookingId={bookingDetails?.id} />
          ) : (
            <MVmuvrNameCard />
          )
        ) : (
          ""
        )}
        {searchParamData?.dateType === "past" ? (
          bookingDetails?.bookingMuvrs && bookingDetails?.bookingMuvrs?.length > 0 ? (
            bookingDetails?.bookingMuvrs?.map((muvrItem, muvrIndex) => (
              <MVDriverLikeCard
                userImage={[muvrItem?.user?.profile_image]}
                title={muvrItem?.user?.first_name ? `${muvrItem?.user?.first_name} ${muvrItem?.user?.last_name}` : ""}
                name={muvrItem?.type}
                status={bookingDetails?.status === "CANCEL_BOOKING"}
                icon={
                  <>
                    <Heart size="24" fill="currentColor" variant="Bold" className="gray" onClick={() => handleAddFavoriteMuvr(muvrItem?.muvr_id)} />
                  </>
                }
                isLike={muvrItem?.isFavourite}
                actions={
                  <>
                    {bookingDetails?.status === "CANCEL_BOOKING" ? (
                      <p className="darkgray fw-400 p-sm text-center">Refund will be transfer within 24hrs </p>
                    ) : (
                      <div className="d-grid align-center user-card-body-footer-grid">
                        {muvrItem?.review ? (
                          <h6 className={styles.ratingWrap}>
                            <span className={styles.starIcon}>{MVIcon.star}</span>
                            {muvrItem?.review?.rating}
                          </h6>
                        ) : (
                          <MVButton
                            variant={"flush"}
                            handleClick={() => handleMuvrRateViewModal(muvrItem)}
                            className={clsx("violet fw-500 h6 cursor-pointer border-x", styles.fontMuvrBtn)}
                          >
                            Rate Muvr
                          </MVButton>
                        )}
                        <MVButton
                          variant={"flush"}
                          onClick={() => handleMuvrTipViewModal(muvrItem)}
                          className={clsx("violet fw-500 h6 cursor-pointer border-x", styles.fontMuvrBtn)}
                        >
                          Tip Muvr
                        </MVButton>
                        <Link to="/" className="violet fw-500 h6 cursor-pointer">
                          Book again
                        </Link>
                      </div>
                    )}
                  </>
                }
                key={muvrIndex}
              />
            ))
          ) : (
            <MVmuvrNameCard />
          )
        ) : (
          ""
        )}
        <div className="rounded-detail-box">
          {bookingDetails?.pickup_location && (
            <div className={clsx(styles.pickupLocationWRapper, "d-flex align-center mb-3")}>
              <div className={clsx(styles.locationRoundBox, "d-flex align-center justify-center flex-0-auto round")}>
                <Image src={OriginMarker} preview={false} />{" "}
              </div>
              <div className="w-100 pl-2">
                <h6 className="darkgray fw-500 mb-1">Pickup location</h6>
                <p className="dark fw-500 mb-0">{bookingDetails?.pickup_location}</p>
              </div>
            </div>
          )}
          {bookingDetails?.dropoff_location && (
            <div className={clsx(styles.pickupLocationWRapper, "d-flex align-center mb-3")}>
              <div className={clsx(styles.locationRoundBox, "d-flex align-center justify-center flex-0-auto round")}>
                <Image src={DestinationMarker} preview={false} />
              </div>
              <div className="w-100 pl-2">
                <h6 className="darkgray fw-500 mb-1">Drop-off location</h6>
                <p className="dark fw-500 mb-0">{bookingDetails?.dropoff_location}</p>
              </div>
            </div>
          )}

          <div className="d-flex align-center">
            {bookingDetails?.pickup_date && (
              <div className="d-flex align-center">
                <Calendar size="16" fill="currentColor" variant="Bold" className="darkgray" />
                <span className="dark mb-0 d-block p-sm fw-400 ml-1">{moment(bookingDetails?.pickup_date).format("ll")}</span>
              </div>
            )}
            {bookingDetails?.pickup_time && (
              <>
                <b className="mx-3 lavender">|</b>
                <div className="d-flex align-center">
                  <Clock size="16" fill="currentColor" variant="Bold" className="darkgray" />
                  <span className="dark mb-0 d-block p-sm fw-400 ml-1">{bookingDetails?.pickup_time}</span>
                </div>
              </>
            )}
          </div>
          <div className={clsx(styles.pickupPriceGridBox, "d-grid mt-4")}>
            <div className={clsx(styles.pickupPriceBox, "w-100")}>
              <h6 className="darkgray fw-400 mb-1">Price</h6>
              <h5 className="green fw-500">${formatNumberWithDecimal(Number(bookingDetails?.amount > 0 ? bookingDetails?.amount : itemPrice?.totalSum))}</h5>
            </div>
            <div className={clsx(styles.pickupPriceBox, "w-100")}>
              <h6 className="darkgray fw-400 mb-1">Vehicle</h6>
              <h5 className="dark fw-500">{bookingDetails?.vehicle ? bookingDetails?.vehicle?.name : "-"}</h5>
            </div>
            <div className={clsx(styles.pickupPriceBox, "w-100")}>
              <h6 className="darkgray fw-400 mb-1">No. of items</h6>
              <h5 className="dark fw-500">
                {totalQuantity} {totalQuantity > 1 ? "items" : "item"}
              </h5>
            </div>
          </div>
          <div className="mt-4 d-flex align-center">
            <h6 className="fw-400 darkgray w-50">
              Booking ID: <span className="pl-1 dark">{bookingDetails?.booking_number ? `#${bookingDetails?.booking_number}` : "-"}</span>
            </h6>
            <h6 className="fw-500 darkgray w-50 text-right">
              Payment ID: <span className="pl-1 dark">{bookingDetails?.payments ? `#${bookingDetails?.payments?.payment_id}` : "-"}</span>
            </h6>
          </div>
        </div>
        {!bookingDetails?.payments && (
          <div className={clsx(styles.confirmBookingWrap, "d-flex align-center justify-center py-3 px-2")}>
            <h6 className="fw-400 darkgray">You need to pay {`$${formatNumberWithDecimal(Number(bookingDetails?.amount))}`} to confirm your booking</h6>
          </div>
        )}
        <div className={clsx(styles.addItemsCollapseWrap, "mt-6")}>
          <MVCollapse headerTitle={"Price summary"} className={styles.Collapsemy}>
            <>
              <ul className={clsx(styles.priceSummaryWrap)}>
                {bookingDetails?.vehicle && (
                  <li className="d-flex">
                    <div className="w-100">
                      <h5 className="dark fw-400 mb-0">Base fare</h5>
                      <h6 className="darkgray fw-400 mb-0">{bookingDetails?.vehicle?.name}</h6>
                    </div>
                    <h5 className="dark fw-500 mb-0">${formatNumberWithDecimal(Number(itemPrice?.vehiclePrice))}</h5>
                  </li>
                )}

                <li className="d-flex">
                  <div className="w-100">
                    <h5 className="dark fw-400 mb-0">Miles</h5>
                    <h6 className="darkgray fw-400 mb-0">
                      ${formatNumberWithDecimal(Number(bookingDetails?.vehicle?.per_miles))} /mi x {formatNumberWithDecimal(Number(bookingDetails?.distance))} mi
                    </h6>
                  </div>
                  <h5 className="dark fw-500 mb-0">${formatNumberWithDecimal(Number(itemPrice?.mile_price))}</h5>
                </li>
                {bookingDetails?.bookingItems?.length > 0 &&
                  bookingDetails?.bookingItems?.map((categoryItem, categoryIndex) => {
                    const categoryPrice = Number(categoryItem?.price) * Number(categoryItem?.quantity);

                    return (
                      <>
                        {categoryItem?.subCategory ? (
                          <li className="d-flex" key={categoryIndex}>
                            <div className="w-100">
                              <h5 className="dark fw-400 mb-0">{categoryItem?.subCategory?.name}</h5>
                              <h6 className="darkgray fw-400 mb-0">
                                {categoryItem?.subCategory?.price ? `$${formatNumberWithDecimal(Number(categoryItem?.price))}` : ""} x {categoryItem?.quantity}
                              </h6>
                            </div>
                            <h5 className="dark fw-500 mb-0">{`$${formatNumberWithDecimal(Number(categoryPrice))}`}</h5>
                          </li>
                        ) : (
                          <li className="d-flex" key={categoryIndex}>
                            <div className="w-100">
                              <h5 className="dark fw-400 mb-0">{categoryItem?.category?.name}</h5>
                              <h6 className="darkgray fw-400 mb-0">
                                {categoryItem?.category?.price ? `$${formatNumberWithDecimal(Number(categoryItem?.price))}` : ""} x {categoryItem?.quantity}
                              </h6>
                            </div>
                            <h5 className="dark fw-500 mb-0">{`$${formatNumberWithDecimal(Number(categoryPrice))}`}</h5>
                          </li>
                        )}
                      </>
                    );
                  })}
                {bookingDetails?.no_of_stairs > 0 && (
                  <li className="d-flex">
                    <div className="w-100">
                      <h5 className="dark fw-400 mb-0">Flights of stairs</h5>
                      <h6 className="darkgray fw-400 mb-0">
                        {`$${formatNumberWithDecimal(Number(bookingDetails?.stairs_price))}`} x {bookingDetails?.no_of_stairs}
                      </h6>
                    </div>
                    <h5 className="dark fw-500 mb-0">${formatNumberWithDecimal(Number(itemPrice?.stair_price))}</h5>
                  </li>
                )}
                {bookingDetails?.ishelp && (
                  <li className="d-flex align-center">
                    <div className="w-100">
                      <h5 className="dark fw-400 mb-0">Discount</h5>
                      <h6 className="darkgray fw-400 mb-0">
                        {bookingDetails?.vehicle?.save_getting_percentage ? `${formatNumberWithDecimal(Number(bookingDetails?.vehicle?.save_getting_percentage))}% Off` : ""}
                      </h6>
                    </div>
                    <h5 className="dark fw-700 mb-0 green">
                      -$
                      {formatNumberWithDecimal((itemPrice?.totalSum * bookingDetails?.vehicle?.save_getting_percentage) / 100)}
                    </h5>
                  </li>
                )}
                <li className="d-flex align-center">
                  <div className="w-100">
                    <h5 className="dark fw-400 mb-0">Final amount</h5>
                  </div>
                  <h5 className="dark fw-700 mb-0 green">${formatNumberWithDecimal(Number(bookingDetails?.amount > 0 ? bookingDetails?.amount : itemPrice?.totalSum))}</h5>
                </li>
              </ul>
            </>
          </MVCollapse>
        </div>
        <div className={clsx(styles.addItemsCollapseWrap, "mt-6")}>
          <MVCollapse headerTitle={"Item images"} className={styles.Collapsemy}>
            <>
              <div className="d-grid item-image-wrap-grid">
                {images?.slice(0, displayedImages)?.map((imageItem, index) => (
                  <div className="item-image-wrap-col" key={index}>
                    <Image src={imageItem.image} alt={`Image ${index + 1}`}></Image>
                  </div>
                ))}
              </div>
              {displayedImages < images?.length && (
                <span onClick={loadMoreImages} className="d-flex link align-center justify-center fw-500 p-sm violet mt-4">
                  View more
                </span>
              )}
            </>
          </MVCollapse>
        </div>

        <div className={clsx(styles.addItemsCollapseWrap, "mt-6")}>
          <MVCollapse headerTitle={"Instructions"} className={styles.Collapsemy}>
            <>
              <ul className={clsx(styles.instructionListItemWrap)}>
                <li className="fw-500 dark py-0">{bookingDetails?.special_instruction}</li>
              </ul>
            </>
          </MVCollapse>
        </div>
        {bookingDetails?.status === "CANCEL_BOOKING" && <h4 className="red text-center ma-3">This booking is cancelled</h4>}
      </section>

      {/* <Link to="/" className={`w-100 primary-btn radius-none`}>
        Make payment
      </Link> */}

      <MVModal title="Edit" open={editBookingViewModal} width={500} handleClose={() => handleEditBookingCloseModal()} centered>
        <div className={clsx(MVstyles.editBookingList, "px-4")}>
          <Link className={`d-flex align-center text-decoration-none`} onClick={() => handleEditGotoSteps(1)}>
            <div className={"w-100 d-flex align-center"}>
              <Location color="var(--accent-primary)" variant="Bold" size={24} />
              <div className="pl-2">
                <h4 className="fw-500 dark mb-0">Pickup & Drop-off </h4>
                
                <span className="green fw-400 p-sm">Changes saved successfully</span>
              </div>
            </div>

            <div className="flex-0-auto, ms-auto pl-3 cursor-pointer">
              <ArrowRight2 fill="currentColor" size={20} className="darkgray svg-hover-primary stroke-width-3" />
            </div>
          </Link>
          <Link className={`d-flex align-center text-decoration-none`} onClick={() => handleEditGotoSteps(2)}>
            <div className={"w-100 d-flex align-center"}>
              <Box color="currentColor" className="violet" variant="Bold" size={24} />
              <div className="pl-2">
                <h4 className="fw-500 dark mb-0">Make adjustment</h4>
                <span className="green fw-400 p-sm">Changes saved successfully</span>
              </div>
            </div>
            <div className="flex-0-auto, ms-auto pl-3 cursor-pointer">
              <ArrowRight2 fill="currentColor" size={20} className="darkgray svg-hover-primary stroke-width-3" />
            </div>
          </Link>
          <Link className={`d-flex align-center text-decoration-none`} onClick={() => handleEditGotoSteps(3)}>
            <div className={"w-100 d-flex align-center"}>
              <Truck color="var(--accent-primary)" variant="Bold" size={24} />
              <div className="pl-2">
                <h4 className="fw-500 dark mb-0">Change vehicle</h4>
                <span className="green fw-400 p-sm">Changes saved successfully</span>
              </div>
            </div>

            <div className="flex-0-auto, ms-auto pl-3 cursor-pointer">
              <ArrowRight2 fill="currentColor" size={20} className="darkgray svg-hover-primary stroke-width-3" />
            </div>
          </Link>
          <Link className={`d-flex align-center text-decoration-none`} onClick={() => handleEditGotoSteps(5)}>
            <div className={"w-100 d-flex align-center"}>
              <Calendar color="var(--accent-primary)" variant="Bold" size={24} />
              <div className="pl-2">
                <h4 className="fw-500 dark mb-0">Instructions & Images</h4>
                <span className="green fw-400 p-sm">Changes saved successfully</span>
              </div>
            </div>

            <div className="flex-0-auto, ms-auto pl-3 cursor-pointer">
              <ArrowRight2 fill="currentColor" size={20} className="darkgray svg-hover-primary stroke-width-3" />
            </div>
          </Link>
          <Link className={`d-flex align-center text-decoration-none`} onClick={() => handleEditGotoSteps(6)}>
            <div className={"w-100 d-flex align-center"}>
              <Img color="var(--accent-primary)" variant="Bold" size={24} />
              <div className="pl-2">
                <h4 className="fw-500 dark mb-0">Instructions & Images</h4>
                <span className="green fw-400 p-sm">Changes saved successfully</span>
              </div>
            </div>

            <div className="flex-0-auto, ms-auto pl-3 cursor-pointer">
              <ArrowRight2 fill="currentColor" size={20} className="darkgray svg-hover-primary stroke-width-3" />
            </div>
          </Link>
        </div>
        <Link to={`/booking-review-changes/${bookingDetails?.id}`} className="d-flex align-center justify-center fw-600 violet h4 hover-text text-decoration-none mt-7">
          Review your changes
          <ArrowRight2 size="20" fill="currentcolor" className="violet stroke-width-3 line-height-0" />
        </Link>
        <Link to="/booking-payment" variant={"primary"} className="w-100 d-flex align-center py-2 radius-none mt-7 primary-btn text-decoration-none">
          <div>
            <h4 className="fw-600 white mb-0 text-left">$115</h4>
            <h5 className="fw-500 gray">Amount for changes</h5>
          </div>
          <h4 className="ml-auto fw-600 white mb-0">Pay & send request</h4>
        </Link>
        {/* <div className="link link-primary">
          <Link to={`/booking-review-changes/${bookingDetails?.id}`}>Review your changes</Link>
          <ArrowRight2 color="var(--clr-darkgray)" size={20} />
        </div> */}

        {/* <div className=""><Link to ></Link></div> */}
      </MVModal>

      {cancelBookingViewModal?.isCancel ? (
        <MVModal
          title={cancelBookingViewModal?.modalTitle}
          open={cancelBookingViewModal?.isModal}
          width={500}
          handleClose={() => handleCancelBookingCloseModal()}
          centered
          confirmationModal={true}
          className={clsx(styles.bookingCancellationModal, "remove-close-icon")}
        >
          <div className={clsx(styles.spacingBottom)}>
            <div className={clsx(styles.spacingBottom, "d-flex justify-center")}>
              <Image src={bigCloseIcon} alt="" preview={false} className={clsx(styles.bigCloseIcon)} />
            </div>
            <h2 className="fw-600 dark text-center mb-1">{cancelBookingViewModal?.modalTitle}</h2>
            <h5 className="fw-400 darkgray text-center mx-auto">
              You will be charged <span className="fw-500 black">20%</span> of your total booking amount. Please see our{" "}
              <Link to="/cancellation-policy" state={{ bookingId: bookingDetails?.id }} className="violet">
                cancellation policy
              </Link>
            </h5>
          </div>
          <div className="w-100 mb-3">
            <h4 className="dark fw-500">Tell us your reason for cancelling</h4>

            <MVRadioBtn name="reason" onChange={(event) => handleChangeInput(event)} options={cancleBookingReasons} className="fw-400 darkgray" value={cancellationData?.reason} />
          </div>
          {cancellationData?.reason === "none" && (
            <MVTextArea
              label={""}
              name="otherReason"
              placeholder={"Enter Notes Here..."}
              className={clsx(styles.spacingBottom, "w-100")}
              value={cancellationData?.otherReason}
              onChange={(event) => handleChangeInput(event)}
            />
          )}
          <div className="text-center d-flex space-gap-8">
            <MVButton variant={"secondary"} className="w-100" onClick={() => handleBookingSubmit()}>
              Confirm
            </MVButton>
            <MVButton variant={"primary"} className="w-100" handleClick={() => handleCancelBookingCloseModal()}>
              Not now
            </MVButton>
          </div>
        </MVModal>
      ) : (
        <MVModal
          title={cancelBookingViewModal?.modalTitle}
          open={cancelBookingViewModal?.isModal}
          width={500}
          handleClose={() => handleConfirmBookingViewModal()}
          centered
          confirmationModal={true}
          className={clsx(styles.bookingCancellationModal, "remove-close-icon position-relative")}
        >
          <div className={clsx(styles.spacingBottom)}>
            <div className={clsx(styles.spacingBottom, "d-flex justify-center")}>
              <Image src={bigCloseIcon} alt="" preview={false} className={clsx(styles.bigCloseIcon)} />
            </div>
            <h2 className="fw-600 dark text-center mb-1">{cancelBookingViewModal?.modalTitle}</h2>
          </div>
          <ul className={clsx(styles.spacingBottom, "pl-5")}>
            <li className="fw-400 darkgray text-left">Your booking on {bookingDetails?.pickup_date} has been cancelled</li>
            <li className="fw-400 darkgray text-left">The deposit will be refunded within 5 days</li>
            <li className="fw-400 darkgray text-left">
              Cancellations can affect the user's account ratings. Please see our{" "}
              <Link
                to="/cancellation-policy"
                state={{
                  booking_id: bookingDetails?.id,
                  dateType: searchParamData?.dateType,
                }}
                className="violet fw-600"
              >
                Cancellation policy
              </Link>{" "}
              for more information
            </li>
          </ul>
          <div className="w-100">
            <MVButton variant={"primary"} className={clsx(styles.spacingBottom, "w-100")} handleClick={() => navigateToPage()}>
              Make a new booking
            </MVButton>
            <Link onClick={() => handleCancelBookingCloseModal()} className="violet h4 fw-600 d-flex align-center justify-center">
              View booking detail
              <ArrowRight2 size="24" fill="currentColor" className="violet" />
            </Link>
          </div>
        </MVModal>
      )}

      {muvrRatingTipViewModal?.isMuvrRate ? (
        <MVModal
          title={muvrRatingTipViewModal?.modalTitle}
          open={muvrRatingTipViewModal?.isModal}
          width={500}
          handleClose={() => handleRatingTipCloseModal()}
          centered
          confirmationModal={true}
          className={clsx(styles.submitRatingModal, "remove-close-icon position-relative submit-rating-modal")}
        >
          <div className="submit-rating-avatar-wrap pb-2">
            <div className="mb-5">
              <MVAvatar src={muvrViewData && muvrViewData?.user?.profile_image} alt={muvrViewData && muvrViewData?.user?.first_name} size={72} className={"d-block mx-auto mb-2"} />
              <h2 className="mb-600 text-center dark">{muvrViewData && muvrViewData?.user?.first_name + " " + muvrViewData?.user?.last_name}</h2>
            </div>
            <Rate defaultValue={0} onChange={onHandleChangeRating} value={rattingValue} className="big-star-style d-flex justify-center mb-6" />
            <div className="w-100 mb-6">
              <h5 className="dark fw-500 mb-4 text-center">How was your Muvr experience?</h5>
              <div className="custom-checkbox-style max-w-300 mx-auto">
                <Checkbox.Group className="d-flex justify-center flex-wrap w-100">
                  {rattingValue > 3
                    ? upToThreeStarExperienceOptions?.map((experienceOption, index) => (
                        <Checkbox
                          key={index}
                          value={experienceOption?.value}
                          className={clsx("d-flex align-center justify-center fw-500 round-sm checkBoxWrap")}
                          checked={experienceOption?.value}
                          onChange={onHandleCheckedValue}
                        >
                          {experienceOption?.label}
                        </Checkbox>
                      ))
                    : moreThanThreeStarExperienceOptions?.map((experienceOption, index) => (
                        <Checkbox
                          key={index}
                          value={experienceOption?.value}
                          className={clsx("d-flex align-center justify-center fw-500 round-sm checkBoxWrap")}
                          checked={experienceOption?.value}
                          onChange={onHandleCheckedValue}
                        >
                          {experienceOption?.label}
                        </Checkbox>
                      ))}
                </Checkbox.Group>
              </div>
            </div>
            <div className="w-100 mb-6">
              <MVTextArea label={""} placeholder={"Write more here"} className={clsx(styles.spacingBottom, "w-100")} onChange={handleOnChangeComment} />
            </div>
            <div className="custom-upload-wrap mb-6">
              <Swiper
                className={styles.imgUploadSlider}
                slidesPerView={1.1}
                spaceBetween={12}
                breakpoints={{
                  0: {
                    slidesPerView: 3,
                  },
                  375: {
                    slidesPerView: 3.7,
                  },
                  576: {
                    slidesPerView: 4.7,
                  },
                }}
              >
                {uploadingImages &&
                  uploadingImages?.length > 0 &&
                  uploadingImages?.map((imageItem, index) => (
                    <SwiperSlide className="position-relative" key={index}>
                      <Image src={imageItem?.baseImage} preview={false} className={styles.uploadedImg} width={"100%"} height={"100%"}></Image>
                      <button
                        className="remove-upload-item-icon d-flex align-center justify-center round white cursor-pointer"
                        type="button"
                        onClick={() => handleDeleteFile(imageItem)}
                      >
                        {MVIcon.closeIcon}
                      </button>
                    </SwiperSlide>
                  ))}
              </Swiper>
            </div>
            <div className="w-100 text-center mb-6">
              <MVCheckbox handleChange={handleChangeFavMuvrCheck}>{rattingValue > 3 ? "Add to my favorite Muvrs" : "Don't Pair me with this Muvr again"}</MVCheckbox>
            </div>
            <div className="text-center d-flex space-gap-8">
              <label
                htmlFor="uploadButton"
                className={clsx(styles.gridItem, styles.uploadButton, "custom-upload-btn d-flex align-center justify-center flex-0-auto cursor-pointer")}
              >
                <div className="d-flex justify-center align-center flex-column">
                  <GalleryAdd size="20" fill="currentColor" variant="Bold" className="violet" />
                  <input type="file" id="uploadButton" multiple onChange={handleFileInputChange} className={styles.bookingDetailsModalImgUploader} />
                </div>
              </label>

              <MVButton variant={"primary"} className="w-100" handleClick={handleSubmitRating}>
                Submit rating
              </MVButton>
            </div>
          </div>
        </MVModal>
      ) : (
        <MVModal
          title={muvrRatingTipViewModal?.modalTitle}
          open={muvrRatingTipViewModal?.isModal}
          width={500}
          handleClose={() => handleRatingTipCloseModal()}
          centered
          confirmationModal={true}
          className={clsx(styles.submitRatingModal, "remove-close-icon position-relative submit-rating-modal")}
        >
          <div className="submit-rating-avatar-wrap pb-2">
            <div className="mb-5">
              <MVAvatar
                src={muvrViewData && muvrViewData?.user?.profile_image}
                icon={!muvrViewData?.user?.profile_image && <User className="darkgray" fill="currentColor" size={20} variant="Bold" />}
                alt={muvrViewData && muvrViewData?.user?.first_name}
                size={72}
                className={"d-block mx-auto mb-2"}
              />
              <h2 className="mb-600 text-center dark">{muvrViewData && muvrViewData?.user?.first_name + " " + muvrViewData?.user?.last_name}</h2>
            </div>
            <div className="w-100 mb-6">
              <h4 className="dark fw-500 mb-1">Tip your Muvr.</h4>
              <p className="darkgray p-sm mb-0">Your kindness means a lot! 100% of your tip will go directly to your Muvr</p>
            </div>
            <div className="w-100 custom-radio-style mb-6">
              <Radio.Group name={"tipAmount"} defaultValue={tipData?.tipAmount} className="d-flex flex-wrap w-100" onChange={(event) => handleTipAmountChange(event)}>
                {TipValue?.map((tipData, tipIndex) => {
                  return (
                    <Radio.Button value={tipData?.value} className="d-flex align-center justify-center fw-500 darkgray round-sm" key={tipIndex}>
                      <Image src={tipData?.imageName} alt="" preview={false} />
                      <span className="line-height-0 pl-2">{tipData?.label}</span>
                    </Radio.Button>
                  );
                })}
              </Radio.Group>
            </div>
            <div className="w-100 pay-using-card mb-6">
              {tipData?.tipAmount === "other" && (
                <div className="w-100">
                  <MVTextInput
                    prefix={<DollarCircle size="24" color="var(--accent-primary)" variant="Bold" />}
                    name={"otherTipAmount"}
                    id={"otherTipAmount"}
                    type="number"
                    min={0}
                    max={1000000}
                    isDecimal={true}
                    label={"Tip Amount"}
                    value={tipData?.otherTipAmount}
                    onChange={(event) => handleTipAmountChange(event)}
                  />
                </div>
              )}
              {/* <div className="d-flex align-center mb-3">
                <h4 className="mb-0 h4 dark mb-0">Pay using</h4>
                <Link to="/booking-details" className="violet h6 fw-500 d-flex align-center justify-center ml-auto">
                  Other options
                  <ArrowRight2 size="20" fill="currentColor" className="violet" />
                </Link>
              </div>
              <div className="d-flex align-center mb-3">
                <Image src={MasterCard} alt="MasterCard" className="flex-0-auto" preview={false} />
                <h4 className="fw-400 ml-1 dark mb-0">**** **** **** 8085</h4>
              </div> */}

              {/* <div className="w-100">
                <MVTextInput
                  label={
                    <>
                      <div className="d-flex align-center">
                        <span className="line-height-0 pr-1">CVC</span>
                        <InfoCircle size="20" fill="currentColor" variant="Bold" className="darkgray" />
                      </div>
                    </>
                  }
                  prefix={<Card size="24" fill="currentColor" variant="Bold" className="accent-primary" />}
                  suffix={
                    <>
                      <span role="button" className="p-sm fw-500 violet cursor-pointer hover-text">
                        Applied
                      </span>
                    </>
                  }
                  placeholder={"***"}
                  className="big-input"
                />
                <h6 className="green fw-400 mb-0 mt-2">CVC code applied successfully</h6>
              </div> */}
            </div>
            <MVButton variant={"primary"} className="w-100 d-flex align-center py-2" handleClick={() => handleViewPaymentModal()}>
              <div>
                <h4 className="fw-600 white mb-0 text-left">
                  {tipData?.tipAmount && `$${tipData?.tipAmount === "other" ? (tipData?.otherTipAmount ? tipData?.otherTipAmount : 0) : tipData?.tipAmount}`}
                </h4>
                <h5 className="fw-500 gray">Tip amount</h5>
              </div>
              <h4 className="ml-auto fw-600 white mb-0">Pay tip</h4>
            </MVButton>
          </div>
        </MVModal>
      )}
      <MVModal title={viewPaymentModal?.modalTitle} open={viewPaymentModal?.isModal} width={400} handleClose={() => handleClosePaymentModal()} centered>
        <Elements stripe={stripePromise}>
          <CheckoutForm
            amount={tipData?.tipAmount === "other" ? tipData?.otherTipAmount : tipData?.tipAmount}
            currency={"USD"}
            bookingId={bookingDetails?.id}
            modalClose={() => handleClosePaymentModal()}
            toId={muvrViewData?.muvr_id}
            tipModalClose={() => handleRatingTipCloseModal()}
          />
        </Elements>
      </MVModal>
    </>
  );
};

export default BookingDetails;
