import { useEffect, useState } from "react";
import { validateDeleteRequest, validateSubmitDeleteRequest } from "../../validations";
import { toast } from "react-toastify";
import { doFetchAccountDeleteRequest } from "../../actions";

export const useAccountDeleteRequest = () => {
  const initialData = {
    loginType: "phone",
    phoneCode: "+1",
  };
  const [isLoading, setIsLoading] = useState(false);
  const [loginData, setLoginData] = useState(initialData);
  const [validateMessages, setValidateMessages] = useState({});
  const [isRequestFavoriteMuvrModalOpen, setIsRequestFavoriteMuvrModalOpen] = useState(false);

  const [isLoginSubmit, setIsLoginSubmit] = useState(false);

  const handleInputChange = async (event) => {
    const { name, value } = event?.target;
    const { errors } = await validateDeleteRequest(name, value, name);
    setIsLoginSubmit(false);
    setValidateMessages(errors);
    setLoginData({ ...loginData, [name]: value, loginType: name });
  };

  const handlePhoneInputChange = async (value, name) => {
    const { errors } = await validateDeleteRequest(value, name, name);
    setIsLoginSubmit(false);
    setValidateMessages(errors);
    setLoginData({ ...loginData, [name]: value, loginType: name });
  };
  const handleChangeSelect = (code) => {
    setLoginData({ ...loginData, phoneCode: code });
  };

  const handleLoginSubmit = () => {
    try {
      setIsLoading(true);
      const { errors } = validateSubmitDeleteRequest(loginData);
      setIsLoginSubmit(true);

      setValidateMessages((prev) => ({
        ...errors,
      }));
    } catch (error) {
      setIsLoading(false);
      console.log({ error });
    }
  };
  const handleReqestMuvrModalClose = () => {
    setIsLoading(false);
    setIsRequestFavoriteMuvrModalOpen(false);
  };

  useEffect(() => {
    if (Object.keys(validateMessages).length === 0 && isLoginSubmit && (loginData?.phone !== "" || loginData?.email !== "")) {
      setIsRequestFavoriteMuvrModalOpen(true);
    } else {
      setIsLoading(false);
    }
  }, [validateMessages]);

  const handleClickRequestAccountDelete = async () => {
    setIsLoading(true);
    let deleteRequestPayload = {
      loginType: loginData?.loginType,
    };
    if (loginData?.loginType === "phone") {
      deleteRequestPayload.phoneCode = loginData?.phoneCode;
      deleteRequestPayload.phoneNumber = loginData?.phone;
    } else {
      deleteRequestPayload.email = loginData?.email;
    }
    try {
      const deleteRequestResponse = await doFetchAccountDeleteRequest(deleteRequestPayload);
      if (deleteRequestResponse?.status === 200) {
        setLoginData(initialData);
        toast.success(deleteRequestResponse?.data?.message);
      } else {
        setLoginData(initialData);
        toast.error(deleteRequestResponse?.data?.message);
      }
      handleReqestMuvrModalClose();

      setValidateMessages({});
      setIsLoginSubmit(false);
    } catch (error) {
      console.log(error);
    }
    // handleReqestMuvrModalClose();
    // setIsLoading(false);
    // toast.success("Your requested account will delete in 24 hours!");
  };

  return {
    isLoading,
    loginData,
    validateMessages,
    isRequestFavoriteMuvrModalOpen,
    handleReqestMuvrModalClose,
    handleInputChange,
    handleChangeSelect,
    handlePhoneInputChange,
    handleLoginSubmit,
    handleClickRequestAccountDelete,
  };
};
