
import { Link } from "react-router-dom";
import { ArrowRight } from "iconsax-react";
import { MVButton, MVLoader, MVTextInput } from "../../../components";
import ResidentialAndHome from "../../../assets/images/covers/restdential-and-home.jpg";
import BusinessAndOffice from "../../../assets/images/covers/business-and-office.jpg";
import FullPropertyCleanUp from "../../../assets/images/covers/full-property-clean-out.jpg";
import styles from "../Home.module.css";
import { Image } from "antd";
import PlacesAutocomplete from "react-places-autocomplete";
import { useJunkRemovalBookingHook } from "../../../hooks";
import OriginMarker from "../../../assets/images/marker/mapPicupIcon.png";

export const HomeJunkRemovalTab = ({ serviceId }) => {

  console.log("serviceId-------", serviceId);

  const {
    navigate,
    submitMovesBooking,
    errorMessage,
    handleOriginSelect,
    originAddress,
    setOriginAddress,
  } = useJunkRemovalBookingHook(serviceId);

  return (
    <main>
      <section className={styles.homeMovesSpacing}>
        <div className={"mb-5"}>
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

        <MVButton
          handleClick={() => submitMovesBooking()}
          variant={"primary"}
          className="w-100"
        >
          Continue
        </MVButton>
      </section>

      <div className="border-line" />

      <section className={styles.homeMovesSpacing}>
        <h2 className="mb-3">Eco-disposal haul away</h2>

        <div className={styles.learnMoreCard}>
          <img
            src={ResidentialAndHome}
            width={118}
            height={96}
            alt="A residential home wall"
          />

          <div className="ml-2">
            <h3 className="fw-500 mb-1 lh-1">Residential & Home</h3>

            <p className="darkgray h6 mb-3">
              Affordable junk removal for residential homes.
            </p>

            <Link
              to={"/"}
              className="link link-primary fw-500 d-flex align-center"
            >
              Learn More{" "}
              <ArrowRight
                size="16"
                color="var(--accent-primary)"
                className="ml-1"
              />
            </Link>
          </div>
        </div>

        <div className={styles.learnMoreCard}>
          <img
            src={BusinessAndOffice}
            width={118}
            height={96}
            alt="An office room"
          />
          <div className="ml-2">
            <h3 className="fw-500 mb-1 lh-1">Business & Office</h3>

            <p className="darkgray h6 mb-3">
              The modern solution for all your junk removal needs.
            </p>

            <Link
              to={"/"}
              className="link link-primary fw-500 d-flex align-center"
            >
              Learn More{" "}
              <ArrowRight
                size="16"
                color="var(--accent-primary)"
                className="ml-1"
              />
            </Link>
          </div>
        </div>

        <div className={styles.learnMoreCard}>
          <img
            src={FullPropertyCleanUp}
            width={118}
            height={96}
            alt="Outdoor"
          />
          <div className="ml-2">
            <h3 className="fw-500 mb-1 lh-1">Full property clean out</h3>

            <p className="darkgray h6 mb-3">
              Reliable pickup of all your unwanted junk.
            </p>

            <Link
              to={"/"}
              className="link link-primary fw-500 d-flex align-center"
            >
              Learn More{" "}
              <ArrowRight
                size="16"
                color="var(--accent-primary)"
                className="ml-1"
              />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};
