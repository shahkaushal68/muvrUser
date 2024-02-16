import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { appConfig } from "../../../config";
import { doFetchBookingCreate, doFetchTipFail, doFetchTipSuccess, doFetchUserProfile, doPaymentFail, doPaymentSuccess } from "../../../actions";
import { useDispatch, useSelector } from "react-redux";
import { getDescryptionString } from "../../../services";
import { useNavigate } from "react-router-dom";
import { MVButton } from "../../MVButton/MVButton";
import { toast } from "react-toastify";

const CheckoutForm = ({ amount, currency, bookingId, bookingData, modalClose, toId, tipModalClose }) => {
  const { userDetails } = useSelector((state) => state.storeAuthenticateReducer);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const [clientSecret, setClientSecret] = useState("");
  const [paymentId, setPaymentId] = useState("");

  useEffect(() => {
    try {
      fetchUserDetail();
    } catch (error) {
      console.error("Error", error);
    }
  }, []);

  useEffect(() => {
    try {
      createPaymentIntel();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const createPaymentIntel = async () => {
    const response = await fetch("https://api.stripe.com/v1/payment_intents", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${appConfig.STRIPE_SECRET_KEY}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({ amount: amount * 100, currency: currency, "payment_method_types[]": "card", customer: userDetails?.customer_id }),
    });

    const paymentResponse = await response.json();
    // console.log(paymentResponse);
    const clientSecret = paymentResponse?.client_secret;
    setClientSecret(clientSecret);
    setPaymentId(paymentResponse?.id);
  };

  const fetchUserDetail = async () => {
    if (userDetails == null) {
      const userDetailResponse = await doFetchUserProfile();
      if (userDetailResponse?.status === 200) {
        const userDetailData = JSON.parse(getDescryptionString(userDetailResponse?.data?.data));
        dispatch({
          type: "STORE_AUTH_USER",
          payload: userDetailData?.profile,
        });
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });
    if (!toId) {
      const bookingCreateResponse = await doFetchBookingCreate(bookingData, true, bookingId, bookingData?.step, localStorage.getItem("_token") ? true : false);

      if (bookingCreateResponse?.status === 200) {
        // console.log(bookingCreateResponse);
        if (payload.error) {
          console.log(`Payment failed ${payload.error.message}`);
          handleSuccessPayment(payload?.paymentIntent?.status);
        } else {
          // console.log(true, payload);
          handleSuccessPayment(payload?.paymentIntent?.status);
        }
      }
    } else {
      if (payload.error) {
        console.log(`Tip Payment failed ${payload.error.message}`);
        handleTipPayment(payload?.paymentIntent?.status);
      } else {
        // console.log(true, payload);
        handleTipPayment(payload?.paymentIntent?.status);
      }
    }

    setIsLoading(false);
    modalClose();
    if (toId) {
      tipModalClose();
    }
  };

  const handleSuccessPayment = async (status) => {
    if (paymentId) {
      const paymentPayload = {
        paymentId: paymentId,
        bookingId: bookingId,
      };
      if (status === "succeeded") {
        const successResponse = await doPaymentSuccess(paymentPayload);
        // console.log(successResponse);
        if (successResponse?.status === 200) {
          toast.success(successResponse?.data?.message);
          navigate("/booking-complete", { state: { fromBooking: bookingData?.bookingMuvrList?.length === 0 ? true : false } });
        }
      } else {
        const failResponse = await doPaymentFail(paymentPayload);
        if (failResponse?.status === 200) {
          toast.error(failResponse?.data?.message);
          console.log(failResponse);
        }
      }
    }
  };

  const handleTipPayment = async (status) => {
    const paymentPayload = {
      paymentId: paymentId,
      bookingId: bookingId,
    };
    if (status === "succeeded") {
      paymentPayload.toId = toId;
      console.log(paymentPayload);
      const successTipRsponse = await doFetchTipSuccess(paymentPayload);
      if (successTipRsponse?.status === 200) {
        toast.success(successTipRsponse?.data?.message);
        console.log(successTipRsponse);
      }
    } else {
      const failTipResponse = await doFetchTipFail(paymentPayload);
      if (failTipResponse?.status === 200) {
        toast.error(failTipResponse?.data?.message);
        console.log(failTipResponse);
      }
    }
  };
  return (
    <>
      <form id="payment-form" onSubmit={handleSubmit}>
        <CardElement id="card-element"></CardElement>
        <MVButton className={"d-block mx-auto mt-8"} variant="primary" disabled={isLoading}>
          Pay Now
        </MVButton>
      </form>
    </>
  );
};

export default CheckoutForm;
