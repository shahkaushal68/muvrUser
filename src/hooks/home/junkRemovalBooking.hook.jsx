import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { validateDropoffLocation, validateNextLogin, validatePickupLocation } from "../../validations";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import { toast } from "react-toastify";
import { doFetchBookingCreate } from "../../actions";
import { getDescryptionString } from "../../services";

export const useJunkRemovalBookingHook = (serviceId) => {
    const [errorMessage, setErrorMessage] = useState({});
    const [origin, setOrigin] = useState({}); // New York City
    const [originAddress, setOriginAddress] = useState("");
    // const [approveLocation, setApproveLocation] = useState([]);
    const [pickUpLocationDetails, setPickUpLocationDetails] = useState({});
    const [sessionId, setSessionId] = useState("");

    //console.log("movesInitialData-----------------", movesInitialData);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        let storeSessionId = localStorage.getItem("session_id");
        if (storeSessionId) {
            setSessionId(storeSessionId);
        }
    }, []);

    const handleOriginSelect = async (address) => {
        const { errors } = validatePickupLocation(address, errorMessage);
        setErrorMessage({ ...errors });
        setOriginAddress(address);
        const results = await geocodeByAddress(address);
        const latLng = await getLatLng(results[0]);
        setOrigin(latLng);

        // Extract city, country, and zip code from the result
        const addressComponents = results[0].address_components;

        let country;
        let state;
        let city;
        let zipCode;

        for (const component of addressComponents) {
            for (const type of component.types) {
                if (type === "country") {
                    country = component.long_name;
                }
                if (type === "administrative_area_level_1") {
                    state = component.long_name;
                }
                if (type === "locality" || type === "neighborhood" || type === "administrative_area_level_2") {
                    city = component.long_name;
                }
                if (type === "postal_code") {
                    zipCode = component.long_name;
                }
            }
        }

        setPickUpLocationDetails({
            city: city || "",
            state: state || "",
            country: country || "",
            zipCode: zipCode || "",
        });
    };



    const submitMovesBooking = async () => {
        try {
            let prepareBookingData;
            const { errors } = validateNextLogin(originAddress);
            setErrorMessage(errors);

            if (Object.keys(errors).length === 0) {
                prepareBookingData = {
                    serviceId: serviceId,
                    pickupLocation: originAddress,
                    pickupLatitude: origin?.lat,
                    pickupLongitude: origin?.lng,
                    step: 1,
                    sessionId: sessionId,
                };
                const bookingCreateStepFirstResponces = await doFetchBookingCreate(prepareBookingData, false, "", 1, localStorage.getItem("_token") ? true : false);
                if (bookingCreateStepFirstResponces?.status === 200) {
                    const bookingCreateSteFirstData = JSON.parse(getDescryptionString(bookingCreateStepFirstResponces?.data?.data));
                    const bookingData = {
                        serviceId: bookingCreateSteFirstData?.booking?.service_id,
                        pickupLocation: bookingCreateSteFirstData?.booking?.pickup_location,
                        pickupLongitude: bookingCreateSteFirstData?.booking?.pickup_longitude,
                        pickupLatitude: bookingCreateSteFirstData?.booking?.pickup_latitude,
                        dropoffLocation: bookingCreateSteFirstData?.booking?.dropoff_location,
                        dropoffLatitude: bookingCreateSteFirstData?.booking?.dropoff_latitude,
                        dropoffLongitude: bookingCreateSteFirstData?.booking?.dropoff_longitude,
                        amount: bookingCreateSteFirstData?.booking?.amount,
                        stairsPrice: bookingCreateSteFirstData?.booking?.stairs_price,
                        status: bookingCreateSteFirstData?.booking?.status,
                        id: bookingCreateSteFirstData?.booking?.id,
                        pickupNotes: bookingCreateSteFirstData?.booking?.pickup_notes,
                        sessionId: bookingCreateSteFirstData?.booking?.session_id,
                    };
                    dispatch({
                        type: "STORE_BOOKING_FORM_DATA",
                        payload: bookingData,
                    });
                    navigate(`/booking-steps?bookingId=${bookingCreateSteFirstData?.booking?.id}`);
                }
            }
        } catch (error) {
            console.log({ error });
        }
    };

    return {
        navigate,
        submitMovesBooking,
        errorMessage,
        handleOriginSelect,
        originAddress,
        setOriginAddress,
    };
}