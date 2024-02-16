import { useEffect, useMemo, useState } from "react";
import { doFetchAllVehicle, doFetchBookingCreate, doPayment, doViewCards } from "../../actions";
import styles from "../../components/MuvrBookingSteps/Payment/Payment.module.css";
import { formatNumberWithDecimal, getDescryptionString } from "../../services";
import { useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { loadStripe } from "@stripe/stripe-js";
import { appConfig } from "../../config";

export const usePaymentStepHook = (successResponse, current) => {
  const { bookingCreateFormData } = useSelector((state) => state?.bookingReducer);
  console.log(bookingCreateFormData, "bookingCreateFormData::");

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [listAllCards, setlistAllCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [calculateFinalAmount, setCalculateFinalAmount] = useState(0);
  const [activeVehicle, setActiveVehicle] = useState([]);
  const [isAuth, setIsAuth] = useState(false);
  const [bookingData, setBookingData] = useState({});
  const [viewPaymentModal, setViewPaymentModal] = useState({
    modalTitle: "",
    isModal: false,
    isPayment: false,
  });

  const fetchAllVehicle = async () => {
    const fetchAllVehicleResponse = await doFetchAllVehicle(1, 10);
    if (fetchAllVehicleResponse?.status === 200) {
      const fetchAllVehicleResponseData = JSON.parse(getDescryptionString(fetchAllVehicleResponse?.data?.data));
      const findActiveVehicle = await fetchAllVehicleResponseData?.vehicleList?.find((item) => item?.id === bookingCreateFormData?.vehicleId);
      setActiveVehicle(findActiveVehicle);
    }
  };
  /// Fetch all Vehicle
  useEffect(() => {
    if (localStorage.getItem("_token")) {
      setIsAuth(true);
    } else {
      setIsAuth(false);
    }

    if (bookingCreateFormData?.bookingItems) {
      fetchAllVehicle();
    }
  }, [bookingCreateFormData?.bookingItems]);

  const onChangeCard = (e) => {
    const { value } = e?.target;
    const findCard = listAllCards.find((element) => element?.id === value);
    setSelectedCard(findCard);
  };

  const ViewAllCards = async () => {
    const ViewAllCardsRes = await doViewCards();
    if (ViewAllCardsRes?.status === 200) {
      const ViewAllCardsResData = JSON.parse(getDescryptionString(ViewAllCardsRes?.data?.data));
      setlistAllCards(ViewAllCardsResData?.cardDetail);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("_token")) {
      ViewAllCards();
    }
  }, []);

  const discount = async (discountPercentage, totalPriceItemPrice, vehicleBasePrice, distantPrice, stairsPrice) => {
    var numVal1 = Number(totalPriceItemPrice);
    var numVal2 = discountPercentage / 100;
    return (numVal1 + vehicleBasePrice + distantPrice + stairsPrice) * numVal2;
  };

  const calculateAmount = async () => {
    const totalPriceItemPrice =
      (await bookingCreateFormData?.bookingItems?.length) > 0 &&
      bookingCreateFormData?.bookingItems?.reduce((previousValue, currentValue) => {
        return previousValue + Number(currentValue.price) * currentValue.quantity;
      }, 0);
    const vehicleBasePrice = await Number(bookingCreateFormData?.vehicle?.base_price);
    const distantPrice = (await Number(bookingCreateFormData?.vehicle?.per_miles)) * Number(bookingCreateFormData?.distance);
    const stairsPrice = (await bookingCreateFormData?.noOfStairs) * Number(bookingCreateFormData?.stairsPrice);
    const discountPercentageVehicle = await Number(activeVehicle?.save_getting_percentage);

    const discountPrice = await discount(discountPercentageVehicle, totalPriceItemPrice, vehicleBasePrice, distantPrice, stairsPrice);
    const finalTotal = bookingCreateFormData?.isHelp
      ? totalPriceItemPrice + vehicleBasePrice + distantPrice + stairsPrice - discountPrice
      : totalPriceItemPrice + vehicleBasePrice + distantPrice + stairsPrice;
    setCalculateFinalAmount(formatNumberWithDecimal(Number(finalTotal)));
  };

  useEffect(() => {
    if (activeVehicle?.id) {
      calculateAmount();
    }
  }, [activeVehicle]);

  const listCardOption = useMemo(() => {
    return (
      listAllCards &&
      listAllCards?.length > 0 &&
      listAllCards?.map((listCard) => {
        //console.log("listCard", listCard);
        return {
          label: (
            <>
              <div className={styles.payCardWrap}>
                {/* <img src="" alt="MasterCard" className="flex-0-auto" /> */}
                <h4 className="fw-400 ml-1 link">{listCard?.card_number}</h4>
              </div>
            </>
          ),
          value: listCard?.id,
        };
      })
    );
  }, [listAllCards]);

  const handleViewPaymentModal = () => {
    if (isAuth) {
      let bookingItemList = [];
      let bookingImageListData = [];
      bookingCreateFormData?.bookingItems &&
        bookingCreateFormData?.bookingItems?.length > 0 &&
        bookingCreateFormData?.bookingItems.map((item) => {
          if (item?.booking_id) {
            bookingItemList.push({
              categoryId: item?.category_id,
              subcategoryId: item?.subcategory_id != null ? item?.subcategory_id : null,
              price: item?.subcategory_id != null ? item?.subCategory?.price : item?.price,
              quantity: item?.quantity,
            });
          } else {
            bookingItemList.push({
              categoryId: item?.categoryId,
              subcategoryId: item?.subcategoryId != null ? item?.subcategoryId : null,
              price: item?.price,
              quantity: item?.quantity,
            });
          }
        });
      bookingCreateFormData?.bookingImages &&
        bookingCreateFormData?.bookingImages?.length > 0 &&
        bookingCreateFormData?.bookingImages?.map((item) => {
          const imageName = item?.booking_id ? item?.image.split("/").pop() : item?.image;
          bookingImageListData.push({
            image: imageName,
          });
        });
      let bookingMuvrListPrepare;
      if (bookingCreateFormData?.bookingMuvrs[0]?.hasOwnProperty("muvr_id")) {
        bookingMuvrListPrepare = bookingCreateFormData?.bookingMuvrs?.map((item) => ({
          muvrId: item?.muvr_id,
          type: item?.type,
          isPersonalRequest: true,
          muvrRequest: item?.muvr_request,
        }));
      } else {
        bookingMuvrListPrepare = bookingCreateFormData?.bookingMuvrs;
      }
      const lastStepPreapareData = {
        // step 1 - step 2
        serviceId: bookingCreateFormData?.serviceId,
        pickupLocation: bookingCreateFormData?.pickupLocation,
        pickupLongitude: bookingCreateFormData?.pickupLongitude,
        pickupLatitude: bookingCreateFormData?.pickupLatitude,
        dropoffLocation: bookingCreateFormData?.dropoffLocation,
        dropoffLatitude: bookingCreateFormData?.dropoffLatitude,
        dropoffLongitude: bookingCreateFormData?.dropoffLongitude,
        distance: bookingCreateFormData?.distance,
        // step 3
        bookingItemList: bookingItemList,
        // step-4
        vehicleId: bookingCreateFormData?.vehicleId,
        isHelp: bookingCreateFormData?.isHelp,
        noOfStairs: bookingCreateFormData?.noOfStairs,
        //step -5
        bookingMuvrList: bookingMuvrListPrepare,
        //step-6
        pickupDate: bookingCreateFormData?.pickupDate,
        pickupTime: bookingCreateFormData?.pickupTime,
        //step-7
        specialInstruction: bookingCreateFormData?.specialInstruction,
        bookingImageList: bookingImageListData,
        //step-8
        amount: calculateFinalAmount,
        step: current + 1,
      };

      setBookingData(lastStepPreapareData);
      setViewPaymentModal((prev) => ({
        ...prev,
        modalTitle: "Add Payment Information",
        isModal: true,
        isPayment: true,
      }));
    } else {
      navigate("/choose-auth");
    }
  };
  const handleClosePaymentModal = () => {
    setBookingData({});
    setViewPaymentModal((prev) => ({
      ...prev,
      modalTitle: "",
      isModal: false,
      isPayment: false,
    }));
  };
  // const clickOnBookNowButton = async () => {
  //   if (isAuth) {
  //     if (selectedCard === null) {
  //       toast.error("Please Select Card!");
  //     } else {
  //       let bookingItemList = [];
  //       let bookingImageListData = [];
  //       bookingCreateFormData?.bookingItems &&
  //         bookingCreateFormData?.bookingItems?.length > 0 &&
  //         bookingCreateFormData?.bookingItems.map((item) => {
  //           if (item?.booking_id) {
  //             bookingItemList.push({
  //               categoryId: item?.category_id,
  //               subcategoryId: item?.subcategory_id != null ? item?.subcategory_id : null,
  //               price: item?.subcategory_id != null ? item?.subCategory?.price : item?.price,
  //               quantity: item?.quantity,
  //             });
  //           } else {
  //             bookingItemList.push({
  //               categoryId: item?.categoryId,
  //               subcategoryId: item?.subcategoryId != null ? item?.subcategoryId : null,
  //               price: item?.price,
  //               quantity: item?.quantity,
  //             });
  //           }
  //         });
  //       bookingCreateFormData?.bookingImages &&
  //         bookingCreateFormData?.bookingImages?.length > 0 &&
  //         bookingCreateFormData?.bookingImages?.map((item) => {
  //           const imageName = item?.booking_id ? item?.image.split("/").pop() : item?.image;
  //           bookingImageListData.push({
  //             image: imageName,
  //           });
  //         });
  //       let bookingMuvrListPrepare;
  //       if (bookingCreateFormData?.bookingMuvrs[0]?.hasOwnProperty("muvr_id")) {
  //         bookingMuvrListPrepare = bookingCreateFormData?.bookingMuvrs?.map((item) => ({
  //           muvrId: item?.muvr_id,
  //           type: item?.type,
  //           isPersonalRequest: true,
  //           muvrRequest: item?.muvr_request,
  //         }));
  //       } else {
  //         bookingMuvrListPrepare = bookingCreateFormData?.bookingMuvrs;
  //       }
  //       const lastStepPreapareData = {
  //         // step 1 - step 2
  //         serviceId: bookingCreateFormData?.serviceId,
  //         pickupLocation: bookingCreateFormData?.pickupLocation,
  //         pickupLongitude: bookingCreateFormData?.pickupLongitude,
  //         pickupLatitude: bookingCreateFormData?.pickupLatitude,
  //         dropoffLocation: bookingCreateFormData?.dropoffLocation,
  //         dropoffLatitude: bookingCreateFormData?.dropoffLatitude,
  //         dropoffLongitude: bookingCreateFormData?.dropoffLongitude,
  //         distance: bookingCreateFormData?.distance,
  //         // step 3
  //         bookingItemList: bookingItemList,
  //         // step-4
  //         vehicleId: bookingCreateFormData?.vehicleId,
  //         isHelp: bookingCreateFormData?.isHelp,
  //         noOfStairs: bookingCreateFormData?.noOfStairs,
  //         //step -5
  //         bookingMuvrList: bookingMuvrListPrepare,
  //         //step-6
  //         pickupDate: bookingCreateFormData?.pickupDate,
  //         pickupTime: bookingCreateFormData?.pickupTime,
  //         //step-7
  //         specialInstruction: bookingCreateFormData?.specialInstruction,
  //         bookingImageList: bookingImageListData,
  //         //step-8
  //         amount: calculateFinalAmount,
  //         step: current + 1,
  //       };

  //       const bookingCreateResponse = await doFetchBookingCreate(
  //         lastStepPreapareData,
  //         true,
  //         searchParams.get("bookingId"),
  //         current + 1,
  //         localStorage.getItem("_token") ? true : false
  //       );

  //       if (bookingCreateResponse?.status === 200) {
  //         successResponse();
  //         const PaymentData = {
  //           bookingId: searchParams.get("bookingId"),
  //           cardId: selectedCard?.id,
  //         };
  //         const paymentResponse = await doPayment(PaymentData);
  //         setIsLoading(true);
  //         if (paymentResponse?.status === 200) {
  //           setIsLoading(false);
  //           if (isLoading) {
  //             <>"Loading....."</>;
  //           } else {
  //             navigate("/booking-complete", { state: { fromBooking: true } });
  //             toast.success(paymentResponse?.data?.message);
  //           }
  //         }
  //       }
  //     }
  //   } else {
  //     navigate("/choose-auth");
  //   }
  // };
  return {
    listAllCards,
    listCardOption,
    bookingCreateFormData,
    // clickOnBookNowButton,
    onChangeCard,
    calculateFinalAmount,
    handleViewPaymentModal,
    viewPaymentModal,
    bookingData,
    handleClosePaymentModal,
  };
};
