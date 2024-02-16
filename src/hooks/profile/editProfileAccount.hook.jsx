import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { doDeleteImage, doEditProfile, doFetchUserProfile, doUploadImage } from "../../actions";
import { getDescryptionString } from "../../services";
import { validateEditProfile, validateSubmitEditProfile } from "../../validations";

export const useEditProfileAccountHook = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isDisabled, setIsDisabled] = useState(false);
  const [validationMessages, setValidationMessages] = useState({});
  const [profileData, setProfileData] = useState({});
  const [isProfileSubmit, setIsProfileSubmit] = useState(false);

  const { userDetails } = useSelector((state) => state.storeAuthenticateReducer);

  useEffect(() => {
    try {
      fetchUserDetail();
      setProfileData(userDetails);
    } catch (error) {
      console.error("Error", error);
    }
  }, [userDetails]);

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
  };

  const handleFielInputChange = (event) => {
    let reader = new FileReader();
    let file = event?.target?.files[0];
    reader.onloadend = async () => {
      try {
        const base64Url = reader.result;
        const uploadImagePayload = {
          image: base64Url,
          folderName: "documents",
        };
        const imageUploadResponse = await doUploadImage(uploadImagePayload);
        if (imageUploadResponse.status === 200) {
          let uplodedImageName = profileData.profile_image;
          if (uplodedImageName) {
            try {
              const deleteImagePayload = {
                image: uplodedImageName,
                folderName: "documents",
              };

              const deleteImageResponse = await doDeleteImage(deleteImagePayload);
              if (deleteImageResponse.status === 200) {
              }
            } catch (error) {
              console.log(error);
            }
            setProfileData({ ...profileData, profile_image: imageUploadResponse?.data?.data?.imageName, baseImage: reader.result });
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    reader.readAsDataURL(file);

  };

  const handleInputChange = (event) => {
    const { name, value } = event?.target;
    const { errors } = validateEditProfile(name, value);
    setIsDisabled(false);
    setIsProfileSubmit(false);
    setValidationMessages(errors);
    setProfileData({ ...profileData, [name]: value });
  };

  useEffect(() => {
    if (Object.keys(validationMessages).length === 0 && isProfileSubmit) {
      callback();
    } else {
      setIsDisabled(false);
    }
  }, [validationMessages]);

  const handleEditProfileSubmit = () => {
    try {
      setIsDisabled(true);
      const { errors } = validateSubmitEditProfile(profileData);
      setIsProfileSubmit(true);

      setValidationMessages((prev) => ({
        ...errors,
      }));
    } catch (error) {
      console.log({ error });
      setIsDisabled(false);
    }
  };

  const callback = async () => {
    try {
      if (Object.keys(validationMessages).length === 0 && isProfileSubmit) {
        const profilePayload = {
          firstName: profileData?.first_name,
          lastName: profileData?.last_name,
          profileImage: profileData?.profile_image?.includes("http") ? "" : profileData?.profile_image,
        };
        if (profileData?.baseImage) {
          delete profileData?.baseImage;
        }

        const editProfileResponse = await doEditProfile(profilePayload);
        if (editProfileResponse?.status === 200) {
          const editProfileData = JSON.parse(getDescryptionString(editProfileResponse?.data?.data));
          dispatch({
            type: "STORE_AUTH_USER",
            payload: editProfileData,
          });
          setIsDisabled(false);
          setProfileData({});
          setIsProfileSubmit(false);
          navigate("/profile");
        }
      } else {
        setIsDisabled(false);
      }
    } catch (error) {
      setIsDisabled(false);
      console.log({ error });
    }
  };

  return {
    isDisabled,
    validationMessages,
    profileData,
    handleFielInputChange,
    handleInputChange,
    handleEditProfileSubmit,
  };
};
