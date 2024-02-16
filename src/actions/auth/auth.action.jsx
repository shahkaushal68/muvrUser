import { axiosApi } from "../../axios";

export const doFetchLogin = async (data) => {
  try {
    const response = await axiosApi({
      method: "post",
      url: `v1/user/login`,
      data: data,
    });
    return response;
  } catch (error) {
    console.log({ error });
    return error?.response;
  }
};

export const doFetchRegister = async (data) => {
  try {
    const response = await axiosApi({
      method: "post",
      url: `v1/user/register`,
      data: data,
    });
    return response;
  } catch (error) {
    console.log({ error });
    return error?.response;
  }
};

export const doFetchOTPVerify = async (data) => {
  try {
    const response = await axiosApi({
      method: "post",
      url: `v1/user/verify-otp`,
      data: data,
    });
    return response;
  } catch (error) {
    console.log({ error });
    return error?.response;
  }
};
