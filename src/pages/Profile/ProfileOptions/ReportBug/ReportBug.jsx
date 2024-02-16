import { Link } from "react-router-dom";
import { MVButton, MVHeader, MVIcon, MVSelect, MVTextArea } from "../../../../components";
import styles from "../ReportBug/ReportBug.module.css";
//import { styleguideSelectOptions } from "../../../../constants/data";
import { Profile } from "iconsax-react";
import { Col, Row, Upload } from "antd";
import clsx from "clsx";
import { useReportBugHook } from "../../../../hooks";
import { MVImageUploadGallaryInput } from "../../../../components/MVUploadGallaryInput/MVUploadGallaryInput";

const ReportBug = () => {
  const {


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
  } = useReportBugHook();

  return (
    <>
      <MVHeader>
        <div className={"position-relative w-100"}>
          <Link to={"/profile"} className={"positioned-left header-btn"}>
            {MVIcon.BackArrow}
          </Link>
          <h3 className={"text-center fw-600"}>Report a bug</h3>
        </div>
      </MVHeader>
      <section className={"content-full pt-6 pl-4 pr-4 pb-10 h-100"}>
        <div className="mb-6">
          <p className="darkgray">Let us know what problems you are facing while using the app</p>
        </div>
        <div className={styles.cardFormContent}>
          <Row gutter={[12, 12]}>
            <Col span={24}>
              <MVSelect
                id={"mv-select"}
                name="type"
                value={bugTypeData.type}
                defaultValue={"Select Bug Type"}
                label="Bug Type"
                prefix={<Profile color="var(--accent-primary)" variant="Bold" size={24} />}
                options={bugTypesOption}
                handleChange={(event) => handleSelectChange(event, "type")}
              />
              {Object.keys(errorMessage).length > 0 && errorMessage && (
                <span className="error-message">{errorMessage?.bugType}</span>
              )}
            </Col>
            <Col span={24}>
              <MVTextArea
                value={bugTypeData.description}
                name={"description"}
                placeholder={"Add description"}
                rows={4}
                onChange={(event) => handleInputChange(event)}
              />
              {Object.keys(errorMessage).length > 0 && errorMessage && (
                <span className="error-message">{errorMessage?.description}</span>
              )}
            </Col>
            <Col span={24}>
              <MVImageUploadGallaryInput
                fileList={uploadingImages}
                handleFileInputChange={handleFileInputChange}
                // onClickUpload={onClickUpload}
                deleteFile={deleteFile}
                loading={loading}
              />
              {Object.keys(errorMessage).length > 0 && errorMessage && (
                <span className="error-message">{errorMessage?.uploadImage}</span>
              )}
            </Col>
          </Row>
        </div>
      </section>
      <MVButton
        variant="primary"
        className={`w-100 align-self-end radius-none ${styles.stepsBtn}`}
        handleClick={handleSubmitBugReport}
      >
        Send
      </MVButton>
    </>
  );
};

export default ReportBug;
