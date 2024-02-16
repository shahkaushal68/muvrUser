import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { doDeleteAccount, doFetchUserProfile } from "../../actions";
import { getDescryptionString } from "../../services";
import { useNavigate } from "react-router-dom";

export const useDeleteProfileAccountHook = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [profileDeleteViewModal, setprofileDeleteViewModal] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const { userDetails } = useSelector((state) => state.storeAuthenticateReducer);

  useEffect(() => {
    try {
      setLoading(true);
      fetchUserDetail();
    } catch (error) {
      console.error("Error", error);
    }
  }, []);

  const fetchUserDetail = async () => {
    if (userDetails === null) {
      const userDetailResponse = await doFetchUserProfile();
      if (userDetailResponse?.status === 200) {
        const userDetailData = JSON.parse(getDescryptionString(userDetailResponse?.data?.data));
        dispatch({
          type: "STORE_AUTH_USER",
          payload: userDetailData?.profile,
        });
      }
    }
    setLoading(false);
  };

  const handleDeleteViewModal = () => {
    setprofileDeleteViewModal(true);
  };

  const handleDeleteCloseModal = () => {
    setIsDisabled(false);
    setprofileDeleteViewModal(false);
  };
  const handleDeleteAccountSubmit = async () => {
    try {
      setIsDisabled(true);
      const profileLogoutResponse = await doDeleteAccount();
      if (profileLogoutResponse?.status === 200) {
        setIsDisabled(false);
        localStorage.removeItem("_token");
        handleDeleteCloseModal();
        navigate("/splash-user");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return {
    loading,
    isDisabled,
    userDetails,
    profileDeleteViewModal,
    handleDeleteViewModal,
    handleDeleteCloseModal,
    handleDeleteAccountSubmit,
  };
};
