import { axiosApi } from "../../axios";

export const doFetchAllCities = async () => {
  try {
    const response = await axiosApi({
      method: "get",
      url: `v1/city/all`,
    });
    return response;
  } catch (error) {
    return error?.response;
  }
};

export const doFetchServiceList = async (currentPage, pageSize) => {
  try {
    const response = await axiosApi({
      method: "get",
      url: `v2/service?currentPage=${currentPage}&pageSize=${pageSize}`,
    });
    return response;
  } catch (error) {
    return error?.response;
  }
};

export const doFetchBookingCreate = async (data, isLastStep, bookingId, step, isAuth) => {
  try {
    const response = await axiosApi({
      method: "post",
      url: `${isAuth ? "v2" : "v3"}/booking/muvr-booking-service?isLastStep=${isLastStep}${bookingId && bookingId !== "" ? "&bookingId=" + bookingId : ""}&step=${step}`,
      data: data,
    });
    return response;
  } catch (error) {
    return error?.response;
  }
};

export const doFetchAllCategory = async (serviceId, currentPage, limit, isPopular, search) => {
  try {
    const response = await axiosApi({
      method: "get",
      url: `v1/category?serviceId=${serviceId}&currentPage=${currentPage}&pageSize=${limit}&isPopular=${isPopular}${search && search !== "" ? "&search=" + search : ""}`,
    });
    return response;
  } catch (error) {
    return error?.response;
  }
};

export const doFetchEditUserIdBooking = async (data) => {
  try {
    const response = await axiosApi({
      method: "put",
      url: `v1/booking/update`,
      data: data,
    });
    return response;
  } catch (error) {
    return error?.response;
  }
};

export const doFetchBookingDetail = async (bookingId, isAuth) => {
  try {
    const response = await axiosApi({
      method: "get",
      url: `${isAuth ? "v1" : "v3"}/booking/${bookingId}/view`,
    });
    return response;
  } catch (error) {
    return error?.response;
  }
};

export const doFetchAllVehicle = async (currentPage, limit, search) => {
  try {
    const response = await axiosApi({
      method: "get",
      url: `v1/vehicle${currentPage && currentPage !== "" ? "?currentPage=" + currentPage : ""}${limit && limit !== "" ? "&pageSize=" + limit : ""}${
        search && search !== "" ? "&search=" + search : ""
      }`,
    });
    return response;
  } catch (error) {
    console.log({ error });
    return error?.response;
  }
};

// v1/booking/all-details(moves)
export const doFetchBookingMovesList = async (dateType, serviceId, isAuth, sessionId) => {
  try {
    const response = await axiosApi({
      method: "get",
      url: `${isAuth ? "v1" : "v2"}/booking/all-details?dateType=${dateType}&serviceId=${serviceId}&sessionId=${sessionId}`,
    });
    return response;
  } catch (error) {
    console.log({ error });
    return error.response;
  }
};

export const doFetchDateTimeSlot = async (muvrId, date, timeZone) => {
  try {
    const response = await axiosApi({
      method: "get",
      url: `v1/booking/time-slot?muvrId[]=${muvrId}&pickupDate=${date}&timeZone=${timeZone}`,
    });
    return response;
  } catch (error) {
    console.log({ error });
    return error.response;
  }
};

// v1/favorite
export const doFetchAddFavoriteMuvr = async (data) => {
  try {
    const response = await axiosApi({
      method: "post",
      url: `v1/favorite`,
      data: data,
    });
    return response;
  } catch (error) {
    return error?.response;
  }
};

export const doGetFavMuvr = async () => {
  //console.log("doFetchBookingCreate data", data);
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

export const doCancleBooking = async (id, data) => {
  try {
    const response = await axiosApi({
      method: "post",
      url: `v1/booking/${id}/cancel`,
      data: data,
    });
    return response;
  } catch (error) {
    console.log({ error });
    return error?.response;
  }
};

export const doBringMuvrRequestToMyHomeTown = async (data, isAuth) => {
  try {
    const response = await axiosApi({
      method: "post",
      url: `${isAuth ? "v1" : "v2"}/user/request-city`,
      data: data,
    });
    return response;
  } catch (error) {
    console.log({ error });
    return error?.response;
  }
};

// v1/booking/get-delivery
export const doFetchTracking = async (bookingId) => {
  try {
    const response = await axiosApi({
      method: "get",
      url: `v1/booking/get-delivery/${bookingId}`,
    });
    return response;
  } catch (error) {
    console.log({ error });
    return error?.response;
  }
};

// v2/booking/tip/success
export const doFetchTipSuccess = async (data) => {
  try {
    const response = await axiosApi({
      method: "post",
      url: `v2/booking/tip/success`,
      data: data,
    });
    return response;
  } catch (error) {
    console.log({ error });
    return error?.response;
  }
};

// v2/booking/tip/fail
export const doFetchTipFail = async (data) => {
  try {
    const response = await axiosApi({
      method: "post",
      url: `v2/booking/tip/fail`,
      data: data,
    });
    return response;
  } catch (error) {
    console.log({ error });
    return error?.response;
  }
};
