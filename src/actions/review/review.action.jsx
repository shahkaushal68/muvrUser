import { axiosApi } from "../../axios";

export const doAddReview = async (data) => {
    try {
        const response = await axiosApi({
            method: "post",
            url: `v1/review`,
            data: data
        });
        return response;
    } catch (error) {
        console.log({ error });
        return error?.response;
    }
};