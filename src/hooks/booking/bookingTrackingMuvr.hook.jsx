import { useEffect, useState } from "react";
import { doFetchBookingDetail, doFetchTracking } from "../../actions";
import { useParams } from "react-router-dom";
import { getDescryptionString } from "../../services";

export const useBookingTrackingMuvrHook = () => {
  const params = useParams();
  console.log(params);
  const [center, setCenter] = useState({});
  const [trackingInfo, setTrackingInfo] = useState({});
  const [bookingInfo, setBookingInfo] = useState({});
  const containerStyle = {
    width: "100%",
    height: "400px",
  };
  useEffect(() => {
    setCenter({ lat: 18.52043, lng: 73.856743 });
    fetchTrackingList();
    fetchBookingDetails();
  }, []);

  //   const center = useMemo(() => ({ lat: 18.52043, lng: 73.856743 }), []);

  const fetchTrackingList = async () => {
    const trackingResponse = await doFetchTracking(params?.booking_id);
    console.log(trackingResponse);
    if (trackingResponse?.status === 200) {
      const trackingData = JSON.parse(getDescryptionString(trackingResponse?.data?.data));
      console.log(trackingData);
      setTrackingInfo(trackingData?.booking);
    }
  };
  const fetchBookingDetails = async () => {
    const bookingResponse = await doFetchBookingDetail(params?.booking_id, localStorage.getItem("_token") ? true : false);
    if (bookingResponse?.status === 200) {
      const bookingData = JSON.parse(getDescryptionString(bookingResponse?.data?.data));
      console.log(bookingData);
      setBookingInfo(bookingData?.booking);
    }
  };

  return {
    containerStyle,
    center,
    trackingInfo,
    bookingInfo,
  };
};
