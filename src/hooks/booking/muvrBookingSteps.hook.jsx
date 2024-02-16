import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { getDescryptionString } from "../../services";
import { doFetchBookingDetail } from "../../actions";
import { useEffect, useState } from "react";

export const useMuvrBookingStepsHook = () => {
  const { bookingCreateFormData } = useSelector((state) => state?.bookingReducer);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const [current, setCurrent] = useState(0);

  const previousStepToCurrent = () => {
    if (current !== 0) {
      setCurrent(current - 1);
    } else {
      navigate("/");
    }
  };
  useEffect(() => {
    const bookingId = searchParams.get("bookingId");
    if (!bookingId) {
      navigate("/");
      return;
    }
    fetchBookingDetail(bookingId);
  }, [searchParams, dispatch]);

  const fetchBookingDetail = async (bookingId) => {
    const bookingDetailResponces = await doFetchBookingDetail(bookingId, localStorage.getItem("_token") ? true : false);
    //console.log("bookingDetailResponces", { bookingDetailResponces });
    if (bookingDetailResponces?.status === 200) {
      const bookingDetailData = JSON.parse(getDescryptionString(bookingDetailResponces?.data?.data));
      console.log("bookingDetailData based On Booking Id", bookingDetailData);
      // prepareBookingData.bookingId = resAddLocation?.data?.data?.booking?.id;
      const bookingData = {
        // acceptedByName: bookingDetailData?.booking?.accepted_by_name,
        amount: bookingDetailData?.booking?.amount,
        bookingCancel: bookingDetailData?.booking?.bookingCancel,
        bookingImages: bookingDetailData?.booking?.bookingImages,
        bookingItems: bookingDetailData?.booking?.bookingItems,
        bookingMuvrs: bookingDetailData?.booking?.bookingMuvrs,
        bookingNumber: bookingDetailData?.booking?.booking_number,
        customerSignature: bookingDetailData?.booking?.customer_signature,
        deliveryStatus: bookingDetailData?.booking?.delivery_status,
        discount: bookingDetailData?.booking?.discount,
        distance: bookingDetailData?.booking?.distance,
        donatedLatitude: bookingDetailData?.booking?.donated_latitude,
        donatedLocation: bookingDetailData?.booking?.donated_location,
        donatedLongitude: bookingDetailData?.booking?.donated_longitude,
        dropoffLocation: bookingDetailData?.booking?.dropoff_location,
        dropoffLatitude: bookingDetailData?.booking?.dropoff_latitude,
        dropoffLongitude: bookingDetailData?.booking?.dropoff_longitude,
        dropoffNotes: bookingDetailData?.booking?.dropoff_notes,
        id: bookingDetailData?.booking?.id,
        isCustomerPresent: bookingDetailData?.booking?.is_customer_present,
        isDonated: bookingDetailData?.booking?.is_donated,
        isHelp: bookingDetailData?.booking?.is_help,
        noOfHours: bookingDetailData?.booking?.no_of_hours,
        noOfMuvr: bookingDetailData?.booking?.no_of_muvr,
        noOfStairs: bookingDetailData?.booking?.no_of_stairs,
        payments: bookingDetailData?.booking?.payments,
        perMovesPrice: bookingDetailData?.booking?.per_moves_price,
        pickupDate: bookingDetailData?.booking?.pickup_date,
        pickupDiscountPrice: bookingDetailData?.booking?.pickup_discount_price,
        pickupLocation: bookingDetailData?.booking?.pickup_location,
        pickupLongitude: bookingDetailData?.booking?.pickup_longitude,
        pickupLatitude: bookingDetailData?.booking?.pickup_latitude,
        pickupNotes: bookingDetailData?.booking?.pickup_notes,
        pickupTime: bookingDetailData?.booking?.pickup_time,
        pickupType: bookingDetailData?.booking?.pickup_type,
        serviceId: bookingDetailData?.booking?.service_id,
        specialInstruction: bookingDetailData?.booking?.special_instruction,
        stairsPrice: bookingDetailData?.booking?.stairs_price,
        status: bookingDetailData?.booking?.status,
        step: bookingDetailData?.booking?.step,
        totalMoverCount: bookingDetailData?.booking?.totalMoverCount,
        userId: bookingDetailData?.booking?.user_id,
        vehicle: bookingDetailData?.booking?.vehicle,
        vehicleId: bookingDetailData?.booking?.vehicle_id,
        workDescription: bookingDetailData?.booking?.work_description,
        sessionId: bookingDetailData?.booking?.session_id,
      };
      if (bookingData?.step) {
        setCurrent(bookingData?.step - 1);
      } else {
        setCurrent(0);
      }

      dispatch({
        type: "STORE_BOOKING_FORM_DATA",
        payload: bookingData,
      });
    }
  };

  const successResponse = () => {
    const updatedCount = current + 1;
    setCurrent(updatedCount);
  };

  return {
    navigate,
    dispatch,
    searchParams,
    bookingCreateFormData,
    current,
    previousStepToCurrent,
    successResponse,
  };
};
