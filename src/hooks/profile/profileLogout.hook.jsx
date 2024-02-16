import { useEffect, useState } from "react";
import { doFetchUserProfile, doLogoutProfile } from "../../actions";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDescryptionString } from "../../services";

export const useProfileLogoutHook = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [profileLogoutViewModal, setprofileLogoutViewModal] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const { userDetails } = useSelector((state) => state.storeAuthenticateReducer);

  useEffect(() => {
    try {
      fetchUserDetail();
    } catch (error) {
      console.error("Error", error);
    }
  }, []);

  const fetchUserDetail = async () => {
    if (userDetails == null) {
      const userDetailResponse = await doFetchUserProfile();
      if (userDetailResponse?.status === 200) {
        const userDetailData = JSON.parse(getDescryptionString(userDetailResponse?.data?.data));
        dispatch({
          type: "STORE_AUTH_USER",
          payload: userDetailData?.profile,
        });
      }
    }
  };

  const handleLogoutViewModal = () => {
    setprofileLogoutViewModal(true);
  };

  const handleLogoutCloseModal = () => {
    setIsDisabled(false);
    setprofileLogoutViewModal(false);
  };

  const handleLogoutSubmit = async () => {
    try {
      setIsDisabled(true);
      const profileLogoutResponse = await doLogoutProfile();
      if (profileLogoutResponse?.status === 200) {
        setIsDisabled(false);
        localStorage.removeItem("_token");
        handleLogoutCloseModal();
        navigate("/choose-auth");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return {
    isDisabled,
    userDetails,
    profileLogoutViewModal,
    handleLogoutSubmit,
    handleLogoutViewModal,
    handleLogoutCloseModal,
  };
};
