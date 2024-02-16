import clsx from "clsx";
import { ArrowRight2, Location, User } from "iconsax-react";
import { typeOfMovesData, upcomingBookingSwiperData } from "../../../constants/data";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { MVAvatar, MVButton, MVLoader, MVTextInput } from "../../../components";
import { useMovesBookingHook } from "../../../hooks";
import PlacesAutocomplete from "react-places-autocomplete";
import styles from "../Home.module.css";
import moment from "moment";
import { Image } from "antd";
import OriginMarker from "../../../assets/images/marker/mapPicupIcon.png";
import DestinationMarker from "../../../assets/images/marker/mapDropIcon.png";

export const HomeMovesTab = ({ serviceId }) => {
  const {
    loading,
    submitMovesBooking,
    handleOriginSelect,
    handleDestinationSelect,
    errorMessage,
    originAddress,
    setOriginAddress,
    destinationAddress,
    setDestinationAddress,
    bookingMovesAllList,
  } = useMovesBookingHook(serviceId);

  return (
    <>
      <div className={styles.homeMovesSpacing}>
        <div className={styles.locationInputWrap}>
          {/* <h1>Google Maps Directions</h1> */}

          {/* Origin location input */}
          <div>
            <PlacesAutocomplete value={originAddress} onChange={setOriginAddress} onSelect={handleOriginSelect}>
              {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                <div>
                  <MVTextInput
                    placeholder={"Select start point"}
                    label={
                      <>
                        <p className="p-sm accent-primary fw-500">Pickup location</p>
                      </>
                    }
                    prefix={
                      <>
                        <div className={"input-icon-circle"}>
                          <Image src={OriginMarker} preview={false} />
                        </div>
                      </>
                    }
                    {...getInputProps({
                      // placeholder: "Pick up location",
                      className: "location-input",
                    })}
                  />
                  <div className="autocomplete-dropdown-container">
                    {loading && (
                      <div>
                        <MVLoader />
                      </div>
                    )}
                    {suggestions.map((suggestion, index) => {
                      const className = suggestion.active ? "suggestion-item-active" : "suggestion-item";
                      return (
                        <div
                          key={index} // Add a unique key prop
                          {...getSuggestionItemProps(suggestion, {
                            className,
                          })}
                        >
                          <span>{suggestion.description}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </PlacesAutocomplete>
            {Object.keys(errorMessage).length > 0 && errorMessage && <span className="error-message">{errorMessage?.originAddress}</span>}
          </div>

          {/* Destination location input */}
          <div>
            <PlacesAutocomplete value={destinationAddress} onChange={setDestinationAddress} onSelect={handleDestinationSelect}>
              {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                <div>
                  <MVTextInput
                    placeholder={"Select end point"}
                    label={
                      <>
                        <p className="p-sm accent-primary fw-500">Drop-off location</p>
                      </>
                    }
                    prefix={
                      <>
                        <div className={"input-icon-circle"}>
                          <Image src={DestinationMarker} preview={false} />
                        </div>
                      </>
                    }
                    {...getInputProps({
                      // placeholder: "Pick up location",
                      className: "location-input",
                    })}
                  />
                  <div className="autocomplete-dropdown-container">
                    {loading && <div>Loading...</div>}
                    {suggestions.map((suggestion, index) => {
                      const className = suggestion.active ? "suggestion-item-active" : "suggestion-item";
                      return (
                        <div
                          key={index} // Add a unique key prop
                          {...getSuggestionItemProps(suggestion, {
                            className,
                          })}
                        >
                          <span>{suggestion.description}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </PlacesAutocomplete>
            {Object.keys(errorMessage).length > 0 && errorMessage && <span className="error-message">{errorMessage?.destinationAddress}</span>}
          </div>
        </div>

        <MVButton handleClick={() => submitMovesBooking()} variant={"primary"} className="w-100 mt-6">
          Continue
        </MVButton>
      </div>
      <div className="border-line mb-0" />
      {loading ? (
        <MVLoader />
      ) : (
        bookingMovesAllList?.length > 0 && (
          <div className={styles.homeMovesSpacing}>
            <div className="d-flex align-center">
              <h2>Upcoming Bookings</h2>
              <Link to={"/my-bookings "} className="link link-primary fw-bold ml-auto fw-500 d-flex align-center">
                View All
                <ArrowRight2 size="18" variant={"Linear"} />
              </Link>
            </div>

            <div className="upcoming-bookings-slider-wrap">
              <Swiper
                slidesPerView={1.1}
                spaceBetween={12}
                breakpoints={{
                  370: {
                    slidesPerView: 1.5,
                  },
                  768: {
                    slidesPerView: 1.8,
                  },
                }}
                className={clsx(styles.customSwiperStyle, "mt-4")}
              >
                {bookingMovesAllList?.map((bookingDetails, bookingIndex) => {
                  let bookingImages = bookingDetails?.bookingMuvrs?.map((imageItem) => {
                    return imageItem?.user?.profile_image;
                  });

                  let muvrname =
                    bookingDetails?.bookingMuvrs?.length > 0
                      ? bookingDetails?.bookingMuvrs
                          ?.map((muvrItem) => {
                            return muvrItem?.user?.first_name;
                          })
                          .join(" & ")
                      : "Muvrs yet to assign";

                  return (
                    <SwiperSlide className="border-color-lavender" key={bookingIndex}>
                      <Link to={`/booking-details/${bookingDetails?.id}?dateType=upcoming`} className="link link-primary fw-bold ml-auto fw-500">
                        <div className="d-flex align-center">
                          <div>
                            <h5 className="fw-500 dark">
                              {bookingDetails?.pickup_date ? moment(bookingDetails?.pickup_date).format("MMM DD") : ""},{" "}
                              {bookingDetails?.vehicle ? bookingDetails?.vehicle?.name : "-"}
                            </h5>
                            <small className={clsx(styles.gray, "fw-400")}>{bookingDetails?.totalMoverCount ? `${bookingDetails?.totalMoverCount} Muvrs` : "0 Muvr"}</small>
                          </div>
                          <div className={clsx(styles.bage, "ml-auto d-flex align-center justify-center")}>
                            <span className="accent-primary fw-500">{"Moving"}</span>
                          </div>
                        </div>
                        <div className="profile-pic-wrap mt-4 d-flex align-center">
                          <div className={clsx(styles.userAvatarImg, `flex-0-auto`)}>
                            {bookingImages?.length > 0 ? (
                              bookingImages?.map((user, index) => {
                                return <Image src={user} key={index} alt="" className="w-100 h-100 round" preview={false} />;
                              })
                            ) : (
                              <MVAvatar size={38} icon={<User className="darkgray" fill="currentColor" size={20} variant="Bold" />} className="bg-lavender" />
                            )}
                          </div>
                          <h6 className="fw-400 dark mb-0 pl-2">{muvrname}</h6>
                        </div>
                      </Link>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </div>
          </div>
        )
      )}
      <div className={clsx(styles.homeMovesSpacing, "pt-0")}>
        <h2>Types of moves</h2>
        <div className={clsx(styles.typeOfMovesGrid, "d-grid mt-4")}>
          {typeOfMovesData.map((item, index) => (
            <div className={clsx(styles.typeOfMovesBox, "")} key={index}>
              <div className={clsx(styles.imgBox, "w-100 d-flex align-center justify-center")}>
                <img src={item.movesImg} className="" alt="" />
              </div>
              <div className={clsx(styles.movesName, "w-100")}>
                <h4 className={clsx(styles.movesTitle, "dark fw-500")}>{item.title}</h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
