import { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { doFetchAllCategory, doFetchBookingCreate } from "../../actions";
import { formatNumberWithDecimal, getDescryptionString } from "../../services";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

export const useSelectItemsStepHook = (successResponse, current) => {
  const dispatch = useDispatch();

  const { bookingCreateFormData } = useSelector((state) => state?.bookingReducer);
  const [searchParams] = useSearchParams();
  const [categoryList, setCategoryList] = useState([]);
  const [allCategoryList, setAllCategoryList] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [isTypeOfBoxesModalOpen, setIsTypeOfBoxesModalOpen] = useState(false);
  const [isDontSeeModalOpen, setIsDontSeeModalOpen] = useState(false);
  const [subCategoryBasedOnCategory, setSubCategoryBasedOnCategory] = useState([]);
  const [addSubCategory, setAddSubCategory] = useState({});
  const [subCategoryId, setSubCategoryId] = useState(null);
  const [selectedItem, setSelectedItem] = useState([]);
  const [checkedList, setCheckedList] = useState([]);
  const [selectedCategoryList, setSelectedCategoryList] = useState([]);
  const [filterCategoryData, setFilterCategoryData] = useState([]);
  const [totalQuantity, setTotalQuantity] = useState(0);

  // Multiple checkbox Selected
  const addMultipleCategoriesCheckbox = (event, fromSubCategory = false) => {
    let { value, checked } = event.target;
    value.quantity = 1;
    value.quantity_price = value?.price;
    value.categoryId = fromSubCategory ? value?.category_id : value?.id;
    value.subcategoryId = fromSubCategory ? value?.id : null;
    value.type = fromSubCategory ? "subCategory" : "category";
    if (checked) {
      setCheckedList([...checkedList, value]);
      setSelectedCategoryList([...selectedCategoryList, { categoryId: value.categoryId, subcategoryId: value.subcategoryId, type: value.type }]);
    } else {
      setCheckedList(checkedList.filter((item) => item.categoryId !== value.categoryId || item.subcategoryId !== value.subcategoryId));
      setSelectedCategoryList(selectedCategoryList.filter((item) => item.categoryId !== value.categoryId || item.subcategoryId !== value.subcategoryId));
    }
  };

  const addAllSelectedCheckboxCategory = () => {
    const updateselectedCheckBoxCategory = [...checkedList];
    const selectedItemClone = [...selectedItem];
    updateselectedCheckBoxCategory.forEach((item) => {
      // const presentItemIndex = selectedItemClone?.findIndex((rank) => {
      //   return item.categoryId === rank.categoryId && item.subcategoryId === rank.subcategoryId;
      // });
      selectedItemClone.push({
        ...item,
      });
    });
    console.log(updateselectedCheckBoxCategory, selectedItemClone);
    handleTotalQuantity(updateselectedCheckBoxCategory);
    setSelectedItem([...updateselectedCheckBoxCategory]);
    handleClickAllCategoryClose();
  };

  useEffect(() => {
    fetchAllCategoryList(bookingCreateFormData?.serviceId, 1, 10, "all");
  }, []);

  // fetchAllCategoryList
  const fetchAllCategoryList = async (serviceId, page, limit, isPopular) => {
    const categoryListResponces = await doFetchAllCategory(serviceId, page, limit, isPopular);
    if (categoryListResponces?.status === 200) {
      const categoryListData = JSON.parse(getDescryptionString(categoryListResponces?.data?.data));
      // console.log(categoryListData, "categoryListData");
      let subCategoryList = [];
      setCategoryList(categoryListData?.popularCategoryList);
      categoryListData?.categoryList?.forEach((categoryItem, categoryIndex) => {
        // if (categoryItem?.subCategories?.length > 0) {
        //   categoryItem?.subCategories?.forEach((subCategoryItem, subCategoryIndex) => {
        //     subCategoryList.push({ ...subCategoryItem, type: "subCategory" });
        //   });
        // } else {
        // }
        subCategoryList.push({ ...categoryItem, type: "category" });
      });
      // console.log(subCategoryList);
      const sortSubCategoryList = [...subCategoryList].sort((a, b) => (a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1));
      setAllCategoryList(sortSubCategoryList);
    }
  };

  useEffect(() => {
    const filtered = allCategoryList?.filter((entry) => {
      const values = entry.name.toLowerCase();
      return values.startsWith(searchText.toLowerCase());
    });
    setFilterCategoryData(filtered);
  }, [allCategoryList, searchText]);

  const handleSearchItem = (event) => {
    const query = event?.target?.value;
    setSearchText(query);
  };

  // handleChangeAddItem
  const handleChangeAddItem = (categoryItem, type) => {
    let selectedItemsClone = [...selectedItem];
    let alreadyPresentItemIndex = selectedItemsClone.findIndex((element) => {
      return element?.type && element?.type === type && element?.id === categoryItem?.id;
    });

    if (alreadyPresentItemIndex < 0) {
      let updatedItem = {
        name: categoryItem?.name,
        id: categoryItem?.id,
        image: categoryItem?.image,
        quantity: 1,
        type: type,
        price: categoryItem?.price,
        categoryId: type === "subCategory" ? categoryItem.category_id : categoryItem?.id,
        subcategoryId: type === "subCategory" ? categoryItem.id : null,
      };
      selectedItemsClone.push(updatedItem);
    } else {
      const alreadyPresentItem = selectedItemsClone[alreadyPresentItemIndex];
      alreadyPresentItem.quantity += 1;
      selectedItemsClone[alreadyPresentItemIndex] = alreadyPresentItem;
    }
    setSelectedItem(selectedItemsClone);
  };

  //handleClickOnPopularCategory
  const handleClickOnPopularCategory = (categoryItem) => {
    if (categoryItem?.subCategories?.length > 0) {
      setIsTypeOfBoxesModalOpen(true);
      setSubCategoryBasedOnCategory(categoryItem?.subCategories);
    } else {
      handleChangeAddItem(categoryItem, "category");
    }

    // setSelectedOption(null);
  };

  const handleClickOnPopularClose = () => {
    setIsTypeOfBoxesModalOpen(false);
  };

  const handleClickAllCategory = async () => {
    setIsDontSeeModalOpen(true);
    const allCategoryListClone = allCategoryList;
    setAllCategoryList(allCategoryListClone);
    const updatedSelectedDisplayData = [...selectedItem];
    let selectedList = [];
    updatedSelectedDisplayData.forEach((displayItem) => {
      selectedList.push({ categoryId: displayItem.categoryId, subcategoryId: displayItem.subcategoryId, type: displayItem.type });
    });
    setSelectedCategoryList(selectedList);
    setCheckedList(updatedSelectedDisplayData);
  };

  const handleClickAllCategoryClose = () => {
    setIsDontSeeModalOpen(false);
    setSelectedCategoryList([]);
  };

  // boxOptions
  const boxOptions = useMemo(() => {
    return (
      subCategoryBasedOnCategory &&
      subCategoryBasedOnCategory?.map((subCategoryItem) => {
        return {
          label: (
            <>
              <div className="d-flex align-center justify-space-between">
                <div>
                  <h5 className="fw-500">{subCategoryItem?.name}</h5>
                  {subCategoryItem?.dimension && <h6 className="darkgray fw-500 mt-1">{subCategoryItem?.dimension}</h6>}
                </div>
                <h5 className="green fw-500 pl-1">${formatNumberWithDecimal(Number(subCategoryItem?.price))}</h5>
              </div>
            </>
          ),
          value: subCategoryItem?.id,
        };
      })
    );
  }, [subCategoryBasedOnCategory]);

  // handleChangeSubcategorySelect
  const handleChangeSubcategorySelect = (event) => {
    const { value } = event?.target;
    const findSubCategory = subCategoryBasedOnCategory.find((element) => element?.id === value);
    findSubCategory.quantity = 1;
    findSubCategory.quantity_price = formatNumberWithDecimal(Number(findSubCategory?.price));
    findSubCategory.categoryId = findSubCategory?.category_id;
    findSubCategory.subcategoryId = findSubCategory?.id;
    findSubCategory.type = "subCategory";
    setAddSubCategory(findSubCategory);
    setSubCategoryId(value);
  };

  // addBoxSubCategory
  const addBoxSubCategory = () => {
    console.log(addSubCategory);
    if (Object.keys(addSubCategory).length > 0) {
      handleChangeAddItem(addSubCategory, "subCategory");
      setIsTypeOfBoxesModalOpen(false);
      setSubCategoryId(null);
      console.log(addSubCategory);
      handleTotalQuantity([addSubCategory]);
    } else {
      toast.error("Please select item!!");
    }
  };

  useEffect(() => {
    const fetchReduxBookingItems = bookingCreateFormData?.bookingItems;

    let updatedFetchReduxBookingItems = [];
    fetchReduxBookingItems &&
      fetchReduxBookingItems.length > 0 &&
      fetchReduxBookingItems.map((item) => {
        if (item?.booking_id) {
          updatedFetchReduxBookingItems.push({
            categoryId: item?.category_id,
            id: item?.subcategory_id != null ? item?.subcategory_id : item?.category_id,
            image: item?.category?.image,
            name: item?.subcategory_id != null ? item?.subCategory?.name : item?.category?.name,
            price: item?.subcategory_id != null ? item?.subCategory?.price : item?.price,
            quantity: item?.quantity,
            quantity_price: item?.quantity_price,
            subcategoryId: item?.subcategory_id != null ? item?.subcategory_id : null,
            type: item?.subcategory_id != null ? "subCategory" : "category",
          });
        } else {
          updatedFetchReduxBookingItems.push({
            categoryId: item?.categoryId,
            id: !item?.subcategoryId ? item?.categoryId : item?.subcategoryId,
            image: item?.image,
            name: item?.name,
            price: item?.price,
            quantity: item?.quantity,
            quantity_price: item?.quantity_price,
            subcategoryId: item?.subcategoryId != null ? item?.subcategoryId : null,
            type: item?.subcategoryId != null ? "subCategory" : "category",
          });
        }
      });
    handleTotalQuantity(updatedFetchReduxBookingItems);
    setSelectedItem(updatedFetchReduxBookingItems);
  }, [bookingCreateFormData]);

  const handleTotalQuantity = (selectedItems) => {
    const totalItems = selectedItems?.reduce((currentValue, bookingItem) => {
      return Number(currentValue) + bookingItem?.quantity;
    }, 0);
    setTotalQuantity(totalItems);
  };

  // handlePlusBtn
  const handlePlusBtn = (selectItem) => {
    let updatedItems = selectedItem.map((item) => {
      if (item.type === selectItem?.type && item.id === selectItem?.id) {
        const updatedItem = { ...item, quantity: (item.quantity += 1) };
        if (updatedItem?.quantity >= 10) {
          return updatedItem;
        }
      }
      return item;
    });
    handleTotalQuantity(updatedItems);
    setSelectedItem(updatedItems);
    setCheckedList(updatedItems);
  };

  // handleMinusBtn
  const handleMinusBtn = (selectItem) => {
    const updatedItems = selectedItem?.map((item) => {
      if (item.type === selectItem?.type && item?.id === selectItem?.id) {
        const updatedItems = { ...item, quantity: (item.quantity -= 1) };
        if (updatedItems?.quantity < 1) {
          return null;
        }
        return updatedItems;
      }
      return item;
    });

    const filteredItems = updatedItems.filter((item) => item !== null);
    handleTotalQuantity(filteredItems);
    setSelectedItem(filteredItems);
    setCheckedList(filteredItems);
  };

  // prepareReduxStoreData
  const prepareReduxStoreData = async () => {
    const totalPrice =
      selectedItem.length > 0 &&
      selectedItem?.reduce((previousValue, currentValue) => {
        return previousValue + Number(currentValue.price) * currentValue.quantity;
      }, 0);
    const prepareBookingDataSelectItemStep = {
      ...bookingCreateFormData,
      bookingItems: selectedItem,
      amount: totalPrice,
      step: current + 1,
    };
    dispatch({
      type: "STORE_BOOKING_FORM_DATA",
      payload: prepareBookingDataSelectItemStep,
    });
  };

  const clickOnNextButton = async () => {
    let bookingItemList = [];
    selectedItem &&
      selectedItem?.length > 0 &&
      selectedItem.map((item) => {
        bookingItemList.push({
          categoryId: item?.categoryId,
          subcategoryId: item?.subcategoryId ? item?.subcategoryId : null,
          price: item?.price,
          quantity: item?.quantity,
        });
      });
    const totalPrice =
      selectedItem.length > 0 &&
      selectedItem?.reduce((previousValue, currentValue) => {
        return previousValue + Number(currentValue.price) * currentValue.quantity;
      }, 0);
    const secondStepPreapareData = {
      bookingItemList: bookingItemList,

      step: current + 1,
    };
    if (bookingItemList.length <= 0) {
      toast.error("Please Select item!!");
    } else {
      const bookingCreateResponse = await doFetchBookingCreate(
        secondStepPreapareData,
        false,
        searchParams.get("bookingId"),
        current + 1,
        localStorage.getItem("_token") ? true : false
      );
      // console.log(bookingCreateResponse, "response::: ");
      if (bookingCreateResponse?.status === 200) {
        prepareReduxStoreData();
        successResponse();
      } else if (bookingCreateResponse?.status === 422) {
        toast.error(bookingCreateResponse?.data?.message);
      }
    }
  };

  return {
    filterCategoryData,
    categoryList,
    handleSearchItem,
    boxOptions,
    isTypeOfBoxesModalOpen,
    handleClickOnPopularCategory,
    handleClickOnPopularClose,
    handleClickAllCategory,
    handleChangeSubcategorySelect,
    addBoxSubCategory,
    selectedItem,
    selectedCategoryList,
    handlePlusBtn,
    handleMinusBtn,
    isDontSeeModalOpen,
    handleClickAllCategoryClose,
    clickOnNextButton,
    addMultipleCategoriesCheckbox,
    addAllSelectedCheckboxCategory,
    subCategoryId,
    totalQuantity,
  };
};
