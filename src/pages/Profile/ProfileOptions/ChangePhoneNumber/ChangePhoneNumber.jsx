import { Link } from "react-router-dom";
import { MVButton, MVHeader, MVIcon, MVPhoneInput, MVTextInput } from "../../../../components";
import styles from "../ChangePhoneNumber/ChangePhoneNumber.module.css";
import { useChangeEmailPhoneHook } from "../../../../hooks";
import { Sms } from "iconsax-react";

const ChangePhoneNumber = () => {
  const { state, isDisabled, editProfileData, validateMessages, handleInputChange, handlePhoneInputChange, handleChangeSelect, handleLoginSubmit } = useChangeEmailPhoneHook();
  return (
    <>
      <MVHeader>
        <div className={"position-relative w-100"}>
          <Link to={"/setting"} className={"positioned-left header-btn"}>
            {MVIcon.BackArrow}
          </Link>
          <h3 className={"text-center fw-600"}>{state?.changeType === "phone" ? "Change phone number" : "Verify"}</h3>
        </div>
      </MVHeader>
      <section className={"content-full pt-6 pl-4 pr-4 pb-10 h-100 d-flex flex-column justify-space-between"}>
        {state?.changeType === "phone" ? (
          <div className={styles.cardContent}>
            <MVPhoneInput
              label={"Enter phone number"}
              placeholder="000-000-000"
              rootClassName={"mb-2"}
              onChange={(event) => handlePhoneInputChange(event, "phoneNumber")}
              errorMessage={validateMessages?.phoneNumber}
              selectedCountry={editProfileData?.phoneCode}
              handleChangeSelect={handleChangeSelect}
            />
            <p className="p darkgray mb-4">A verification code will be sent to this number</p>
          </div>
        ) : (
          <div className={styles.cardContent}>
            <MVTextInput
              label={"Email address"}
              name={"email"}
              prefix={<Sms color="var(--accent-primary)" variant="Bold" size={24} />}
              placeholder={"davidjohnson123@gmail.com"}
              rootClassName={"mb-2"}
              onChange={handleInputChange}
              errorMessage={validateMessages?.email}
            />
            <p className="p darkgray pb-4">A verification code will be sent to this email</p>
          </div>
        )}
        <div className={"card-btn w-100"}>
          <MVButton variant={"primary"} size="medium" className={"w-100"} handleClick={() => handleLoginSubmit()} disabled={isDisabled}>
            {state?.changeType === "phone" ? "Update" : "Verify"}
          </MVButton>
        </div>
      </section>
    </>
  );
};

export default ChangePhoneNumber;
