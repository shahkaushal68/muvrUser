import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { validateEmailLogin, validatePhoneLogin, validateSubmitLogin } from "../../validations";
import { doChangeUserPhoneEmailDetails } from "../../actions";
import { useDispatch } from "react-redux";

export const useChangeEmailPhoneHook = () => {
  const { state } = useLocation();

  const initialData = {
    changeType: state?.changeType,
    phoneCode: "+1",
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isDisabled, setIsDisabled] = useState(false);
  const [editProfileData, setEditProfileData] = useState(initialData);
  const [isProfileSubmit, setIsProfileSubmit] = useState(false);
  const [validateMessages, setValidateMessages] = useState({});

  const handleInputChange = async (event) => {
    const { name, value } = event?.target;
    const { errors } = await validateEmailLogin(name, value);
    setIsProfileSubmit(false);
    setValidateMessages({ ...errors });
    setEditProfileData({ ...editProfileData, [name]: value });
  };

  const handlePhoneInputChange = async (value, name) => {
    const { errors } = await validatePhoneLogin(name, value);
    setIsProfileSubmit(false);
    setValidateMessages((prev) => ({ ...prev, ...errors }));
    setEditProfileData({ ...editProfileData, [name]: value });
  };
  const handleChangeSelect = (code) => {
    setEditProfileData({ ...editProfileData, phoneCode: code });
  };

  const handleLoginSubmit = () => {
    try {
      setIsDisabled(true);
      const { errors } = validateSubmitLogin(editProfileData);
      setIsProfileSubmit(true);

      setValidateMessages((prev) => ({
        ...errors,
      }));
    } catch (error) {
      setIsDisabled(false);
      console.log({ error });
    }
  };

  useEffect(() => {
    if (Object.keys(validateMessages).length === 0 && isProfileSubmit) {
      callback();
    } else {
      setIsDisabled(false);
    }
  }, [validateMessages]);

  const callback = async () => {
    if (Object.keys(validateMessages).length === 0 && isProfileSubmit) {
      let profilePayload = {
        changeType: editProfileData?.changeType,
      };
      if (editProfileData?.changeType === "phone") {
        profilePayload.phoneCode = editProfileData?.phoneCode;
        profilePayload.phoneNumber = editProfileData?.phoneNumber?.toString();
      } else {
        profilePayload.email = editProfileData?.email;
      }
      const changeProfilePayload = await doChangeUserPhoneEmailDetails(profilePayload);

      if (changeProfilePayload?.status === 200) {
        dispatch({
          type: "STORE_AUTH_USER_CHANGE_DETAILS",
          payload: profilePayload,
        });
        setIsDisabled(false);
        setEditProfileData({});
        setIsProfileSubmit(false);
        navigate("/verify-otp");
      }
    } else {
      setIsDisabled(false);
    }
  };

  return {
    state,
    isDisabled,
    editProfileData,
    validateMessages,
    handleInputChange,
    handlePhoneInputChange,
    handleChangeSelect,
    handleLoginSubmit,
  };
};
