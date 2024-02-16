import { axiosApi } from "../../axios";

export const doFetchMuvrProfileView = async (id) => {
    try {
        const response = await axiosApi({
            method: "get",
            url: `v1/review/${id}/view`,
        });
        return response;
    } catch (error) {
        //console.log({ error });
        return error?.response;
    }
};

export const doFetchBugTypes = async () => {
    try {
        const response = await axiosApi({
            method: "get",
            url: `v1/bug/types`,
        });
        return response;
    } catch (error) {
        console.log({ error });
        return error?.response;
    }
};

export const doSubmitBugReport = async (data) => {
    try {
        const response = await axiosApi({
            method: "post",
            url: `v1/bug/add`,
            data: data
        });
        return response;
    } catch (error) {
        console.log({ error });
        return error?.response;
    }
};