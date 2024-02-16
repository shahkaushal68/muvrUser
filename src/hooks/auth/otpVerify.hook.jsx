import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { doChangePhoneEmailOtpVerify, doFetchEditUserIdBooking, doFetchOTPVerify } from "../../actions";
import { setAuthHeader } from "../../axios";
import { getDescryptionString } from "../../services";

export const useOTPVerifyHook = () => {
  const { authUserDetails } = useSelector((state) => state.storeAuthenticateReducer);
  const { bookingCreateFormData } = useSelector((state) => state?.bookingReducer);
  const { changeUserDetails } = useSelector((state) => state.storeAuthenticateReducer);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [otp, setOtp] = useState("");
  const [isCodeSendMethod, setIsCodeSendMethod] = useState(false);
  const [isBookingData, setIsBookingData] = useState(false);

  useEffect(() => {
    if (bookingCreateFormData) {
      setIsBookingData(true);
    }
  }, []);

  useEffect(() => {
    if (authUserDetails === null) {
      navigate("/authentication/login");
    }
  }, [authUserDetails, changeUserDetails]);

  const handleSubmitClick = async () => {
    setIsLoading(true);
    if (otp?.length === 6) {
      // doFetchOTPVerify
      let loginResponse;
      setErrorMessage("");
      let prepareRequestBody = {
        otp: otp,
      };
      if (authUserDetails) {
        prepareRequestBody.loginType = authUserDetails?.loginType;
        if (authUserDetails?.loginType === "phone") {
          prepareRequestBody.phoneCode = authUserDetails?.phoneCode;
          prepareRequestBody.phoneNumber = authUserDetails?.phoneNumber;
        } else {
          prepareRequestBody.email = authUserDetails?.email;
        }
        loginResponse = await doFetchOTPVerify(prepareRequestBody);
      } else {
        prepareRequestBody.changeType = changeUserDetails?.changeType;
        if (changeUserDetails?.changeType === "phone") {
          prepareRequestBody.phoneCode = changeUserDetails?.phoneCode;
          prepareRequestBody.phoneNumber = changeUserDetails?.phoneNumber;
        } else {
          prepareRequestBody.email = changeUserDetails?.email;
        }
        loginResponse = await doChangePhoneEmailOtpVerify(prepareRequestBody);
      }
      if (loginResponse?.status === 200) {
        const loginToken = JSON.parse(getDescryptionString(loginResponse?.data?.data));
        console.log({ loginToken });
        dispatch({
          type: "STORE_AUTH_USER",
          payload: loginToken?.userDetails,
        });
        setIsLoading(false);
        localStorage.setItem("_token", `${loginToken?.token}`);
        await setAuthHeader(`Bearer ${loginToken?.token}`);

        if (loginToken?.userDetails?.is_profile_complete) {
          if (isBookingData) {
            const bookingPayload = {
              sessionId: bookingCreateFormData?.sessionId,
              bookingId: bookingCreateFormData?.id,
              step: bookingCreateFormData?.step,
            };
            const editIdResponse = await doFetchEditUserIdBooking(bookingPayload);
            if (editIdResponse?.status === 200) {
              // console.log(JSON.parse(getDescryptionString(editIdResponse?.data?.data)));
              navigate(`/booking-steps?bookingId=${bookingCreateFormData?.id}`);
            }
          } else {
            navigate("/");
          }
        } else {
          navigate("/create-account");
        }
        // toast.success("Login success!");
      } else {
        setIsLoading(false);

        toast.error(loginResponse?.data?.message);
        setErrorMessage(loginResponse?.data?.message);
      }
    } else {
      setErrorMessage("Please enter OTP!");
    }
    setIsLoading(false);
  };

  return {
    otp,
    setOtp,
    isLoading,
    errorMessage,
    changeUserDetails,
    authUserDetails,
    isCodeSendMethod,
    setIsCodeSendMethod,
    handleSubmitClick,
  };
};
