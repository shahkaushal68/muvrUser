import { useEffect, useState } from "react";
import { getDescryptionString } from "../../services";
import { doCancleBooking, doDeleteImage, doFetchAddFavoriteMuvr, doFetchBookingCreate, doFetchBookingDetail, doUploadImage } from "../../actions";
import smileAvatar0 from "./../../assets/images/icons/smile-avatar-0.png";
import smileAvatar1 from "./../../assets/images/icons/smile-avatar-1.png";
import smileAvatar2 from "./../../assets/images/icons/smile-avatar-2.png";
import { useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { doAddReview } from "../../actions/review";
import { useDispatch, useSelector } from "react-redux";

export const useBookingMovesDetailsHook = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const { bookingList } = useSelector((state) => state?.bookingReducer);
  console.log(location);
  const params = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchParamData, setSearchParamData] = useState({
    dateType: "",
  });
  const [bookingDetails, setBookingDetails] = useState({});
  const [images, setImages] = useState([]);
  const [displayedImages, setDisplayedImages] = useState(6);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [itemPrice, setItemPrice] = useState({
    vehiclePrice: 0,
    mile_price: 0,
    stair_price: 0,
    totalSum: 0,
  });
  const [cancelBookingViewModal, setCancelBookingViewModal] = useState({
    modalTitle: "",
    isModal: false,
    isCancel: false,
    isConfirm: false,
  });
  const [muvrRatingTipViewModal, setMuvrRatingTipViewModal] = useState({
    modalTitle: "",
    isModal: false,
    isMuvrRate: false,
    isMuvrTip: false,
  });
  const [viewPaymentModal, setViewPaymentModal] = useState({
    modalTitle: "",
    isModal: false,
    isPayment: false,
  });
  const [editBookingData, setEditBookingData] = useState({});
  const [editBookingViewModal, setEditBookingViewModal] = useState(false);

  const [tipData, setTipData] = useState({});
  const [cancellationData, setCanacellationData] = useState({});
  const [muvrViewData, setMuvrViewData] = useState(null);
  const [rattingValue, setRattingValue] = useState(0);
  const [rattingExperience, setRattingExperience] = useState([]);
  const [rattingComment, setRattingComment] = useState("");
  const [checkMuvrValue, setCheckMuvrValue] = useState(false);
  const [uploadingImages, setUploadingImages] = useState([]);
  const [editSuccessMessage, setEditSuccessMessage] = useState("");
  const TipValue = [
    {
      imageName: smileAvatar0,
      value: "5",
      label: "$5",
    },
    {
      imageName: smileAvatar1,
      value: "10",
      label: "$10",
    },
    {
      imageName: smileAvatar2,
      value: "20",
      label: "$20",
    },
    {
      imageName: "",
      value: "other",
      label: "Other",
    },
  ];

  useEffect(() => {
    try {
      fetchBookingDetails();
    } catch (error) {
      console.log({ error });
    }
  }, []);

  useEffect(() => {
    setImages(bookingDetails?.bookingImages);
  }, [bookingDetails?.bookingImages]);

  useEffect(() => {
    setSearchParamData({ dateType: searchParams?.get("dateType") || "" });
  }, [searchParams]);

  useEffect(() => {
    if (location?.state?.firstPopup === true) {
      setCancelBookingViewModal((prev) => ({
        ...prev,
        modalTitle: "Booking Cancellation",
        isModal: true,
        isCancel: true,
        isConfirm: false,
      }));
    }
  }, [location?.state?.firstPopup]);

  useEffect(() => {
    if (location?.state?.secondPopup === true) {
      setCancelBookingViewModal((prev) => ({
        ...prev,
        modalTitle: "Your booking has been cancelled",
        isModal: true,
        isCancel: false,
        isConfirm: true,
      }));
    }
  }, [location?.state?.secondPopup]);

  useEffect(() => {
    if (location?.state?.isUpdateBooking === true) {
      setEditBookingViewModal(true);
      console.log(bookingList, "booking list");
      if (location?.state?.step === 1) {
        setEditSuccessMessage("Changes saved successfully");
      }
      if (location?.state?.step === 2) {
        setEditSuccessMessage("Changes saved successfully");
      }
      if (location?.state?.step === 3) {
        setEditSuccessMessage("Changes saved successfully");
      }
      if (location?.state?.step === 5) {
        setEditSuccessMessage("Changes saved successfully");
      }
      if (location?.state?.step === 6) {
        setEditSuccessMessage("Changes saved successfully");
      }
    }
  }, [location?.state?.isUpdateBooking, location?.state?.step]);

  const fetchBookingDetails = async () => {
    const bookingDetailsResponse = await doFetchBookingDetail(params?.booking_id, localStorage.getItem("_token") ? true : false);
    if (bookingDetailsResponse?.status === 200) {
      const bookingDetailsList = JSON.parse(getDescryptionString(bookingDetailsResponse?.data?.data));
      console.log(bookingDetailsList);

      const totalItem = bookingDetailsList?.booking?.bookingItems?.reduce((currentValue, bookingItem) => {
        return Number(currentValue) + bookingItem?.quantity;
      }, 0);
      setTotalQuantity(totalItem);

      const vehicle_price = bookingDetailsList?.booking?.vehicle?.base_price;
      const mile_price = bookingDetailsList?.booking?.vehicle?.per_miles * bookingDetailsList?.booking?.distance;
      const stair_price = bookingDetailsList?.booking?.stairs_price * bookingDetailsList?.booking?.no_of_stairs;

      const totalAmount = bookingDetailsList?.booking?.bookingItems?.reduce((currentValue, bookingItem) => {
        let sum = (Number(bookingItem?.price) || 0) * Number(bookingItem?.quantity);
        return Number(currentValue || 0) + sum;
      }, 0);
      const totalSum = Number(vehicle_price) + Number(mile_price) + totalAmount + Number(stair_price);
      setItemPrice((prev) => ({
        ...prev,
        vehiclePrice: vehicle_price,
        mile_price: mile_price,
        stair_price: stair_price,
        totalSum: totalSum,
      }));
      
      setBookingDetails(bookingDetailsList?.booking);
    }
  };

  const handleAddFavoriteMuvr = async (muvrId) => {
    try {
      const muvrPayload = {
        toId: muvrId,
      };
      const AddFavoriteMuvrResponse = await doFetchAddFavoriteMuvr(muvrPayload);
      if (AddFavoriteMuvrResponse?.status === 200) {
        fetchBookingDetails();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const loadMoreImages = () => {
    setDisplayedImages((prev) => prev + 6);
  };

  const handleEditBookingViewModal = () => {
    
    dispatch({
      type: "STORE_BOOKING_LIST",
      payload: bookingDetails,
    });
    setEditBookingViewModal(true);
  };
  const handleEditBookingCloseModal = () => {
    setEditBookingViewModal(false);
  };

  const handleChangeInput = (event) => {
    const { name, value } = event?.target;
    setCanacellationData({ ...cancellationData, [name]: value });
  };

  const handleCancelBookingViewModal = () => {
    setCanacellationData({});
    setCancelBookingViewModal((prev) => ({
      ...prev,
      modalTitle: "Booking Cancel",
      isModal: true,
      isCancel: true,
      isConfirm: false,
    }));
  };

  const handleCancelBookingCloseModal = () => {
    setCanacellationData({});
    setCancelBookingViewModal((prev) => ({
      ...prev,
      modalTitle: "",
      isModal: false,
      isCancel: false,
      isConfirm: false,
    }));
  };

  const handleConfirmBookingViewModal = () => {
    setCanacellationData({});
    setCancelBookingViewModal((prev) => ({
      ...prev,
      modalTitle: "Your booking has been cancelled",
      isModal: true,
      isCancel: false,
      isConfirm: true,
    }));
  };

  const handleMuvrRateViewModal = (muvrDetails) => {
    setMuvrViewData(muvrDetails);
    setMuvrRatingTipViewModal((prev) => ({
      ...prev,
      modalTitle: "Rate Details",
      isModal: true,
      isMuvrRate: true,
      isMuvrTip: false,
    }));
  };

  const handleMuvrTipViewModal = (muvrDetails) => {
    setMuvrViewData(muvrDetails);
    setMuvrRatingTipViewModal((prev) => ({
      ...prev,
      modalTitle: "Tip Details",
      isModal: true,
      isMuvrRate: false,
      isMuvrTip: true,
    }));
  };

  const handleEditGotoSteps = async (steps) => {
    const prepareBookingItems = [];
    bookingDetails?.bookingItems?.length > 0 &&
      bookingDetails?.bookingItems?.forEach((item) => {
        prepareBookingItems.push({
          categoryId: item?.category_id,
          subcategoryId: item?.subcategory_id ? item?.subcategory_id : null,
          price: item?.price,
          quantity: item?.quantity,
        });
      });

    const prepareBookingPayload = {
      step: steps,
    };
    if (steps === 1) {
      prepareBookingPayload.serviceId = bookingDetails?.service_id;
      prepareBookingPayload.pickupLocation = bookingDetails?.pickup_location;
      prepareBookingPayload.pickupLongitude = bookingDetails?.pickup_longitude;
      prepareBookingPayload.pickupLatitude = bookingDetails?.pickup_latitude;
      prepareBookingPayload.dropoffLocation = bookingDetails?.dropoff_location;
      prepareBookingPayload.dropoffLatitude = bookingDetails?.dropoff_latitude;
      prepareBookingPayload.dropoffLongitude = bookingDetails?.dropoff_longitude;
      prepareBookingPayload.distance = bookingDetails?.distance;
    } else if (steps === 2) {
      prepareBookingPayload.bookingItemList = prepareBookingItems;
    } else if (steps === 3) {
      prepareBookingPayload.bookingItemList = prepareBookingItems;
      // prepareBookingPayload.amount = bookingDetails?.amount;
      // prepareBookingPayload.vehicle = bookingDetails?.vehicle;
      prepareBookingPayload.vehicleId = bookingDetails?.vehicle_id;
      prepareBookingPayload.isHelp = bookingDetails?.is_help;
      prepareBookingPayload.noOfStairs = bookingDetails?.no_of_stairs;
    } else if (steps === 5) {
      prepareBookingPayload.pickupDate = bookingDetails?.pickup_date;
      prepareBookingPayload.pickupTime = bookingDetails?.pickup_time;
    } else if (steps === 6) {
      // prepareBookingPayload.step = steps;
      prepareBookingPayload.specialInstruction = bookingDetails?.special_instruction;
      prepareBookingPayload.bookingImageList = bookingDetails?.bookingImages;
    }
    // console.log(prepareBookingPayload);
    const bookingCreateResponse = await doFetchBookingCreate(prepareBookingPayload, false, bookingDetails?.id, steps, localStorage.getItem("_token") ? true : false);
    if (bookingCreateResponse?.status === 200) {
      navigate(`/booking-steps?bookingId=${bookingDetails?.id}`, { state: { isEdit: true } });
    }
  };

  const handleRatingTipCloseModal = () => {
    setMuvrViewData({});
    setMuvrRatingTipViewModal((prev) => ({
      ...prev,
      modalTitle: "",
      isModal: false,
      isMuvrRate: false,
      isMuvrTip: false,
    }));
  };

  const handleTipAmountChange = (event) => {
    const { name, value } = event?.target;
    setTipData({ ...tipData, [name]: value });
  };

  const handleViewPaymentModal = () => {
    if (!tipData?.tipAmount) {
      toast.error("Please select any tip amount");
    } else if (tipData?.tipAmount === "other" && !tipData?.otherTipAmount) {
      toast.error("Please add tip amount");
    } else {
      setViewPaymentModal((prev) => ({
        ...prev,
        modalTitle: "Add Payment Information",
        isPayment: true,
        isModal: true,
      }));
    }
  };
  const handleClosePaymentModal = () => {
    setViewPaymentModal((prev) => ({
      ...prev,
      modalTitle: "",
      isModal: false,
      isPayment: false,
    }));
  };

  const handleBookingSubmit = async () => {
    if (!cancellationData?.reason) {
      toast.error("Please select any reason!");
    } else if (cancellationData?.reason === "none" && !cancellationData?.otherReason) {
      toast.error("Please Enter reason!");
    } else {
      const cancelBookingPayload = {
        reason: cancellationData?.reason === "none" ? cancellationData?.otherReason : cancellationData?.reason,
        isOther: cancellationData?.reason === "none" ? true : false,
      };
      const cancleBookingResponse = await doCancleBooking(params?.booking_id, cancelBookingPayload);
      if (cancleBookingResponse?.status === 200) {
        setCancelBookingViewModal((prev) => ({
          ...prev,
          modalTitle: "Your booking has been cancelled",
          isModal: true,
          isCancel: false,
          isConfirm: true,
        }));
      } else {
        toast.error(cancleBookingResponse?.data?.message);
      }
    }
  };

  const navigateToPage = () => {
    navigate("/");
  };

  //--------------------Onchage set Rating value----------------
  const onHandleChangeRating = (value) => {
    setRattingValue(value);
  };

  const onHandleCheckedValue = (event) => {
    setRattingExperience(event.target.checked ? [...rattingExperience, event.target.value] : rattingExperience.filter((item) => item !== event.target.value));
  };

  const handleOnChangeComment = (event) => {
    setRattingComment(event.target.value);
  };

  const handleChangeFavMuvrCheck = (e) => {
    setCheckMuvrValue(e.target.checked);
  };

  const handleFileInputChange = async (event) => {
    const { files } = event.target;
    for (const file of files) {
      let reader = new FileReader();
      let type = file?.type;
      if (type?.toLowerCase()?.includes("image")) {
      } else {
        return;
      }
      reader.onloadend = async () => {
        const uploadImageResponse = await doUploadImage({
          image: reader.result,
          folderName: "images",
        });

        if (uploadImageResponse?.status === 200) {
          uploadingImages.push({
            image: uploadImageResponse?.data?.data?.imageName,
            baseImage: reader.result,
          });
          setUploadingImages((prevState) => [...uploadingImages]);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteFile = async (imageItem) => {
    const deleteImageResponse = await doDeleteImage({
      image: imageItem?.image,
      folderName: "images",
    });

    if (deleteImageResponse?.status === 200) {
      const removeUploadedImage = uploadingImages && uploadingImages.length > 0 && uploadingImages.filter((images) => images !== imageItem);

      setUploadingImages(removeUploadedImage);
    }
  };

  const handleSubmitRating = async (e) => {
    e.preventDefault();

    const partialnewImageIfUploadedImage = uploadingImages && uploadingImages?.length > 0 && uploadingImages.map(({ image }) => ({ image }));

    if (rattingValue === 0) {
      return toast.error("Please Select Rating First!");
    } else if (rattingValue > 0) {
      const reviewData = {
        bookingId: bookingDetails?.id,
        toId: muvrViewData?.muvr_id,
        rating: rattingValue,
        experience: rattingExperience?.join(","),
        comment: rattingComment,
        isPair: rattingValue > 3 ? undefined : checkMuvrValue,
        isFavorite: rattingValue > 3 ? checkMuvrValue : undefined,
        imageList: uploadingImages?.length > 0 ? partialnewImageIfUploadedImage : [],
      };
      const addReviewResponse = await doAddReview(reviewData);
      if (addReviewResponse?.status === 200) {
        setRattingValue(0);
        setRattingComment("");
        setRattingExperience("");
        setCheckMuvrValue(false);
        setUploadingImages([]);
        handleRatingTipCloseModal();
      }
    }
  };

  return {
    searchParamData,
    bookingDetails,
    images,
    displayedImages,
    totalQuantity,
    itemPrice,
    loadMoreImages,
    cancellationData,
    cancelBookingViewModal,
    editBookingViewModal,
    handleEditBookingViewModal,
    handleEditBookingCloseModal,
    handleEditGotoSteps,
    handleCancelBookingViewModal,
    handleConfirmBookingViewModal,
    handleCancelBookingCloseModal,
    handleBookingSubmit,
    handleChangeInput,
    navigateToPage,
    handleAddFavoriteMuvr,
    muvrViewData,
    muvrRatingTipViewModal,
    TipValue,
    tipData,
    handleTipAmountChange,
    handleMuvrRateViewModal,
    handleMuvrTipViewModal,
    handleRatingTipCloseModal,
    onHandleChangeRating,
    rattingValue,
    onHandleCheckedValue,
    rattingExperience,
    handleOnChangeComment,
    handleChangeFavMuvrCheck,
    handleFileInputChange,
    uploadingImages,
    handleDeleteFile,
    handleSubmitRating,
    viewPaymentModal,
    handleViewPaymentModal,
    handleClosePaymentModal,
  };
};
