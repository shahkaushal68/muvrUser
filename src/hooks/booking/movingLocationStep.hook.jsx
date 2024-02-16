import { useDispatch, useSelector } from "react-redux";
import { doFetchAllCities, doFetchBookingCreate } from "../../actions";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import { getDescryptionString } from "../../services";
import { toast } from "react-toastify";
import { validateDropoffLocation, validateNextLogin, validatePickupLocation } from "../../validations";
// Replace with the path to your custom marker ic

export const useMovingLocationStepHook = (successResponse, current) => {
  const { bookingCreateFormData } = useSelector((state) => state?.bookingReducer);

  const [errorMessage, setErrorMessage] = useState({});
  const [origin, setOrigin] = useState({}); // New York City
  const [destination, setDestination] = useState({}); // Los Angeles
  const [center, setCenter] = useState({});
  const [directions, setDirections] = useState(null);
  const [distance, setDistance] = useState(null);
  const [originAddress, setOriginAddress] = useState("");
  const [destinationAddress, setDestinationAddress] = useState("");
  const [approveLocation, setApproveLocation] = useState([]);
  const [pickUpLocationDetails, setPickUpLocationDetails] = useState({});
  const [dropLocationDetails, setDropLocationDetails] = useState({});
  const [routeOptions] = useState({
    polylineOptions: {
      strokeColor: "#6F0EE2", // Replace with your desired color
      strokeOpacity: 0,
      strokeWeight: 0,
      icons: [
        {
          icon: {
            path: "M 1,-1 1,1",
            strokeOpacity: 1,
            scale: 2.5,
          },
          offset: "10",
          repeat: "15px", // Adjust this value to control the dash length
        },
      ],
    },
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const handleOriginSelect = async (address) => {
    const { errors } = validatePickupLocation(address, errorMessage);
    setErrorMessage({ ...errors });
    setOriginAddress(address);
    const results = await geocodeByAddress(address);
    const latLng = await getLatLng(results[0]);
    setOrigin(latLng);

    // Extract city, country, and zip code from the result
    const addressComponents = results[0].address_components;
    const city = addressComponents.find((component) => component.types.includes("locality"))?.long_name;
    const state = addressComponents.find((component) => component.types.includes("administrative_area_level_1"))?.long_name;
    const country = addressComponents.find((component) => component.types.includes("country"))?.long_name;
    const zipCode = addressComponents.find((component) => component.types.includes("postal_code"))?.long_name;

    setPickUpLocationDetails({
      city: city || "",
      state: state || "",
      country: country || "",
      zipCode: zipCode || "",
    });
  };

  const handleDestinationSelect = async (address) => {
    const { errors } = validateDropoffLocation(address, errorMessage);
    setErrorMessage({ ...errors });
    setDestinationAddress(address);
    const results = await geocodeByAddress(address);
    const latLng = await getLatLng(results[0]);
    setDestination(latLng);

    // Extract city, country, and zip code from the result
    const addressComponents = results[0].address_components;
    const city = addressComponents.find((component) => component.types.includes("locality"))?.long_name;
    const state = addressComponents.find((component) => component.types.includes("administrative_area_level_1"))?.long_name;
    const country = addressComponents.find((component) => component.types.includes("country"))?.long_name;
    const zipCode = addressComponents.find((component) => component.types.includes("postal_code"))?.long_name;

    setDropLocationDetails({
      city: city || "",
      state: state || "",
      country: country || "",
      zipCode: zipCode || "",
    });
  };

  const containerStyle = {
    width: "100%",
    height: "550px",
  };

  const directionsCallback = (response) => {
    if (response !== null) {
      if (response.status === "OK") {
        setDirections(response);
        calculateDistance(response.routes[0]);
      } else {
        console.error("Directions request failed:", response.status);
      }
    }
  };

  const calculateDistance = (route) => {
    // let totalDistance = 0;
    // for (const leg of route.legs) {
    //   totalDistance += leg.distance.value;
    // }
    const totalDistance = route.legs?.length > 0 ? route.legs[0]?.distance?.text?.split(" ")[0] : 0;
    setDistance(totalDistance); // Convert to kilometers and round to 2 decimal places
  };

  useEffect(() => {
    const directionsService = new window.google.maps.DirectionsService();

    directionsService.route(
      {
        origin: origin,
        destination: destination,
        travelMode: "DRIVING",
      },
      directionsCallback
    );
  }, [origin, destination]);

  useEffect(() => {
    if (bookingCreateFormData) {
      setOrigin({
        lat: Number(bookingCreateFormData?.pickupLatitude) || "",
        lng: Number(bookingCreateFormData?.pickupLongitude) || "",
      });
      setDestination({
        lat: Number(bookingCreateFormData?.dropoffLatitude) || "",
        lng: Number(bookingCreateFormData?.dropoffLongitude) || "",
      });
      setOriginAddress(bookingCreateFormData?.pickupLocation || "");
      setDestinationAddress(bookingCreateFormData?.dropoffLocation || "");
      setDistance(bookingCreateFormData?.distance || "");
    }
  }, [bookingCreateFormData]);

  useEffect(() => {
    if (Object.keys(origin).length !== 0 && Object.keys(destination).length !== 0) {
      console.log("not zero");
      setCenter({
        lat: (origin?.lat + destination?.lat) / 2,
        lng: (origin?.lng + destination?.lng) / 2,
      });
    }
  }, [origin, destination]);

  //console.log("origin------", origin);
  // console.log("destination------", destination);
  //console.log("center------", center);

  const prepareReduxStoreDataMovingLocationStep = async () => {
    console.log(distance, "redux");
    const convertDistance = Number(distance?.split(" ")[0]);
    const prepareBookingDataSelectItemStep = {
      ...bookingCreateFormData,
      serviceId: bookingCreateFormData?.serviceId,
      pickupLocation: originAddress,
      pickupLongitude: origin?.lng,
      pickupLatitude: origin?.lat,
      dropoffLocation: destinationAddress,
      dropoffLatitude: destination?.lat,
      dropoffLongitude: destination?.lng,
      distance: convertDistance,
      step: current + 1,
    };

    dispatch({
      type: "STORE_BOOKING_FORM_DATA",
      payload: prepareBookingDataSelectItemStep,
    });
  };

  const getAllCities = async () => {
    const fetchCitiesResponse = await doFetchAllCities();
    if (fetchCitiesResponse?.status === 200) {
      const cityData = JSON.parse(getDescryptionString(fetchCitiesResponse?.data?.data));
      setApproveLocation(cityData);
      dispatch({
        type: "STORE_CITY_LIST",
        payload: cityData,
      });
    }
  };

  const clickOnNextButton = async () => {
    const { errors } = validateNextLogin(originAddress, destinationAddress);
    setErrorMessage(errors);
    if (Object.keys(errors).length === 0) {
      const isPickupCityPresent = approveLocation?.some((location) => location?.name === pickUpLocationDetails?.city);
      const isDropCityPresent = approveLocation?.some((location) => location?.name === dropLocationDetails?.city);

      if (Object.keys(pickUpLocationDetails).length === 0 && Object.keys(dropLocationDetails).length === 0) {
        console.log(distance, "button");
        const convertDistance = Number(distance?.split(" ")[0]);
        const firstStepPreapareData = {
          serviceId: bookingCreateFormData?.serviceId,
          pickupLocation: originAddress,
          pickupLongitude: origin?.lng,
          pickupLatitude: origin?.lat,
          dropoffLocation: destinationAddress,
          dropoffLatitude: destination?.lat,
          dropoffLongitude: destination?.lng,
          distance: convertDistance,
          step: current + 1,
        };
        const bookingCreateResponse = await doFetchBookingCreate(
          firstStepPreapareData,
          false,
          searchParams.get("bookingId"),
          current + 1,
          localStorage.getItem("_token") ? true : false
        );
        if (bookingCreateResponse?.status === 200) {
          prepareReduxStoreDataMovingLocationStep();
          successResponse();
        }
      } else {
        //console.log("length is present");

        if (isPickupCityPresent || isDropCityPresent) {
          if (pickUpLocationDetails?.country !== dropLocationDetails?.country) {
            navigate("/not-available", { state: { isBookingId: true, bookingId: searchParams.get("bookingId") } });
          } else {
            if (origin?.lat === destination?.lat && origin?.lng === destination?.lng) {
              toast.error("Pick up and Drop off location should not be same!");
            } else {
              const convertDistance = Number(distance?.split(" ")[0]);
              const firstStepPreapareData = {
                serviceId: bookingCreateFormData?.serviceId,
                pickupLocation: originAddress,
                pickupLongitude: origin?.lng,
                pickupLatitude: origin?.lat,
                dropoffLocation: destinationAddress,
                dropoffLatitude: destination?.lat,
                dropoffLongitude: destination?.lng,
                distance: convertDistance,
                step: current + 1,
              };
              const bookingCreateResponse = await doFetchBookingCreate(
                firstStepPreapareData,
                false,
                searchParams.get("bookingId"),
                current + 1,
                localStorage.getItem("_token") ? true : false
              );
              if (bookingCreateResponse?.status === 200) {
                prepareReduxStoreDataMovingLocationStep();
              }
            }
          }
        } else {
          navigate("/not-available", { state: { isBookingId: true, bookingId: searchParams.get("bookingId") } });
        }
      }
    }
  };

  useEffect(() => {
    getAllCities();
  }, []);

  return {
    errorMessage,
    origin,
    destination,
    bookingCreateFormData,
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
  };
};
