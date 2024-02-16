import { useState, useEffect, useMemo } from "react";
import { LogoutCurve } from "iconsax-react";
import { doDeleteImage, doUploadImage } from "../../actions";
import { doFetchBugTypes, doSubmitBugReport } from "../../actions/profile/profile.action";
import { getDescryptionString } from "../../services";
import { toast } from "react-toastify";
import { validateEnterText, validateSelectChange, validateSubmitBugReport, validateUploadImage } from "../../validations/profile/bugReport.validate";

export const useReportBugHook = () => {

    const [loading, setLoading] = useState(false);
    const [uploadingImages, setUploadingImages] = useState([]);
    const [bugTypesList, setBugTypesList] = useState([]);
    const [bugTypeData, setBugTypeData] = useState({})
    const [errorMessage, setErrorMessage] = useState({});

    const fetchBugTypes = async () => {
        const fetchBugTypesData = await doFetchBugTypes();
        if (fetchBugTypesData?.status === 200) {
            const bugTypes = JSON.parse(getDescryptionString(fetchBugTypesData?.data?.data));
            setBugTypesList(bugTypes)
        }
    }
    const handleSelectChange = (value, name) => {
        const { errors } = validateSelectChange(value, errorMessage);
        setErrorMessage({ ...errors });
        setBugTypeData({ ...bugTypeData, [name]: value })
    }
    const handleInputChange = (event) => {
        const { errors } = validateEnterText(event.target.value, errorMessage);
        setErrorMessage({ ...errors });
        const { name, value } = event?.target
        //console.log(name, value, "input:::")
        setBugTypeData({ ...bugTypeData, [name]: value })
    }

    const handleSubmitBugReport = async () => {
        const { errors } = validateSubmitBugReport(bugTypeData, uploadingImages);
        setErrorMessage({ ...errors });
        if (Object.keys(errors).length === 0) {
            try {
                const reportData = {
                    ...bugTypeData,
                    imageList: uploadingImages
                }

                const submitReport = await doSubmitBugReport(reportData);
                if (submitReport?.status === 200) {
                    toast.success(submitReport?.data?.message);
                    //console.log("bugTypeData-----", bugTypeData);
                    setBugTypeData({
                        type: "",
                        description: ''
                    });
                    setUploadingImages([]);
                }

            } catch (error) {
                console.log({ error });
            }
        }

    }

    const handleFileInputChange = (event) => {
        setLoading(true);
        const { files } = event.target;
        for (const file of files) {
            //console.log("file----------", file);
            let reader = new FileReader();
            //console.log("reader", reader);
            reader.onloadend = async () => {
                //console.log(loading);
                const uploadImageResponse = await doUploadImage({
                    image: reader.result,
                    folderName: "bug",
                });
                //console.log("uploadImageResponse-------", uploadImageResponse);
                if (uploadImageResponse?.status === 200) {
                    uploadingImages?.push({
                        image: uploadImageResponse?.data?.data?.imageName,
                        baseImage: reader.result,
                    });
                    setUploadingImages((prevState) => [...uploadingImages]);
                    setLoading(false);
                    const { errors } = validateUploadImage(uploadingImages, errorMessage);
                    setErrorMessage({ ...errors });
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const deleteFile = async (item) => {
        const imageName = item?.booking_id ? item?.image.split("/").pop() : item?.image;
        const deleteImageResponse = await doDeleteImage({
            image: imageName,
            folderName: "bug",
        });
        //console.log("deleteImageResponse------------", deleteImageResponse);
        if (deleteImageResponse?.status === 200) {
            const removeUploadedImage = uploadingImages && uploadingImages.length > 0 && uploadingImages?.filter((images) => images !== item);

            setUploadingImages(removeUploadedImage);
        }
    };

    useEffect(() => {
        fetchBugTypes();
    }, [])


    const bugTypesOption =
        bugTypesList &&
        bugTypesList?.length > 0 &&
        bugTypesList.map(bugItem => ({
            value: bugItem,
            label: bugItem,
        }));


    return {
        loading,
        errorMessage,
        uploadingImages,
        handleFileInputChange,
        handleSelectChange,
        handleInputChange,
        handleSubmitBugReport,
        deleteFile,
        bugTypesOption,
        bugTypeData
    }
}