import { MVButton, MVLoader, MVTextInput } from "../../components";
import styles from "./MuvrBookingSteps.module.css";
import { useMovingLocationStepHook } from "../../hooks";
import { GoogleMap, DirectionsRenderer, Marker } from "@react-google-maps/api";
import OriginMarker from "../../assets/images/marker/mapPicupIcon.png";
import DestinationMarker from "../../assets/images/marker/mapDropIcon.png";
import PlacesAutocomplete from "react-places-autocomplete";
import { Location, Routing2 } from "iconsax-react";
import { Image } from "antd";

export const MovingLocationStep = ({ successResponse, bookingCreateFormData, current }) => {
  // Callback when an address is selected from the autocomplete dropdown
  const {
    errorMessage,
    origin,
    destination,
    clickOnNextButton,
    handleOriginSelect,
    handleDestinationSelect,
    containerStyle,
    center,
    originAddress,
    destinationAddress,
    setOriginAddress,
    setDestinationAddress,
    directions,
    routeOptions,
  } = useMovingLocationStepHook(successResponse, current);


  if (bookingCreateFormData === null) {
    return <MVLoader />;
  } else {
    return (
      <>
        <section className="h-full main-wrapper">
          <div className={"mb-4"}>
            <div className={styles.mapContainer}>
              <div className={styles.mapParametersWrap}>
                <div className={styles.mapParameters}>
                  <div className={styles.mapParametersContainer}>
                    <div className={styles.iconSquareBg}>
                      <Routing2 size="18" color="var(--accent-primary)" variant="Bold" />
                    </div>
                    <div>
                      <h6 className="fw-400 darkgray">Distance</h6>
                      <h6 className="fw-400 dark mb-0">
                        <span className="h5 fw-500 dark">{directions?.routes[0]?.legs[0]?.distance?.text}</span>
                      </h6>
                    </div>
                  </div>
                  <div className={styles.mapParametersContainer}>
                    <div className={styles.iconSquareBg}>
                      <Routing2 size="18" color="var(--accent-primary)" variant="Bold" />
                    </div>
                    <div>
                      <h6 className="fw-400 darkgray">Est. time</h6>
                      <h5 className="fw-500 dark mb-0">{directions?.routes[0]?.legs[0]?.duration?.text}</h5>
                    </div>
                  </div>
                </div>
              </div>
              <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
                {/* Render directions if available */}
                {directions && <DirectionsRenderer directions={directions} options={{ suppressMarkers: true, ...routeOptions }} />}

                {origin && (
                  <Marker
                    position={origin}
                    options={{
                      icon: OriginMarker,
                    }}
                  />
                )}
                {destination && (
                  <Marker
                    position={destination}
                    options={{
                      icon: DestinationMarker,
                    }}
                  />
                )}
              </GoogleMap>
            </div>
          </div>
          <div className={styles.locationInputWrap}>
            <h1>Google Maps Directions</h1>

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
                            {/* <Location size="16" color="var(--accent-primary)" variant="Bold" /> */}
                          </div>
                        </>
                      }
                      {...getInputProps({
                        placeholder: "Pick up location",
                        className: "location-input",
                      })}
                    />
                    <div className="autocomplete-dropdown-container">
                      {loading && <div>Loading...</div>}
                      {suggestions.map((suggestion, index) => {
                        const className = suggestion.active ? "suggestion-item-active" : "suggestion-item";
                        return (
                          <div
                            key={index}
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
                            {/* <Location size="16" color="var(--accent-primary)" variant="Bold" /> */}
                            <Image src={DestinationMarker} preview={false} />
                          </div>
                        </>
                      }
                      {...getInputProps({
                        placeholder: "Pick up location",
                        className: "location-input",
                      })}
                    />
                    <div className="autocomplete-dropdown-container">
                      {loading && <div>Loading...</div>}
                      {suggestions.map((suggestion, index) => {
                        const className = suggestion.active ? "suggestion-item-active" : "suggestion-item";
                        return (
                          <div
                            key={index}
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
        </section>

        <MVButton variant="primary" className={`w-100 align-self-end radius-none ${styles.stepsBtn}`} handleClick={clickOnNextButton}>
          Next
        </MVButton>
      </>
    );
  }
};
