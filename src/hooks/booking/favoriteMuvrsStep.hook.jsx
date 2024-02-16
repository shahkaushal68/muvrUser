import { useSearchParams } from "react-router-dom";
import { doFetchBookingCreate, doGetFavMuvr } from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { getDescryptionString } from "../../services";
import { toast } from "react-toastify";

const requestOptions = [
  {
    label: "I'm happy to wait as long as necessary for their response.",
    value: "WAIT_FOR_MUVR_RESPONSE.",
  },
  {
    label: "Continue with any Muvr",
    value: "CONTINUE",
  },
  {
    label: "Cancel my booking",
    value: "CANCEL",
  },
];

export const useFavoriteMuvrsStep = (successResponse, current) => {
  const dispatch = useDispatch();

  const { bookingCreateFormData } = useSelector((state) => state?.bookingReducer);
  console.log(bookingCreateFormData);
  const [searchParams] = useSearchParams();
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [selectedHelper, setSelectedHelper] = useState(null);
  const [allFavouriteMuvrs, setAllFavouriteMuvrs] = useState(null);
  const [isRequestFavoriteMuvrModalOpen, setIsRequestFavoriteMuvrModalOpen] = useState(false);
  const [selectedBookingMuvrs, setSelectedBookingMuvrs] = useState([]);
  const [tabkey, setTabkey] = useState("1");
  const [selectedBookingPopupValue, setSelectedBookingPopupValue] = useState("");

  const fetchFavMuvr = async () => {
    const favrMuvrResponse = await doGetFavMuvr();
    if (favrMuvrResponse?.status === 200) {
      const favrMuvrResponseData = JSON.parse(getDescryptionString(favrMuvrResponse?.data?.data));
      setAllFavouriteMuvrs(favrMuvrResponseData);
    }
  };
  useEffect(() => {
    if (localStorage?.getItem("_token")) {
      fetchFavMuvr();
    }
  }, []);

  const handleClickSelectDriver = (data) => {
    setSelectedDriver(data);
  };

  const handleClickSelectHelper = (data) => {
    setSelectedHelper(data);
  };

  const handleTabChange = (key) => {
    setTabkey(key);
  };

  const handleFavouriteMuverModal = (tab, value) => {
    setIsRequestFavoriteMuvrModalOpen(value);
  };
  const handleRadioButtonChange = (event) => {
    setSelectedBookingPopupValue(event.target.value);
  };

  const handleConfirm = async () => {
    let bookingMuvers = [...selectedBookingMuvrs];
    if (tabkey === "1" && selectedBookingPopupValue) {
      if (bookingCreateFormData?.bookingMuvrs?.length > 0) {
        setIsRequestFavoriteMuvrModalOpen(false);
        setSelectedBookingPopupValue("");
        setTabkey("2");
        setSelectedDriver({ ...selectedDriver, selectedBookingPopupValue });
      } else {
        setIsRequestFavoriteMuvrModalOpen(false);
        setSelectedBookingPopupValue("");
        setTabkey("2");
        setSelectedDriver({ ...selectedDriver, selectedBookingPopupValue });
      }
    } else if (tabkey === "2" && selectedBookingPopupValue) {
      if (bookingCreateFormData?.bookingMuvrs?.length > 0) {
        const saveBookingMuvrs = bookingCreateFormData?.bookingMuvrs;
        let checkWhichDataIsPresent = [];
        const checkIsDriverPresent = saveBookingMuvrs?.find((el) => el.type === "driver");
        const checkIsHelperPresent = saveBookingMuvrs?.find((el) => el.type === "helper");

        (selectedDriver !== null || checkIsDriverPresent !== undefined) &&
          checkWhichDataIsPresent.push({
            muvrId: selectedDriver?.id || checkIsDriverPresent?.muvr_id,
            type: selectedDriver?.userRole?.subRole?.name || checkIsDriverPresent?.type,
            isPersonalRequest: true,
            muvrRequest: selectedBookingPopupValue || checkIsDriverPresent?.muvr_request,
          });

        (selectedHelper !== null || checkIsHelperPresent !== undefined) &&
          checkWhichDataIsPresent.push({
            muvrId: selectedHelper?.id || checkIsHelperPresent?.muvr_id,
            type: selectedHelper?.userRole?.subRole?.name || checkIsHelperPresent?.type,
            isPersonalRequest: true,
            muvrRequest: selectedBookingPopupValue || checkIsHelperPresent?.muvr_request,
          });

        const forthStepPreapareData = {
          bookingMuvrList: checkWhichDataIsPresent,
          step: current + 1,
        };
        const bookingCreateResponse = await doFetchBookingCreate(
          forthStepPreapareData,
          false,
          searchParams.get("bookingId"),
          current + 1,
          localStorage.getItem("_token") ? true : false
        );
        if (bookingCreateResponse?.status === 200) {
          const prepareBookingDataSelectItemStep = {
            ...bookingCreateFormData,
            bookingMuvrs: checkWhichDataIsPresent,
            step: current + 1,
          };
          dispatch({
            type: "STORE_BOOKING_FORM_DATA",
            payload: prepareBookingDataSelectItemStep,
          });
          successResponse();
        }
      } else {
        const checkPreapareData = [];
        selectedDriver !== null &&
          checkPreapareData?.push({
            muvrId: selectedDriver?.id,
            type: selectedDriver?.userRole?.subRole?.name,
            isPersonalRequest: true,
            muvrRequest: selectedBookingPopupValue,
          });
        selectedHelper !== null &&
          checkPreapareData?.push({
            muvrId: selectedHelper?.id,
            type: selectedHelper?.userRole?.subRole?.name,
            isPersonalRequest: true,
            muvrRequest: selectedBookingPopupValue,
          });
        const forthStepPreapareData = {
          bookingMuvrList: checkPreapareData,
          step: current + 1,
        };
        const bookingCreateResponse = await doFetchBookingCreate(forthStepPreapareData, false, searchParams.get("bookingId"), current + 1);
        if (bookingCreateResponse?.status === 200) {
          const prepareBookingDataSelectItemStep = {
            ...bookingCreateFormData,
            bookingMuvrs: checkPreapareData,
            step: current + 1,
          };
          dispatch({
            type: "STORE_BOOKING_FORM_DATA",
            payload: prepareBookingDataSelectItemStep,
          });
          successResponse();
        }
      }
    } else {
      toast.error("Please Select Option first!");
    }
    setSelectedBookingMuvrs(bookingMuvers);
  };

  const handleClickOnSkipButton = async () => {
    if (bookingCreateFormData?.bookingMuvrs?.length > 0) {
      if (tabkey === "1") {
        successResponse();
      } else if (tabkey === "2") {
        const saveBookingMuvrs = bookingCreateFormData?.bookingMuvrs;
        let checkWhichDataIsPresent = [];
        const checkIsDriverPresent = saveBookingMuvrs?.find((el) => el.type === "driver");
        const checkIsHelperPresent = saveBookingMuvrs?.find((el) => el.type === "helper");

        (selectedDriver !== null || checkIsDriverPresent !== undefined) &&
          checkWhichDataIsPresent.push({
            muvrId: selectedDriver?.id || checkIsDriverPresent?.muvr_id,
            type: selectedDriver?.userRole?.subRole?.name || checkIsDriverPresent?.type,
            isPersonalRequest: true,
            muvrRequest: selectedDriver?.selectedBookingPopupValue || checkIsDriverPresent?.muvr_request,
          });

        (selectedHelper !== null || checkIsHelperPresent !== undefined) &&
          checkWhichDataIsPresent.push({
            muvrId: selectedHelper?.id || checkIsHelperPresent?.muvr_id,
            type: selectedHelper?.userRole?.subRole?.name || checkIsHelperPresent?.type,
            isPersonalRequest: true,
            muvrRequest: selectedBookingPopupValue || checkIsHelperPresent?.muvr_request,
          });

        const forthStepPreapareData = {
          bookingMuvrList: checkWhichDataIsPresent,
          step: current + 1,
        };
        const bookingCreateResponse = await doFetchBookingCreate(forthStepPreapareData, false, searchParams.get("bookingId"), current + 1);
        if (bookingCreateResponse?.status === 200) {
          const prepareBookingDataSelectItemStep = {
            ...bookingCreateFormData,
            bookingMuvrs: checkWhichDataIsPresent,
            step: current + 1,
          };
          dispatch({
            type: "STORE_BOOKING_FORM_DATA",
            payload: prepareBookingDataSelectItemStep,
          });
          successResponse();
        }
      }
    } else {
      successResponse();
    }
  };

  const clickOnNextButton = async () => {
    if (bookingCreateFormData?.bookingMuvrs?.length > 0) {
      successResponse();
    } else {
      const forthStepPreapareData = {
        bookingMuvrList: [],
        step: current + 1,
      };
      const bookingCreateResponse = await doFetchBookingCreate(forthStepPreapareData, false, searchParams.get("bookingId"), current + 1);
      if (bookingCreateResponse?.status === 200) {
        const prepareBookingDataSelectItemStep = {
          ...bookingCreateFormData,
          bookingMuvrs: [],
          step: current + 1,
        };
        dispatch({
          type: "STORE_BOOKING_FORM_DATA",
          payload: prepareBookingDataSelectItemStep,
        });
        successResponse();
      }
    }
  };

  return {
    bookingCreateFormData,
    clickOnNextButton,
    allFavouriteMuvrs,
    selectedDriver,
    selectedHelper,
    handleClickSelectDriver,
    handleClickSelectHelper,
    isRequestFavoriteMuvrModalOpen,
    handleFavouriteMuverModal,
    requestOptions,
    handleRadioButtonChange,
    handleTabChange,
    tabkey,
    handleConfirm,
    selectedBookingPopupValue,
    selectedBookingMuvrs,
    handleClickOnSkipButton,
  };
};
