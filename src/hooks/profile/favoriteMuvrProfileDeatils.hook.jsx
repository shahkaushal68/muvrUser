import { useParams } from "react-router-dom"
import { doFetchMuvrProfileView } from "../../actions/profile/profile.action";
import { useEffect, useState } from "react";
import { getDescryptionString } from "../../services";

const useFavoriteMuvrProfileDetailsHook = () => {
    const { id } = useParams();
    const [muvrProfileDetail, setMuvrProfileDetail] = useState(null);
    const [fvrtMuvrModalOpen, setFvrtMuvrModalOpen] = useState(false);
    const [reviewPercentage, setReviewPercentage] = useState([
        { rating: 5, ratingCount: 0 },
        { rating: 4, ratingCount: 0 },
        { rating: 3, ratingCount: 0 },
        { rating: 2, ratingCount: 0 },
        { rating: 1, ratingCount: 0 },
    ]);

    const fetchFavMuvrDetails = async () => {
        const fetchFavMuvrDetailsResponse = await doFetchMuvrProfileView(id);
        if (fetchFavMuvrDetailsResponse?.status === 200) {
            const fetchFavMuvrDetailsData = JSON.parse(getDescryptionString(fetchFavMuvrDetailsResponse?.data?.data));
            setMuvrProfileDetail(fetchFavMuvrDetailsData)
        }
    }
    useEffect(() => {
        fetchFavMuvrDetails();
    }, [id])

    const onHandleClickBookMuvr = (value) => {
        setFvrtMuvrModalOpen(value)
    }


    //--------------------------Options Start---------------------------

    const recentOptions = [
        {
            label: "Most recent",
            value: "Most recent",
        },
        {
            label: "Top rated",
            value: "Top rated",
        },
        {
            label: "Lowest rated",
            value: "Lowest rated",
        },
    ];
    const serviceOptions = [
        {
            label: "All",
            value: "All",
        },
        {
            label: "Moves",
            value: "Moves",
        },
        {
            label: "Junk removal",
            value: "Junk removal",
        },
        {
            label: "Labor",
            value: "Labor",
        },
    ];

    const reviewSetList = () => {
        const reviewList = muvrProfileDetail?.muvrList?.rating_list;
        const ratingsList = reviewPercentage?.map((reviewData) => {
            const ratingCount = reviewList?.find((review) => review.rating === reviewData.rating)?.ratingCount || 0
            return {
                ...reviewData,
                ratingCount
            }
        })
        setReviewPercentage(ratingsList)
    }

    useEffect(() => {
        reviewSetList();
    }, [muvrProfileDetail])


    //----------------------------Option End---------------------------
    return {
        recentOptions,
        serviceOptions,
        muvrProfileDetail,
        fvrtMuvrModalOpen,
        reviewPercentage,
        onHandleClickBookMuvr,
    }
}

export default useFavoriteMuvrProfileDetailsHook;