import { useEffect, useState } from "react";
import { doBringMuvrRequestToMyHomeTown, doGetAllCity, doGetAllState, doGetCity, doGetCountry, doGetState } from "../../actions";
import { getDescryptionString } from "../../services";
import { validateBringHomeTown, validateZipCode } from "../../validations/booking/locationNotAvailable.validate";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";

export const useLocationNotAvailable = () => {
    const [zipBasedCountry, setZipBasedCountry] = useState(null);
    const [zipBasedState, setZipBasedState] = useState(null);
    const [zipBasedCity, setZipBasedCity] = useState(null);
    const [selectedCountry, setSelectedCountry] = useState([]);
    const [selectedState, setSelectedState] = useState([]);
    const [selectedCity, setSelectedCity] = useState([]);
    const [errorMessage, setErrorMessage] = useState({});
    const [zipCode, setZipCode] = useState(null);
    const [googleApiResult, setGoogleApiResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        fetchDataBasedOnZipCode()
    }, [googleApiResult])

    //----------------------Handle Change Zipcode--------------------------
    const onHandleChangeZipCode = (event) => {
        const { errors } = validateZipCode(zipCode, errorMessage);
        setErrorMessage({ ...errors });
        if (event.target.value.length > 4) {
            fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${event.target.value}&key=${process.env.REACT_APP_Google_MAP_KEY}`)
                .then(response =>
                    response.json())
                .then(json => {
                    if (json?.status === "ZERO_RESULTS") return toast.error("Please Enter Valid Zipcode");
                    setGoogleApiResult(json);
                })
                .catch(error => console.error(error));
        }
        setZipCode(event.target.value)
    }



    const fetchDataBasedOnZipCode = async () => {
        if (googleApiResult?.status === "OK") {
            const countryBasedOnZip =
                googleApiResult?.results &&
                googleApiResult?.results?.length > 0 &&
                googleApiResult?.results[0]?.address_components[googleApiResult?.results[0]?.address_components.length - 1]
            const stateBasedOnZip =
                googleApiResult?.results &&
                googleApiResult?.results?.length > 0 &&
                googleApiResult?.results[0]?.address_components[googleApiResult?.results[0]?.address_components.length - 2]
            const cityBasedOnZip =
                googleApiResult?.results &&
                googleApiResult?.results?.length > 0 &&
                googleApiResult?.results[0]?.address_components[googleApiResult?.results[0]?.address_components.length - 3]
            setZipBasedCountry(countryBasedOnZip);
            setZipBasedState(stateBasedOnZip);
            setZipBasedCity(cityBasedOnZip);
        }
    }
    //----------------Onclick Submit button Event---------------------   
    const handleOnClickBringMuvr = async () => {
        const { errors } = validateBringHomeTown(zipCode);
        setErrorMessage(errors);
        if (selectedCity?.length === 0) return toast.error("Please search Zipcode first!");
        const requestCityResponse = await doBringMuvrRequestToMyHomeTown({
            "pinCode": zipCode,
            "cityId": selectedCity[0]?.id
        }, localStorage.getItem("_token") ? true : false);
        console.log("requestCityResponse", requestCityResponse);
        if (requestCityResponse?.status === 200) {
            //const requestCityData = JSON.parse(getDescryptionString(requestCityResponse?.data?.data));
            //console.log("requestCityData------", requestCityData);
            navigate(location?.state?.isBooingId ? `/booking-steps?bookingId=${location?.state?.bookingId}` : -1);
        }

    }


    const matchZipDataWithDatabaseData = async () => {
        if (zipBasedCountry) {
            setLoading(true)
            const fetchCountryResponse = await doGetCountry(zipBasedCountry?.long_name);
            if (fetchCountryResponse?.status === 200) {
                const fetchCountryData = JSON?.parse(getDescryptionString(fetchCountryResponse?.data?.data));
                setSelectedCountry(fetchCountryData);
                const fetchStateResponse = await doGetState(zipBasedState?.long_name, fetchCountryData[0]?.id);
                if (fetchStateResponse?.status === 200) {
                    const fetchStateData = JSON?.parse(getDescryptionString(fetchStateResponse?.data?.data));
                    setSelectedState(fetchStateData);
                    const fetchCityResponse = await doGetCity(zipBasedCity?.long_name, fetchStateData[0]?.id);
                    if (fetchCityResponse?.status === 200) {
                        const fetchCityData = JSON?.parse(getDescryptionString(fetchCityResponse?.data?.data));
                        setSelectedCity(fetchCityData);
                        setLoading(false);
                    }
                }
            }
        }
    }
    useEffect(() => {
        matchZipDataWithDatabaseData();
    }, [zipBasedCountry])


    //console.log("selected Country--------------", selectedCountry);

    return {
        loading,
        errorMessage,
        zipCode,
        selectedCountry,
        selectedState,
        selectedCity,
        onHandleChangeZipCode,
        handleOnClickBringMuvr
    }
}