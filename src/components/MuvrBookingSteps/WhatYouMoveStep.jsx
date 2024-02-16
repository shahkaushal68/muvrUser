import styles from "./MuvrBookingSteps.module.css";
import { MVImageUploadGallary } from "../MVImageUploadGallary/MVImageUploadGallary";
import { MVTextArea } from "../MVInput/MVInput";
import { useWhatYouMoveStepHook } from "../../hooks";
import { MVButton } from "../MVButton/MVButton";

export const WhatYouMoveStep = ({ successResponse, current }) => {
  const {
    loading,
    instructions,
    handleInstructionChangeTextare,
    uploadingImages,
    handleFielInputChange,
    // onClickUpload,
    deleteFile,
    handleClickOnNextButton,
    errorMessage,
  } = useWhatYouMoveStepHook(successResponse, current);

  return (
    <>
      <div className="content-full">
        <section className="main-wrapper">
          <h2 className="fw-600">Special instructions</h2>
          <div className="w-100 mt-3">
            <MVTextArea
              label={<span className="accent-primary fw-500 p-sm">Share instructions with your Muvrs</span>}
              placeholder={"\n• Gate code: 5676 \n• Parking: Road parking\n• Elevator: On east side \n• Building/Unit: B1"}
              className="w-100"
              value={instructions}
              handleChange={(e) => handleInstructionChangeTextare(e)}
            />
            {Object.keys(errorMessage).length > 0 && errorMessage && <span className="error-message">{errorMessage?.specialInstruction}</span>}
          </div>
          <div className="mt-6">
            <h2 className="fw-600">Add images</h2>
            <MVImageUploadGallary
              fileList={uploadingImages}
              handleFielInputChange={handleFielInputChange}
              // onClickUpload={onClickUpload}
              deleteFile={deleteFile}
              loading={loading}
            />
            {Object.keys(errorMessage).length > 0 && errorMessage && <span className="error-message">{errorMessage?.addImages}</span>}
          </div>
        </section>
      </div>

      <MVButton variant="primary" className={`w-100 align-self-end radius-none ${styles.stepsBtn}`} handleClick={() => handleClickOnNextButton()}>
        Next
      </MVButton>
    </>
  );
};
