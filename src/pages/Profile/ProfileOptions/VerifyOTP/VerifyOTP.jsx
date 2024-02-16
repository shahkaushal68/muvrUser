import { Link } from "react-router-dom";
import { MVButton, MVHeader, MVIcon, MVModal } from "../../../../components";
import OtpInput from "react-otp-input";
import styles from "../VerifyOTP/VerifyOTP.module.css"
import { Col, Row } from "antd";
import { useState } from "react";

const VerifyOTP = () => {
  const [otp, setOtp] = useState("");
  const [isCodeSendMethod, setIsCodeSendMethod] = useState(false);
  return (
    <>
      <MVHeader>
        <div className={"position-relative w-100"}>
          <Link to={"/setting"} className={"positioned-left header-btn"}>
            {MVIcon.BackArrow}
          </Link>
        </div>
      </MVHeader>
      <section className={"content-full pt-6 pl-4 pr-4 pb-10 h-100 d-flex flex-column justify-space-between"}>
        <div className={styles.cardContent}>
          <div>
            <h2 className={styles.pageTitle}>Verification Code</h2>
            <h4 className={styles.pageSubTitle}>
              Enter the code sent to your new phone number: {" "}
              <span className="dark">+1 (808) 555-0111</span>
            </h4>
          </div>
          <div className={styles.otpInputWrap}>
            <OtpInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              shouldAutoFocus
              renderInput={({ style, ...rest }) => (
                <input
                  style={{}}
                  {...rest}
                />
              )}
              inputType={"tel"}
              inputStyle={styles.otpInputVerificationCode}
            />
          </div>
          <h5 className={styles.resendCodeText}>Resend code in 0:11</h5>
        </div>
        <div className={"card-btn w-100"}>
          <MVButton
            variant={"primary"}
            className={styles.verifyOtpBtn}
            handleClick={() => setIsCodeSendMethod(true)}
          >
            Verify OTP
          </MVButton>
        </div>
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
                <MVButton
                  variant="bordered"
                  className={styles.otpSendMethodModalBtn}
                >
                  Resend code via SMS
                </MVButton>
              </Col>
              <Col span={24}>
                <MVButton
                  variant="bordered"
                  className={styles.otpSendMethodModalBtn}
                >
                  Call me with code
                </MVButton>
              </Col>
              <Col span={24}>
                <MVButton
                  handleClick={() => setIsCodeSendMethod(false)}
                  variant="primary"
                  className={styles.otpSendMethodModalBtn}
                >
                  Cancel
                </MVButton>
              </Col>
            </Row>
          </div>
        </MVModal>
      </section>
    </>
  );
}

export default VerifyOTP