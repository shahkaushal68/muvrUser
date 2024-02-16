import React from "react";
import { clsx } from "clsx";
import { Link } from "react-router-dom";
import { Apple, Sms } from "iconsax-react";
import {
  MVHeader,
  MVIcon,
  MVCheckbox,
  MVButton,
  MVPhoneInput,
  MVTextInput,
  MVModal,
} from "../../../components";
import muvrLogo from "../../../assets/images/logo/login-header-logo.png";
import styles from "../Auth.module.css";
import styleguide from "../../Styleguide/Styleguide.module.css";
import { useLoginHook } from "../../../hooks";

export const Login = () => {
  const {
    isLoading,
    loginData,
    errorMessage,
    validateMessages,
    handlePhoneInputChange,
    handleChangeSelect,
    handleInputChange,
    handleLoginSubmit,
    registerCallback,
    handleLoginTypeChange,
    isNotRegisteredModalOpen,
    setIsNotRegisteredModalOpen,
    handleChangeCheckBox,
  } = useLoginHook();
  return (
    <>
      <MVHeader>
        <div className="position-relative w-100">
          <Link to={"/choose-auth"} className={"positioned-left header-btn"}>
            {MVIcon.BackArrow}
          </Link>
          <img
            src={muvrLogo}
            alt="Muvr"
            width={95}
            height={32}
            className="d-block obj-contain fluid mx-auto"
          />
        </div>
      </MVHeader>
      <section className={styles.loginPageStructure}>
        <div>
          <h2 className={styles.pageTitle}>Welcome</h2>
          <h4 className={styles.pageSubTitle}>
            What's your {loginData?.loginType}{" "}
            {`${loginData?.loginType === "phone" ? "number" : "address"}`}?
          </h4>
        </div>

        {loginData?.loginType === "phone" ? (
          <div className={styles.loginInputWrap}>
            <MVPhoneInput
              name="phoneNumber"
              label={"Enter phone number"}
              placeholder="000-000-000"
              onChange={(event) => handlePhoneInputChange(event, "phoneNumber")}
              errorMessage={validateMessages?.phoneNumber}
              selectedCountry={loginData?.phoneCode}
              handleChangeSelect={handleChangeSelect}
            />
          </div>
        ) : (
          <div className={styles.loginInputWrap}>
            <MVTextInput
              name={"email"}
              label={"Email address"}
              prefix={
                <Sms size="24" color="var(--accent-primary)" variant="Bold" />
              }
              placeholder={"Enter Text..."}
              onChange={handleInputChange}
              errorMessage={validateMessages?.email}
            />
          </div>
        )}
        <Link
          to={"#"}
          className={clsx(styles.emailLink, "link link-primary fw-400 h5")}
          onClick={() => handleLoginTypeChange(loginData?.loginType)}
        >
          Or{" "}
          {loginData?.loginType === "phone" ? "email address" : "Phone Number"}
        </Link>
        <MVButton
          handleClick={() => handleLoginSubmit()}
          variant={"primary"}
          className={styles.continueBtn}
          isLoading={isLoading}
        >
          Continue
        </MVButton>
        <h5 className="fw-400 darkgray text-center">Or</h5>
        <div className={styles.continueWithBtnContainer}>
          <MVButton
            variant={"bordered"}
            className={clsx(styles.continueWithBtn)}
          >
            <Apple size="20" color="var(--clr-dark)" variant="Bold" /> Continue
            with Apple
          </MVButton>
          <MVButton
            variant={"bordered"}
            className={clsx(styles.continueWithBtn)}
          >
            {MVIcon.GoogleLogo} Continue with Google
          </MVButton>
          <MVButton
            variant={"bordered"}
            className={clsx(styles.continueWithBtn)}
          >
            {MVIcon.FacebookLogo} Continue with Facebook
          </MVButton>
        </div>
        <MVCheckbox
          className={styles.termsCheckbox}
          checked={loginData?.isAgreement}
          handleChange={handleChangeCheckBox}
        >
          By proceeding, you consent to get calls, WhatsApp or SMS messages,
          including by automated dialer, from Muvr and its affiliates to the
          number provided.
        </MVCheckbox>
        {validateMessages?.isAgreement && (
          <span className="error-message">{validateMessages?.isAgreement}</span>
        )}
      </section>

      <MVModal
        title="This is a modal title"
        open={isNotRegisteredModalOpen}
        width={500}
        handleClose={() => setIsNotRegisteredModalOpen(false)}
        centered
        confirmationModal
        className={styleguide.notRegisteredModal}
      >
        <div>
          <h2 className="fw-600 text-center mb-3">Not registered</h2>
          <h5 className="darkgray fw-400 mb-6 text-center">
            You have entered a non-register mobile no, Do you want to create a
            new account?
          </h5>
          <div className={styleguide.cancelAddBtnWrap}>
            <MVButton
              variant={"secondary"}
              className="w-100"
              handleClick={() => setIsNotRegisteredModalOpen(false)}
            >
              Not now
            </MVButton>
            <MVButton
              variant={"primary"}
              className="w-100"
              handleClick={() => registerCallback()}
            >
              Continue
            </MVButton>
          </div>
        </div>
      </MVModal>
    </>
  );
};

export default Login;
