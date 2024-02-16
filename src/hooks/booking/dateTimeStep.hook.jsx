import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { doFetchBookingCreate, doFetchDateTimeSlot } from "../../actions";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getDescryptionString } from "../../services";
import moment from "moment";

export const useDateTimeStepHook = (successResponse, current) => {
  const { bookingCreateFormData } = useSelector((state) => state?.bookingReducer);

  const [timeSlotList, setTimeSlotList] = useState([]);
  const dispatch = useDispatch();
  const [selectDate, setSelectDateDate] = useState();
  const [selectTime, setSelectTime] = useState();
  const [searchParams] = useSearchParams();
  const currentDate = new Date();

  const threeMonthsLater = new Date(currentDate.getFullYear(), currentDate.getMonth() + 3, currentDate.getDate());

  useEffect(() => {
    const pickupDate = bookingCreateFormData?.pickupDate || moment().format("YYYY-MM-DD");
    setSelectDateDate(pickupDate);
    setSelectTime(bookingCreateFormData?.pickupTime || []);
    fetchDateTImeSlot(pickupDate);
  }, [bookingCreateFormData]);

  const fetchDateTImeSlot = async (date) => {
    let muvrIds = [];
    bookingCreateFormData?.bookingMuvrs?.length > 0 &&
      bookingCreateFormData?.bookingMuvrs?.forEach((muvrItem, muvrIndex) => {
        muvrIds.push(muvrItem?.muvr_id);
      });
    console.log(muvrIds, muvrIds.join(","));
    const combinedMuvrIds = muvrIds.join(",");

    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const dateTimeSlotResponse = await doFetchDateTimeSlot(combinedMuvrIds, date, timeZone);
    if (dateTimeSlotResponse?.status === 200) {
      const dateTimeSlotData = JSON.parse(getDescryptionString(dateTimeSlotResponse?.data?.data));
      console.log(dateTimeSlotData);
      setTimeSlotList(dateTimeSlotData?.timeSlots);
    }
  };

  // handleDateChange
  const handleDateChange = async (newDate) => {
    const date = new Date(newDate);
    setSelectDateDate(moment(date).format("YYYY-MM-DD"));
    fetchDateTImeSlot(moment(date).format("YYYY-MM-DD"));
  };

  // handleTimeChange
  const handleTimeChange = (e) => {
    setSelectTime(e.target.value);
  };

  // prepareReduxStoreData
  const prepareReduxStoreData = (updateStep = false) => {
    const prepareSelectDateTimeStep = {
      ...bookingCreateFormData,
      pickupDate: selectDate,
      pickupTime: selectTime,
      step: current + 1,
    };

    dispatch({
      type: "STORE_BOOKING_FORM_DATA",
      payload: prepareSelectDateTimeStep,
    });
  };

  // Click On Next Button
  const handleClickOnNextButton = async () => {
    console.log(selectTime);
    const fifthStepPreapareData = {
      pickupDate: selectDate,
      pickupTime: selectTime,
      step: current + 1,
    };

    if (!selectDate) {
      toast.error("Please Select Date!");
    } else if (selectTime?.length <= 0) {
      toast.error("Please Select time Slot!");
    } else {
      const bookingCreateResponse = await doFetchBookingCreate(
        fifthStepPreapareData,
        false,
        searchParams.get("bookingId"),
        current + 1,
        localStorage.getItem("_token") ? true : false
      );

      if (bookingCreateResponse?.status === 200) {
        prepareReduxStoreData();
        successResponse();
      }
    }
  };

  return {
    selectDate,
    handleDateChange,
    selectTime,
    handleTimeChange,
    handleClickOnNextButton,
    timeSlotList,
    threeMonthsLater,
  };
};
