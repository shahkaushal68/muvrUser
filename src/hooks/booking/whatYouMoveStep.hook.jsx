import { useEffect, useState } from "react";
import { doDeleteImage, doFetchBookingCreate, doUploadImage } from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { validateSpecialInstruction, whatAreYouMovingValidateNextLogin } from "../../validations/booking";
//import { getBase64FromImage } from "../../services";

export const useWhatYouMoveStepHook = (successResponse, current) => {
  const dispatch = useDispatch();
  const { bookingCreateFormData } = useSelector((state) => state?.bookingReducer);
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [uploadingImages, setUploadingImages] = useState();
  const [instructions, setInstructions] = useState(null);
  const [errorMessage, setErrorMessage] = useState({});
  // const [isImagesListAndUploadNewImage, setIsImagesListAndUploadNewImage] = useState([]);

  useEffect(() => {
    const bookingImages = bookingCreateFormData?.bookingImages && bookingCreateFormData?.bookingImages?.length > 0 ? bookingCreateFormData?.bookingImages : [];
    setUploadingImages(bookingImages);
    setInstructions(bookingCreateFormData?.specialInstruction || null);
  }, [bookingCreateFormData]);

  const handleInstructionChangeTextare = (event) => {
    const { errors } = validateSpecialInstruction(event.target.value, errorMessage);
    setErrorMessage({ ...errors });
    setInstructions(event.target.value);
  };

  //console.log("uploadingImages---", uploadingImages);
  const handleFielInputChange = (event) => {
    setLoading(true);
    const { files } = event.target;
    for (const file of files) {
      let reader = new FileReader();
      let type = file?.type;
      if (type?.toLowerCase()?.includes("image")) {
      } else {
        return;
      }

      reader.onloadend = async () => {
        //console.log(loading);
        const uploadImageResponse = await doUploadImage({
          image: reader.result,
          folderName: "images",
        });
        if (uploadImageResponse?.status === 200) {
          //console.log("uploadImageResponse-----------", uploadImageResponse);
          uploadingImages.push({
            image: uploadImageResponse?.data?.data?.imageName,
            baseImage: reader.result,
          });
          setUploadingImages((prevState) => [...uploadingImages]);
          setLoading(false);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const deleteFile = async (item) => {
    const imageName = item?.booking_id ? item?.image.split("/").pop() : item?.image;
    const deleteImageResponse = await doDeleteImage({
      image: imageName,
      folderName: "images",
    });

    if (deleteImageResponse?.status === 200) {
      const removeUploadedImage = uploadingImages && uploadingImages.length > 0 && uploadingImages.filter((images) => images !== item);

      setUploadingImages(removeUploadedImage);
    }
  };

  // prepareReduxStoreData
  const prepareReduxStoreData = () => {
    const prepareBookingDataSelectItemStep = {
      ...bookingCreateFormData,
      bookingImages: uploadingImages,
      specialInstruction: instructions,
      step: current + 1,
    };

    dispatch({
      type: "STORE_BOOKING_FORM_DATA",
      payload: prepareBookingDataSelectItemStep,
    });
  };

  //Click On Next Button
  const handleClickOnNextButton = async () => {
    const newImageAddIfImagePresentInRedux = uploadingImages?.filter((item) => !item?.hasOwnProperty("booking_id"));
    const partialnewImageAddIfImagePresentInRedux = newImageAddIfImagePresentInRedux.map(({ image }) => ({ image }));

    const { errors } = whatAreYouMovingValidateNextLogin(instructions);
    setErrorMessage({ ...errors });
    if (Object.keys(errors).length === 0) {
      if (newImageAddIfImagePresentInRedux?.length > 0) {
        try {
          const sixStepPreapareData = {
            //serviceId: bookingCreateFormData?.serviceId,
            specialInstruction: instructions?.trim(),
            bookingImageList: partialnewImageAddIfImagePresentInRedux,
            step: current + 1,
          };

          const bookingCreateResponse = await doFetchBookingCreate(
            sixStepPreapareData,
            false,
            searchParams.get("bookingId"),
            current + 1,
            localStorage.getItem("_token") ? true : false
          );

          if (bookingCreateResponse?.status === 200) {
            prepareReduxStoreData();
            successResponse();
          }
        } catch (error) {
          console.log({ error });
        }
      } else {
        prepareReduxStoreData();
        successResponse();
      }
    }
  };

  return {
    loading,
    instructions,
    handleInstructionChangeTextare,
    uploadingImages,
    handleFielInputChange,
    deleteFile,
    handleClickOnNextButton,
    errorMessage,
  };
};
