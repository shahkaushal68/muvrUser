import { MVTabs, FavoriteMuvrRadioCard, MVModal, MVRadioBtn, MVButton } from "../../components";
import styles from "./MuvrBookingSteps.module.css";
import signBoard from "../../assets/images/icons/exclamation-sign-board.svg";
import { useFavoriteMuvrsStep } from "../../hooks";
import { HeartRemove } from "iconsax-react";
import { formatNumberWithDecimal } from "../../services";

export const RequestFavoriteMuvrsStep = ({ successResponse, current }) => {
  const {
    bookingCreateFormData,
    clickOnNextButton,
    selectedDriver,
    selectedHelper,
    allFavouriteMuvrs,
    handleClickSelectDriver,
    handleClickSelectHelper,
    isRequestFavoriteMuvrModalOpen,
    handleFavouriteMuverModal,
    requestOptions,
    handleRadioButtonChange,
    handleTabChange,
    tabkey,
    handleConfirm,
    selectedBookingPopupValue,
    selectedBookingMuvrs,
    handleClickOnSkipButton,
  } = useFavoriteMuvrsStep(successResponse, current);

  const favoriteMuversTabItems = [
    {
      key: "1",
      label: `Driver`,
      children: (
        <>
          <h2 className="fw-600">Select Driver</h2>
          <div className="mt-3">
            {allFavouriteMuvrs?.driverList?.length > 0 &&
              allFavouriteMuvrs?.driverList?.map((driver, index) => {
                let selectedValueDriver;
                if (bookingCreateFormData?.bookingMuvrs[0]?.hasOwnProperty("muvr_id")) {
                  selectedValueDriver = bookingCreateFormData?.bookingMuvrs?.find((el) => el?.muvr_id === driver?.users?.id);
                } else {
                  selectedValueDriver = bookingCreateFormData?.bookingMuvrs?.find((el) => el?.muvrId === driver?.users?.id);
                }
                return (
                  <FavoriteMuvrRadioCard
                    name="driver"
                    key={index}
                    id={driver?.users?.id}
                    labelName={driver?.users?.first_name + " " + driver?.users?.last_name}
                    image={driver?.users?.profile_image}
                    value={driver}
                    rating={formatNumberWithDecimal(Number(driver?.totalRatingCount))}
                    bookings={driver?.bookings}
                    isSelected={selectedDriver != null ? selectedDriver === driver?.users : !!selectedValueDriver}
                    onChange={() => handleClickSelectDriver(driver?.users)}
                  />
                );
              })}
          </div>
        </>
      ),
    },
    {
      key: "2",
      label: `Helper`,
      children: (
        <>
          <h2 className="fw-600">Select Helper</h2>
          <div className="mt-3">
            {allFavouriteMuvrs?.helperList?.length > 0 &&
              allFavouriteMuvrs?.helperList?.map((helper, index) => {
                let selectedValueHelper;
                if (bookingCreateFormData?.bookingMuvrs[0]?.hasOwnProperty("muvr_id")) {
                  selectedValueHelper = bookingCreateFormData?.bookingMuvrs?.find((el) => el?.muvr_id === helper?.users?.id);
                } else {
                  selectedValueHelper = bookingCreateFormData?.bookingMuvrs?.find((el) => el?.muvrId === helper?.users?.id);
                }
                return (
                  <FavoriteMuvrRadioCard
                    name="helper"
                    key={index}
                    id={helper?.users?.id}
                    labelName={helper?.users?.first_name + " " + helper?.users?.last_name}
                    image={helper?.users?.profile_image}
                    value={helper}
                    rating={formatNumberWithDecimal(Number(helper?.totalRatingCount))}
                    bookings={helper?.bookings}
                    isSelected={selectedHelper != null ? selectedHelper === helper?.users : !!selectedValueHelper}
                    onChange={() => handleClickSelectHelper(helper?.users)}
                  />
                );
              })}
          </div>
        </>
      ),
    },
  ];

  const notSelectedFavMuvr = [
    {
      key: "1",
      label: `Driver`,
      children: (
        <>
          <div className={styles.muvrCardContainer}>
            {/* <div className="h-100 d-flex justify-center flex-column align-center"> */}
            <HeartRemove size="32" color="#000" variant="Bold" />
            <h3>No Favorite driver yet!</h3>
            <span className="mt-1">You don't have any favorite driver yet!</span>
            {/* </div> */}
          </div>
        </>
      ),
    },
    {
      key: "2",
      label: `Helper`,
      children: (
        <>
          {/* <div className="h-100 d-flex justify-center flex-column align-center"> */}
          <HeartRemove size="32" color="#000" variant="Bold" />
          <h3 className="fw-600">No Favorite helper yet!</h3>
          <span className="mt-1">You don't have any favorite helper yet!</span>
          {/* </div> */}
        </>
      ),
    },
  ];

  return (
    <>
      <section className="main-wrapper content-full">
        <MVTabs
          //defaultActiveTab="1"
          className={!allFavouriteMuvrs || allFavouriteMuvrs?.driverList?.length <= 0 || allFavouriteMuvrs?.helperList?.length <= 0 ? styles.emptyTabs : null}
          activeKey={tabkey}
          tabItems={allFavouriteMuvrs?.driverList?.length > 0 || allFavouriteMuvrs?.helperList?.length > 0 ? favoriteMuversTabItems : notSelectedFavMuvr}
          onChange={handleTabChange}
          shape="pill"
        />
      </section>

      {localStorage.getItem("_token") ? (
        selectedDriver || selectedHelper ? (
          <div className="d-flex align-center" style={{ gridGap: "10px" }}>
            <MVButton variant="secondary" className={"w-100"} handleClick={handleClickOnSkipButton}>
              Skip
            </MVButton>
            <MVButton variant="primary" className={"w-100"} onClick={() => handleFavouriteMuverModal(tabkey, true)}>
              Next
            </MVButton>
          </div>
        ) : (
          <MVButton variant="primary" className={`w-100 align-self-end radius-none ${styles.stepsBtn}`} handleClick={clickOnNextButton}>
            Book Now
          </MVButton>
        )
      ) : (
        <MVButton variant="primary" className={`w-100 align-self-end radius-none ${styles.stepsBtn}`} handleClick={clickOnNextButton}>
          Skip
        </MVButton>
      )}

      <MVModal
        title="This is a modal title"
        open={isRequestFavoriteMuvrModalOpen}
        width={500}
        handleClose={() => handleFavouriteMuverModal(false)}
        centered
        confirmationModal
        className={styles.requestFavoriteMuvrModal}
      >
        <div>
          <div className="d-flex align-center justify-center mb-6">
            <img src={signBoard} alt="sign board" />
          </div>
          <h4 className="fw-500 mb-5">How would you like us to proceed if your favorite Muvr does not accept or respond to the request within 24 hours?</h4>
          {/* {console.log({ sd3: selectedBookingMuvrs?.filter((item) => item?.value === selectedBookingPopupValue), selectedBookingPopupValue })}
          {console.log({ sd3: selectedBookingMuvrs?.filter((item) => item?.value === selectedBookingPopupValue), selectedBookingPopupValue })} */}
          <MVRadioBtn
            options={requestOptions}
            onChange={handleRadioButtonChange}
            className={styles.requestMuvrOptionsRadioBtn}
            value={selectedBookingPopupValue}
            isSelected={selectedBookingMuvrs?.filter((item) => item?.value === selectedBookingPopupValue)}
          />
          <div className={styles.cancelAddBtnWrap}>
            <MVButton variant={"secondary"} className="w-100" handleClick={() => handleFavouriteMuverModal(false)}>
              Not now
            </MVButton>
            <MVButton variant={"primary"} className="w-100" handleClick={() => handleConfirm()}>
              Confirm
            </MVButton>
          </div>
        </div>
      </MVModal>
    </>
  );
};
