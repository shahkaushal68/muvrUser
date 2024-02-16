import { useEffect, useState } from "react";
import { doFetchAllVehicle, doFetchBookingCreate } from "../../actions";
import { formatNumberWithDecimal, getDescryptionString } from "../../services";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

export const useYourVehicleStepHook = (successResponse, current) => {
  const dispatch = useDispatch();

  const { bookingCreateFormData } = useSelector((state) => state?.bookingReducer);
  // console.log(bookingCreateFormData, "booking::");
  const [searchParams] = useSearchParams();
  const [allVehicle, setAllVehicle] = useState([]);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [activeSlide, setActiveSlide] = useState({});
  const [isReadyToHelp, setIsReadyToHelp] = useState(false);
  const [isflightsOfStairsCounter, setIsflightsOfStairsCounter] = useState(false);
  const [fetchSelectedItem, setFetchSelectedItem] = useState([]);
  const [stairsCounter, setStairsCounter] = useState(0);
  const [isFinalPriceModalOpen, setIsFinalPriceModalOpen] = useState(false);
  const [discountPrice, setDiscountPrice] = useState(0);
  const [vehiclePrice, setVehiclePrice] = useState(0);
  const [stairsPriceTotal, setStairsPriceTotal] = useState(0);
  const [totalPriceLocal, setTotalPriceLocal] = useState(0);
  const [totalFinalPrice, setTotalFinalPrice] = useState(0);

  const finaPriceModalClose = (value) => {
    setIsFinalPriceModalOpen(value);
  };

  useEffect(() => {
    const bookingItemsClone = bookingCreateFormData?.bookingItems || [];
    setIsflightsOfStairsCounter(bookingCreateFormData?.noOfStairs > 0);
    setIsReadyToHelp(bookingCreateFormData?.isHelp || false);
    setFetchSelectedItem(bookingCreateFormData?.bookingItems || []);
    setStairsCounter(bookingCreateFormData?.noOfStairs || 0);
    setTotalPriceLocal(bookingCreateFormData?.amount || 0);
    setStairsPriceTotal(bookingCreateFormData?.noOfStairs * formatNumberWithDecimal(Number(bookingCreateFormData?.stairsPrice)));
    handleFetchCategoryItems(bookingItemsClone);
  }, [bookingCreateFormData]);

  //fetch all Vehicles
  useEffect(() => {
    setLoading(true);
    fetchAllVehicle();
  }, []);

  const fetchAllVehicle = async () => {
    const fetchAllVehicleResponse = await doFetchAllVehicle(1, 20);
    if (fetchAllVehicleResponse?.status === 200) {
      const fetchAllVehicleResponseData = JSON.parse(getDescryptionString(fetchAllVehicleResponse?.data?.data));
      const vehicleName = bookingCreateFormData?.vehicle?.name;
      let totalPrice = 0,
        vehicleId = 0;
      fetchAllVehicleResponseData?.vehicleList?.forEach((vehicle, vehicleIndex) => {
        if (vehicleName === vehicle?.name) {
          vehicleId = vehicleIndex;
        }
      });
      const findActiveSlide = vehicleId ? fetchAllVehicleResponseData?.vehicleList[vehicleId] : fetchAllVehicleResponseData?.vehicleList[0];
      setActiveSlideIndex(vehicleId);
      setActiveSlide(findActiveSlide);
      if (findActiveSlide) {
        const activeSlideBasePrice = Number(findActiveSlide?.base_price);
        const activeSlideDistancePrice = Number(findActiveSlide?.per_miles) * formatNumberWithDecimal(Number(bookingCreateFormData?.distance));
        totalPrice = totalPrice + activeSlideBasePrice + activeSlideDistancePrice;
      }
      setVehiclePrice(totalPrice);
      setAllVehicle(fetchAllVehicleResponseData);
    }
    setLoading(false);
  };

  useEffect(() => {
    calculateAmount();
  }, [totalPriceLocal, vehiclePrice, stairsCounter, isReadyToHelp, activeSlide]);

  const discount = async (discountPercentage, totalPriceLocal, vehiclePrice, stairsPriceTotal) => {
    var numVal1 = Number(totalPriceLocal);
    var numVal2 = discountPercentage / 100;
    return (numVal1 + vehiclePrice + stairsPriceTotal) * numVal2;
  };

  const calculateAmount = async () => {
    let discountPercentage = 0;
    if (isReadyToHelp) {
      discountPercentage = Number(activeSlide?.save_getting_percentage?.split(".")[0]);
    }
    const totalItemsPrice =
      fetchSelectedItem?.length > 0 &&
      fetchSelectedItem?.reduce((previousValue, currentValue) => {
        return previousValue + Number(currentValue.price) * currentValue.quantity;
      }, 0);
    const calculateDiscountPrice = await discount(discountPercentage, totalItemsPrice, vehiclePrice, stairsPriceTotal);
    const finalTotal = totalItemsPrice + Number(vehiclePrice) + Number(stairsPriceTotal) - (isReadyToHelp ? Number(calculateDiscountPrice) : 0);

    setDiscountPrice(calculateDiscountPrice);
    setTotalFinalPrice(finalTotal);
  };

  const handleFetchCategoryItems = (bookingItemsClone) => {
    const fetchCategoryData =
      bookingItemsClone?.length > 0 &&
      bookingItemsClone?.map((fetchItem) => {
        if (fetchItem?.booking_id) {
          return {
            categoryId: fetchItem?.category_id,
            id: fetchItem?.subcategory_id != null ? fetchItem?.subcategory_id : fetchItem?.category_id,
            subcategoryId: fetchItem?.subcategory_id != null ? fetchItem?.subcategory_id : null,
            price: fetchItem?.subcategory_id != null ? fetchItem?.subCategory?.price : fetchItem?.price,
            quantity: fetchItem?.quantity,
            quantity_price: fetchItem?.quantity_price,
            name: fetchItem?.subcategory_id != null ? fetchItem?.subCategory?.name : fetchItem?.category?.name,
            image: fetchItem?.category?.image,
            type: fetchItem?.subcategory_id != null ? "subCategory" : "category",
          };
        } else {
          return {
            categoryId: fetchItem?.categoryId,
            id: !fetchItem?.subcategoryId ? fetchItem?.categoryId : fetchItem?.subcategoryId,
            subcategoryId: fetchItem?.subcategoryId != null ? fetchItem?.subcategoryId : null,
            price: fetchItem?.price,
            quantity: fetchItem?.quantity,
            quantity_price: fetchItem?.quantity_price,
            name: fetchItem?.name,
            image: fetchItem?.image,
            type: fetchItem?.subcategoryId != null ? "subCategory" : "category",
          };
        }
      });

    setFetchSelectedItem(fetchCategoryData);
  };
  // Item addded plus button
  const handlePlusBtn = (selectItem) => {
    const updatedItems = fetchSelectedItem.map((item) => {
      if (item.type === selectItem.type && item.id === selectItem.id) {
        const updatedQuntity = item.quantity + 1;
        return {
          ...item,
          quantity: updatedQuntity,
          quantity_price: formatNumberWithDecimal(Number(item.price)) * updatedQuntity,
        };
      }
      return item;
    });

    const filteredItems = updatedItems.filter((item) => item !== null);

    const itemSumPrice =
      filteredItems.length > 0 &&
      filteredItems?.reduce((previousValue, currentValue) => {
        return previousValue + formatNumberWithDecimal(Number(currentValue.price)) * currentValue.quantity;
      }, 0);
    setFetchSelectedItem(filteredItems);
    setTotalPriceLocal(itemSumPrice);
    bookingCreateFormData.bookingItems = filteredItems;
  };
  // Item minus button
  const handleMinusBtn = (selectItem) => {
    let updatedSelectedItem = [];
    fetchSelectedItem.forEach((item) => {
      let updatedItems = { ...item };
      if (item.type === selectItem.type && item.id === selectItem.id) {
        updatedItems = {
          ...item,
          quantity: (item.quantity -= 1),
          quantity_price: Number(item.price) * item.quantity,
        };
        if (updatedItems.quantity < 1) {
          return null;
        }
      }
      updatedSelectedItem.push(updatedItems);
    });
    const filteredItems = updatedSelectedItem.filter((item) => item !== null);
    const itemSumPrice =
      filteredItems.length > 0 &&
      filteredItems?.reduce((previousValue, currentValue) => {
        return previousValue + Number(currentValue.price) * currentValue.quantity;
      }, 0);
    setFetchSelectedItem(filteredItems);
    setTotalPriceLocal(itemSumPrice);
    bookingCreateFormData.bookingItems = filteredItems;
  };

  // Change Vihecle Index change
  const onRealIndexChange = (element) => {
    setActiveSlideIndex(element.activeIndex);
    let totalPrice = 0;
    const findActiveSlide = allVehicle?.vehicleList[element.activeIndex];
    setActiveSlide(findActiveSlide);
    if (findActiveSlide) {
      const activeSlideBasePrice = Number(findActiveSlide?.base_price);
      const activeSlideDistancePrice = Number(findActiveSlide?.per_miles) * formatNumberWithDecimal(Number(bookingCreateFormData?.distance));
      totalPrice = totalPrice + activeSlideBasePrice + activeSlideDistancePrice;
    }
    setVehiclePrice(totalPrice);
  };

  const checkHelp = (checked) => {
    setIsReadyToHelp(checked);
  };

  // Strais Counter
  const handleCheckIsStairsTrue = (event) => {
    if (event.target.value === "yes") {
      setIsflightsOfStairsCounter(true);
      setStairsCounter(1);
      setStairsPriceTotal(formatNumberWithDecimal(Number(bookingCreateFormData?.stairsPrice)));
    } else if (event.target.value === "no") {
      setStairsCounter(0);
      setStairsPriceTotal(0);
      setIsflightsOfStairsCounter(false);
    }
  };

  //Handle Counter
  const handleStairsCounter = (isPlus = false) => {
    const updatedCount = isPlus ? stairsCounter + 1 : stairsCounter - 1;
    setStairsCounter(updatedCount);
    setStairsPriceTotal(updatedCount * 10);
  };

  const prepareReduxStoreData = () => {
    const vehicleList = {
      base_price: activeSlide?.base_price,
      per_miles: activeSlide?.per_miles,
      name: activeSlide?.name,
    };
    const prepareBookingDataSelectItemStep = {
      ...bookingCreateFormData,
      bookingItems: fetchSelectedItem,
      amount: totalFinalPrice,
      vehicle: vehicleList,
      vehicleId: activeSlide?.id,
      isHelp: isReadyToHelp,
      noOfStairs: stairsCounter,
      step: current + 1,
    };

    dispatch({
      type: "STORE_BOOKING_FORM_DATA",
      payload: prepareBookingDataSelectItemStep,
    });
  };

  const clickOnNextButton = async () => {
    let bookingItemList = [];
    fetchSelectedItem &&
      fetchSelectedItem.length > 0 &&
      fetchSelectedItem?.map((fetchItem) => {
        if (fetchItem?.booking_id) {
          bookingItemList.push({
            categoryId: fetchItem?.category_id,
            subcategoryId: fetchItem?.subcategory_id != null ? fetchItem?.subcategory_id : null,
            price: fetchItem?.subcategory_id != null ? fetchItem?.subCategory?.price : fetchItem?.price,
            quantity: fetchItem?.quantity,
          });
        } else {
          bookingItemList.push({
            categoryId: fetchItem?.categoryId,
            subcategoryId: fetchItem?.subcategoryId != null ? fetchItem?.subcategoryId : null,
            price: fetchItem?.price,
            quantity: fetchItem?.quantity,
          });
        }
      });

    const thirdStepPrepareData = {
      bookingItemList: bookingItemList,
      vehicleId: activeSlide?.id,
      isHelp: isReadyToHelp,
      noOfStairs: stairsCounter,
      step: current + 1,
    };

    if (bookingItemList.length <= 0) {
      toast.error("Please Select item");
    } else {
      const bookingCreateResponse = await doFetchBookingCreate(
        thirdStepPrepareData,
        false,
        searchParams.get("bookingId"),
        current + 1,
        localStorage.getItem("_token") ? true : false
      );
      if (bookingCreateResponse?.status === 200) {
        prepareReduxStoreData();
        successResponse();
      } else if (bookingCreateResponse?.status === 422) {
        toast.error(bookingCreateResponse?.data?.message);
      }
    }
  };

  return {
    loading,
    bookingCreateFormData,
    allVehicle,
    fetchSelectedItem,
    handlePlusBtn,
    handleMinusBtn,
    onRealIndexChange,
    activeSlideIndex,
    checkHelp,
    handleCheckIsStairsTrue,
    isflightsOfStairsCounter,
    isReadyToHelp,
    stairsCounter,
    handleStairsCounter,
    isFinalPriceModalOpen,
    finaPriceModalClose,
    discountPrice,
    clickOnNextButton,
    totalPriceLocal,
    totalFinalPrice,
  };
};
