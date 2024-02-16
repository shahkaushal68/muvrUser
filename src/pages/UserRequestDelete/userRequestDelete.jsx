import { Sms } from "iconsax-react";
import { MVButton, MVModal, MVPhoneInput, MVTextInput } from "../../components";
import styles from "./UserRequestDelete.module.css";
import clsx from "clsx";
import { useAccountDeleteRequest } from "../../hooks/accountDelete/deleteAccountRequest.hook";

export const UserRequestDelete = () => {
  const {
    isLoading,
    loginData,
    validateMessages,
    isRequestFavoriteMuvrModalOpen,
    handleReqestMuvrModalClose,
    handleInputChange,
    handleChangeSelect,
    handlePhoneInputChange,
    handleLoginSubmit,
    handleClickRequestAccountDelete,
  } = useAccountDeleteRequest();

  return (
    <>
      <section className={styles.userRequestDeleteSection}>
        <h1 className="text-center mb-5">User delete account</h1>
        <MVPhoneInput
          name="phone"
          label={"Enter phone number"}
          placeholder="000-000-000"
          onChange={(event) => handlePhoneInputChange(event, "phone")}
          errorMessage={validateMessages?.phone}
          value={loginData?.phone}
          selectedCountry={loginData?.phoneCode}
          handleChangeSelect={handleChangeSelect}
        />
        <h4 className="py-5 text-center">OR</h4>
        <MVTextInput
          name={"email"}
          label={"Email address"}
          prefix={<Sms size="24" color="var(--accent-primary)" variant="Bold" />}
          placeholder={"Enter Text..."}
          onChange={handleInputChange}
          value={loginData?.email}
          errorMessage={validateMessages?.email}
        />
        <div className="w-100 text-center mt-5">
          <MVButton handleClick={() => handleLoginSubmit()} variant={"primary"} className={clsx(styles.continueBtn, "mt-5")}>
            Submit
          </MVButton>
        </div>
      </section>

      <MVModal
        title="This is a modal title"
        open={isRequestFavoriteMuvrModalOpen}
        width={500}
        handleClose={() => handleReqestMuvrModalClose(false)}
        centered
        confirmationModal
        className={styles.requestFavoriteMuvrModal}
      >
        <div className="pa-5">
          <h1 className="text-center mb-5 pb-5">Are you sure want to delete this request account?</h1>
          <div className={clsx(styles.confirmNotnowBtn, "d-flex align-center justify-center mt-5")}>
            <MVButton variant={"primary"} className="w-100 mr-2" handleClick={() => handleClickRequestAccountDelete()} loading={isLoading}>
              Yes
            </MVButton>
            <MVButton variant={"secondary"} className="w-100" handleClick={() => handleReqestMuvrModalClose(false)}>
              No
            </MVButton>
          </div>
        </div>
      </MVModal>
    </>
  );
};
