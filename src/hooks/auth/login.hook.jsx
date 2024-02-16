import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { doFetchLogin, doFetchRegister } from "../../actions";
import { getDescryptionString } from "../../services";
import { validateEmailLogin, validatePhoneLogin, validateSubmitLogin } from "../../validations";

export const useLoginHook = () => {
  const initialData = {
    loginType: "phone",
    isAgreement: true,
    phoneCode: "+1",
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const search = useLocation();

  const [isLoading, setIsLoading] = useState(false);
  const [loginData, setLoginData] = useState(initialData);
  const [validateMessages, setValidateMessages] = useState({});
  const [isLoginSubmit, setIsLoginSubmit] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isNotRegisteredModalOpen, setIsNotRegisteredModalOpen] = useState(false);

  const handleInputChange = async (event) => {
    const { name, value } = event?.target;
    const { errors } = await validateEmailLogin(name, value);
    console.log({ errors });
    setErrorMessage("");
    setIsLoginSubmit(false);
    setValidateMessages({ ...errors });
    setLoginData({ ...loginData, [name]: value });
  };

  const handlePhoneInputChange = async (value, name) => {
    const { errors } = await validatePhoneLogin(name, value);
    console.log(errors);
    setErrorMessage("");
    setIsLoginSubmit(false);
    setValidateMessages(errors);
    setLoginData({ ...loginData, [name]: value });
  };
  const handleLoginTypeChange = (value) => {
    if (value === "phone") {
      setLoginData({ ...loginData, loginType: "email" });
    } else {
      setLoginData({ ...loginData, loginType: "phone" });
    }
  };

  const handleChangeSelect = (code) => {
    setLoginData({ ...loginData, phoneCode: code });
  };
  const handleChangeCheckBox = (event) => {
    setLoginData({ ...loginData, isAgreement: !loginData?.isAgreement });
  };

  const handleLoginSubmit = () => {
    try {
      setIsLoading(true);
      const { errors } = validateSubmitLogin(loginData);
      setIsLoginSubmit(true);

      setValidateMessages((prev) => ({
        ...errors,
      }));
    } catch (error) {
      setIsLoading(false);
      console.log({ error });
    }
  };

  useEffect(() => {
    if (Object.keys(validateMessages).length === 0 && isLoginSubmit) {
      if (search?.pathname?.includes("login")) {
        callback();
      } else if (search?.pathname?.includes("register")) {
        registerCallback();
      }
    } else {
      setIsLoading(false);
    }
  }, [validateMessages]);

  const callback = async () => {
    if (Object.keys(validateMessages).length === 0 && isLoginSubmit) {
      let prepareRequestBody = {
        loginType: loginData?.loginType,
        isAgreement: loginData?.isAgreement,
      };
      if (loginData?.loginType === "phone") {
        prepareRequestBody.phoneCode = loginData?.phoneCode;
        prepareRequestBody.phoneNumber = loginData?.phoneNumber?.toString();
      } else {
        prepareRequestBody.email = loginData?.email;
      }
      console.log({ loginData });
      const loginResponse = await doFetchLogin(prepareRequestBody);
      if (loginResponse?.status === 200) {
        // const loginToken = JSON.parse(
        //   getDescryptionString(loginResponse?.data?.data)
        // );
        // console.log({ loginToken });
        dispatch({
          type: "STORE_AUTH_USER_DETAIL",
          payload: prepareRequestBody,
        });
        setValidateMessages({});
        setLoginData({});
        setIsLoginSubmit(false);
        setIsLoading(false);
        // localStorage.setItem("_token", `${loginToken?.token}`);
        // await setAuthHeader(`Bearer ${loginToken?.token}`);
        navigate("/otp-verify");
        // toast.success("Login success!");
      } else {
        setIsLoading(false);
        setIsNotRegisteredModalOpen(true);
        // toast.error(loginResponse?.data?.message);
        // setErrorMessage(loginResponse?.message);
      }
    } else {
      setIsLoading(false);
    }
  };
  const registerCallback = async () => {
    if (Object.keys(validateMessages).length === 0 && isLoginSubmit) {
      let prepareRequestBody = {
        loginType: loginData?.loginType,
        isAgreement: loginData?.isAgreement,
      };
      if (loginData?.loginType === "phone") {
        prepareRequestBody.phoneCode = loginData?.phoneCode;
        prepareRequestBody.phoneNumber = loginData?.phoneNumber?.toString();
      } else {
        prepareRequestBody.email = loginData?.email;
      }
      const loginResponse = await doFetchRegister(prepareRequestBody);
      if (loginResponse?.status === 200) {
        // const loginToken = JSON.parse(
        //   getDescryptionString(loginResponse?.data?.data)
        // );
        dispatch({
          type: "STORE_AUTH_USER_DETAIL",
          payload: prepareRequestBody,
        });
        setValidateMessages({});
        setLoginData({});
        setIsLoginSubmit(false);
        setIsLoading(false);
        // localStorage.setItem("_token", `${loginToken?.token}`);
        // await setAuthHeader(`Bearer ${loginToken?.token}`);
        navigate("/otp-verify");
        // toast.success("Login success!");
      } else {
        setIsLoading(false);
        setIsNotRegisteredModalOpen(true);
        // toast.error(loginResponse?.data?.message);
        // setErrorMessage(loginResponse?.message);
      }
    } else {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    loginData,
    errorMessage,
    validateMessages,
    handlePhoneInputChange,
    handleChangeSelect,
    handleInputChange,
    handleLoginSubmit,
    registerCallback,
    handleLoginTypeChange,
    isNotRegisteredModalOpen,
    setIsNotRegisteredModalOpen,
    handleChangeCheckBox,
  };
};
