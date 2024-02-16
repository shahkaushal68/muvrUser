import { axiosApi } from "../../axios";

export const doFetchUserProfileCreate = async (data) => {
  try {
    const response = await axiosApi({
      method: "post",
      url: `v1/user/profile`,
      data: data,
    });
    return response;
  } catch (error) {
    console.log({ error });
    return error?.response;
  }
};

export const doFetchUserProfile = async (data) => {
  try {
    const response = await axiosApi({
      method: "get",
      url: `v1/user/view-profile`,
    });
    return response;
  } catch (error) {
    console.log({ error });
    return error?.response;
  }
};

// v1/user/logout
export const doLogoutProfile = async () => {
  try {
    const response = await axiosApi({
      method: "post",
      url: `v1/user/logout`,
    });
    return response;
  } catch (error) {
    console.log({ error });
    return error?.response;
  }
};

// v1/favorite/view
export const doFetchAllFavouriteMuvr = async () => {
  try {
    const response = await axiosApi({
      method: "get",
      url: `v1/favorite/view`,
    });
    return response;
  } catch (error) {
    console.log({ error });
    return error?.response;
  }
};

// v1/pages
export const doFetchHelpPagesList = async () => {
  try {
    const response = await axiosApi({
      method: "get",
      url: `v1/pages`,
    });
    return response;
  } catch (error) {
    console.log({ error });
    return error?.response;
  }
};

// v1/page/slug
export const doFetchPagesContent = async (pathname) => {
  try {
    const response = await axiosApi({
      method: "get",
      url: `v1/page${pathname}`,
    });
    return response;
  } catch (error) {
    console.log({ error });
    return error?.response;
  }
};

// v1/user/profile/update
export const doEditProfile = async (data) => {
  try {
    const response = await axiosApi({
      method: "put",
      url: `v1/user/profile/update`,
      data: data,
    });
    return response;
  } catch (error) {
    console.log({ error });
    return error?.response;
  }
};

// /v1/user/delete-account
export const doDeleteAccount = async () => {
  try {
    const response = await axiosApi({
      method: "post",
      url: `v1/user/delete-account`,
    });
    return response;
  } catch (error) {
    console.log({ error });
    return error?.response;
  }
};

// v1/user/change-email-phone/send-otp
export const doChangeUserPhoneEmailDetails = async (data) => {
  try {
    const response = await axiosApi({
      method: "post",
      url: `v1/user/change-email-phone/send-otp`,
      data: data,
    });
    return response;
  } catch (error) {
    console.log({ error });
    return error?.response;
  }
};
export const doChangePhoneEmailOtpVerify = async (data) => {
  try {
    const response = await axiosApi({
      method: "put",
      url: `v1/user/change-email-phone/verify`,
      data: data,
    });
    return response;
  } catch (error) {
    console.log({ error });
    return error?.response;
  }
};

// v1/user-account-delete
export const doFetchAccountDeleteRequest = async (data) => {
  try {
    const response = await axiosApi({
      method: "post",
      url: "v1/user-account-delete",
      data: data,
    });
    return response;
  } catch (error) {
    console.log(error);
    return error?.response;
  }
};
