import { axiosApi } from "../../axios";

export const doPayment = async (data) => {
  //console.log("data", data);
  try {
    const response = await axiosApi({
      method: "post",
      url: `v2/payment/add`,
      data: data,
    });
    return response;
  } catch (error) {
    console.log({ error });
    return error?.response;
  }
};

export const doPaymentSuccess = async (data) => {
  try {
    const response = await axiosApi({
      method: "post",
      url: "v2/payment/success",
      data: data,
    });
    return response;
  } catch (error) {
    console.log(error);
    return error?.response;
  }
};
export const doPaymentFail = async (data) => {
  try {
    const response = await axiosApi({
      method: "post",
      url: "v2/payment/fail",
      data: data,
    });
    return response;
  } catch (error) {
    console.log(error);
    return error?.response;
  }
};
