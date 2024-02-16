import React, { useState } from "react";
import { Link } from "react-router-dom";
import OtpInput from "react-otp-input";
import { MVIcon, MVModal, MVHeader, MVButton } from "../../../components";
import { Row, Col } from "antd";
import muvrLogo from "../../../assets/images/logo/login-header-logo.png";
import styles from "../Auth.module.css";
import { useOTPVerifyHook } from "../../../hooks";

export const OTPVerification = () => {
  const { otp, setOtp, isLoading, errorMessage, changeUserDetails, authUserDetails, isCodeSendMethod, setIsCodeSendMethod, handleSubmitClick } = useOTPVerifyHook();
  return (
    <>
      <MVHeader>
        <div className="position-relative w-100">
          <Link to={authUserDetails ? "/authentication/login" : "/settings"} className={"positioned-left header-btn"}>
            {MVIcon.BackArrow}
          </Link>
          <img src={muvrLogo} alt="Muvr" width={95} height={32} className="d-block obj-contain fluid mx-auto" />
        </div>
      </MVHeader>
      <section className={styles.loginPageStructure}>
        <div>
          <h2 className={styles.pageTitle}>Verification Code</h2>
          <h4 className={styles.pageSubTitle}>
            Enter the code sent to{" "}
            <span className="dark">
              {authUserDetails
                ? authUserDetails?.email
                  ? authUserDetails?.email
                  : `${authUserDetails?.phoneCode} ${authUserDetails?.phoneNumber}`
                : changeUserDetails && changeUserDetails?.email
                ? changeUserDetails?.email
                : `${changeUserDetails?.phoneCode} ${changeUserDetails?.phoneNumber}`}
            </span>
          </h4>
        </div>
        <div className={styles.otpInputWrap}>
          <OtpInput
            value={otp}
            onChange={setOtp}
            numInputs={6}
            shouldAutoFocus
            renderInput={({ style, ...rest }) => <input style={{}} {...rest} />}
            inputType={"tel"}
            inputStyle={styles.otpInputVerificationCode}
          />
          {errorMessage && <span className="error-message">{errorMessage}</span>}
        </div>
        <h5 className={styles.resendCodeText}>Resend code in 0:11</h5>
        <MVButton variant={"primary"} className={styles.verifyOtpBtn} handleClick={() => handleSubmitClick()} isLoading={isLoading}>
          Verify OTP
        </MVButton>
        <MVModal
          title="This is a modal title"
          open={isCodeSendMethod}
          width={500}
          handleClose={() => setIsCodeSendMethod(false)}
          centered
          className={styles.otpSendMethodModal}
          confirmationModal={true}
        >
          <div className="text-center">
            <Row gutter={[0, 16]}>
              <Col span={24}>
                <MVButton variant="bordered" className={styles.otpSendMethodModalBtn}>
                  Resend code via SMS
                </MVButton>
              </Col>
              <Col span={24}>
                <MVButton variant="bordered" className={styles.otpSendMethodModalBtn}>
                  Call me with code
                </MVButton>
              </Col>
              <Col span={24}>
                <MVButton handleClick={() => setIsCodeSendMethod(false)} variant="primary" className={styles.otpSendMethodModalBtn}>
                  Cancel
                </MVButton>
              </Col>
            </Row>
          </div>
        </MVModal>
      </section>
    </>
  );
};

export default OTPVerification;
