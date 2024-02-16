import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { doFetchUserProfileCreate } from "../../actions";
import { getDescryptionString } from "../../services";
import {
  validateCreateProfile,
  validateSubmitCreateProfile,
} from "../../validations";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import { toast } from "react-toastify";

export const useCreateUserProfileHook = () => {
  const initialData = {
    firstName: "",
    middleName: "",
    lastName: "",
    phoneCode: "+1",
    phoneNumber: "",
    email: "",
    referCode: "",
    deviceToken: "ddfsdfd",
    deviceType: 3,
    loginType: "email",
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userDetails } = useSelector(
    (state) => state.storeAuthenticateReducer
  );


  const [userData, setUserData] = useState(initialData);
  const [addressLocation, setAddressLocation] = useState('');
  const [addressLatLong, setAddressLatLong] = useState(null); // New York City
  const [addressDetails, setAddressDetails] = useState({});
  const [validateMessages, setValidateMessages] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isUserProfileSubmit, setIsUserProfileSubmit] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");


  console.log("addressLocation-------", addressLocation);
  console.log("addressLatLong-------", addressLatLong);

  useEffect(() => {
    console.log({ userDetails });
    //setIsLoading(true);
    if (userDetails) {
      if (userDetails?.is_profile_complete) {
        navigate("/");
      }
      setUserData({
        ...userData,
        phoneCode: userDetails?.phone_code,
        phoneNumber: userDetails?.phone_number,
        loginType: userDetails?.login_type,
        email: userDetails?.email,
        firstName: userDetails?.first_name,
        lastName: userDetails?.last_name,
        address: userDetails?.address,
      });
    }
  }, [userDetails]);

  const handleInputChange = (event) => {
    const { name, value } = event?.target;
    const { errors } = validateCreateProfile(name, value);
    setErrorMessage("");
    setIsUserProfileSubmit(false);
    setValidateMessages((prev) => ({ ...prev, ...errors }));
    setUserData({ ...userData, [name]: value });
  };

  const handlePhoneInputChange = (value, name) => {
    // const { name, value } = event?.target;
    const { errors } = validateCreateProfile(name, value);
    setErrorMessage("");
    setIsUserProfileSubmit(false);
    setValidateMessages((prev) => ({ ...prev, ...errors }));
    setUserData({ ...userData, [name]: value });
  };
  const handleChangeSelect = (code) => {
    setUserData({ ...userData, phoneCode: code });
  };

  const handleSelectAddress = async (address) => {
    setAddressLocation(address);
    const results = await geocodeByAddress(address);
    const latLng = await getLatLng(results[0]);
    setAddressLatLong(latLng);
    // Extract city, country, and zip code from the result
    const addressComponents = results[0].address_components;
    const city = addressComponents.find((component) =>
      component.types.includes('locality')
    )?.long_name;
    const state = addressComponents.find((component) =>
      component.types.includes('administrative_area_level_1')
    )?.long_name;
    const country = addressComponents.find((component) =>
      component.types.includes('country')
    )?.long_name;
    const zipCode = addressComponents.find((component) =>
      component.types.includes('postal_code')
    )?.long_name;

    setAddressDetails({
      city: city || '',
      state: state || '',
      country: country || '',
      zipCode: zipCode || '',
    });

  };

  //console.log("origin-------------", origin);
  //console.log("pickUpLocationDetails-------------", pickUpLocationDetails);

  const handleUserProfileSubmit = async (selectedCity, zipCode) => {
    console.log("---------------selectedCity-----------", selectedCity);
    console.log("---------------zipcode-----------", zipCode);
    console.log("---------------addressDetails-----------", addressDetails);
    try {
      //setIsLoading(true);
      const { errors } = validateSubmitCreateProfile(userData, addressLocation);
      setIsUserProfileSubmit(true);
      console.log({ errors });
      setValidateMessages((prev) => ({
        ...errors,
      }));
      if (userData?.address && !addressDetails?.city) return toast.error("Please Enter proper location!");
      if (!zipCode && !addressDetails?.zipCode) return toast.error("Please Enter the Zipcode!");
      if (selectedCity?.length > 0 && addressDetails?.city !== selectedCity[0]?.name) return toast.error("Please Enter Correct Zipcode!");
      if (Object.keys(validateMessages)?.length === 0 && isUserProfileSubmit) {
        let prepareRequestBody = {
          phoneCode: userData?.phoneCode,
          phoneNumber: userData?.phoneNumber?.toString(),
          email: userData?.email,
          firstName: userData?.firstName,
          lastName: userData?.lastName,
          address: addressLocation,
          latitude: addressLatLong?.lat.toString(),
          longitude: addressLatLong?.lng.toString(),
          deviceType: userData?.deviceType,
          deviceToken: userData?.deviceToken,
          loginType: userData?.loginType,
        };
        const userDataResponse = await doFetchUserProfileCreate(
          prepareRequestBody
        );
        if (userDataResponse?.status === 200) {
          setValidateMessages({});
          const userDataDecode = JSON.parse(
            getDescryptionString(userDataResponse?.data?.data)
          );
          console.log({ userDataDecode });
          // setUserData({});
          setIsUserProfileSubmit(false);
          setIsLoading(false);
          dispatch({
            type: "STORE_AUTH_USER",
            payload: userDataDecode?.userDetails,
          });
          navigate("/");
        } else {
          setIsLoading(false);
          // toast.error(loginResponse?.data?.message);
          // setErrorMessage(loginResponse?.message);
        }
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      console.log({ error });
    }
  };


  return {
    isLoading,
    userData,
    errorMessage,
    validateMessages,
    handleInputChange,
    handleUserProfileSubmit,
    handlePhoneInputChange,
    handleChangeSelect,
    handleSelectAddress,
    addressLocation,
    setAddressLocation,
    addressDetails
  };
};
