import { axiosApi } from "../../axios";

export const doUploadImage = async (data) => {
  //console.log("doFetchBookingCreate data", data);
  try {
    const response = await axiosApi({
      method: "post",
      url: `v1/upload-image`,
      data: data,
    });
    return response;
  } catch (error) {
    console.log({ error });
    return error?.response;
  }
};

export const doDeleteImage = async (data) => {
  //console.log("doDeleteImage data", data);
  try {
    const response = await axiosApi({
      method: "delete",
      url: `v1/delete-image`,
      data: data,
    });
    return response;
  } catch (error) {
    console.log({ error });
    return error?.response;
  }
};

export const doAddCard = async (data) => {
  //console.log("addCard data", data);
  try {
    const response = await axiosApi({
      method: "post",
      url: `v1/card/add`,
      data: data,
    });
    return response;
  } catch (error) {
    console.log({ error });
    return error?.response;
  }
};

export const doViewCards = async () => {
  try {
    const response = await axiosApi({
      method: "get",
      url: `v1/card/view`,
    });
    return response;
  } catch (error) {
    console.log({ error });
    return error?.response;
  }
};

export const doEditCards = async (cardId, data) => {
  try {
    const response = await axiosApi({
      method: "post",
      url: `/v1/card/${cardId}/update`,
      data: data,
    });
    return response;
  } catch (error) {
    console.log({ error });
    return error?.response;
  }
};

export const doDeleteCard = async (cardId) => {
  try {
    const response = await axiosApi({
      method: "delete",
      url: `v1/card/${cardId}/delete`,
    });
    return response;
  } catch (error) {
    console.log({ error });
    return error?.response;
  }
};

export const doGetCountry = async (countryName) => {
    try {
        const response = await axiosApi({
            method: "get",
            url: `v1/country?name=${countryName}`,
        });
        return response;
    } catch (error) {
        console.log({ error });
        return error?.response;
    }
};

export const doGetState = async (stateName, countryId) => {
    try {
        const response = await axiosApi({
            method: "get",
            url: `v1/state?name=${stateName}&countryId=${countryId}`,
        });
        return response;
    } catch (error) {
        console.log({ error });
        return error?.response;
    }
}

export const doGetCity = async (cityName, stateID) => {
    try {
        const response = await axiosApi({
            method: "get",
            url: `v1/city-list/${stateID}?name=${cityName}`,
        });
        return response;
    } catch (error) {
        //console.log({ error });
        return error?.response;
    }
}