import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { doAddCard } from "../../actions";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { validateOnChangeAddToCard, validateOnclickAddCardButton } from "../../validations/booking";

export const useAddToCardHook = () => {
  const { bookingCreateFormData } = useSelector((state) => state?.bookingReducer);
  const navigate = useNavigate();
  const [cardDetails, setCardDetails] = useState({
    cardHolderName: "",
    cardNumber: "",
    expDate: "",
    cvc: "",
    zipCode: "",
    nickName: "",
  });
  const [isDefaultCard, setIsDefaultCard] = useState(false);
  const [errorMessage, setErrorMessage] = useState({});

  const handleDefaultCard = (e) => {
    setIsDefaultCard(e.target.checked);
  };
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    const { errors } = validateOnChangeAddToCard(name, value, errorMessage);
    setErrorMessage({ ...errors });
    setCardDetails({
      ...cardDetails,
      [name]: value,
    });
  };

  const handleAddCard = async (event) => {
    const { errors } = validateOnclickAddCardButton(cardDetails);
    setErrorMessage({ ...errors });
    if (Object.keys(errors).length === 0) {
      event.preventDefault();
      const subString = cardDetails.expDate.split("/");
      const submitCardData = {
        cardHolderName: cardDetails?.cardHolderName,
        cardNumber: cardDetails?.cardNumber,
        expiryMonth: subString[0],
        expiryYear: subString[1],
        cvc: cardDetails?.cvc,
        isDefault: isDefaultCard,
      };
      const addCardresponse = await doAddCard(submitCardData);
      if (addCardresponse?.status === 200) {
        if (bookingCreateFormData?.bookingId) {
          navigate(`/booking-steps?bookingId=${bookingCreateFormData?.bookingId}`);
        } else {
          navigate("/wallet");
        }
        toast.success("Card Added Successfully!");
      } else {
        toast.error(addCardresponse?.data?.err);
      }
    }
  };
  const goBack = () => {
    navigate(-1, { paymentStep: "true" });
  };

  return {
    goBack,
    cardDetails,
    handleInputChange,
    handleAddCard,
    handleDefaultCard,
    errorMessage,
  };
};
