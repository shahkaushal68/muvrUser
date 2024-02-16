import { useEffect, useState } from "react";
import { doDeleteCard, doEditCards, doViewCards } from "../../actions";
import { getDescryptionString } from "../../services";
import { toast } from "react-toastify";

export const useWalletCardDetailsHook = () => {
  const [loading, setLoading] = useState(false);
  const [walletCardList, setWalletCardList] = useState({});

  useEffect(() => {
    try {
      setLoading(true);
      fetchCardDetails();
    } catch (error) {
      console.error("Error occurred during login:", error);
    }
  }, []);

  const fetchCardDetails = async () => {
    try {
      const cardResponse = await doViewCards();
      if (cardResponse?.status === 200) {
        const cardDetails = JSON.parse(getDescryptionString(cardResponse?.data?.data));
        console.log(cardDetails);
        setWalletCardList(cardDetails);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditCardDetails = async (cardId) => {
    try {
      setLoading(true);
      const cardPayload = {
        isDefault: true,
      };
      const editCardResponse = await doEditCards(cardId, cardPayload);
      if (editCardResponse?.status === 200) {
        fetchCardDetails();
        toast.success(editCardResponse?.data?.message);
      }
    } catch (error) {
      console.log({ error });
    }
  };

  const handleDeleteCardDetails = async (cardId) => {
    console.log(cardId);
    try {
      setLoading(true);

      const deleteCardResponse = await doDeleteCard(cardId);
      if (deleteCardResponse?.status === 200) {
        fetchCardDetails();
        toast.success(deleteCardResponse?.data?.message);
      }
    } catch (error) {
      console.log({ error });
    }
  };

  return {
    loading,
    walletCardList,
    handleEditCardDetails,
    handleDeleteCardDetails,
  };
};
