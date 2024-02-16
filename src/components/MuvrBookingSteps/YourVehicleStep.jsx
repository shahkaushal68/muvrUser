import clsx from "clsx";
import { Navigation, Pagination } from "swiper/modules";
import { InfoCircle } from "iconsax-react";
import { MVToggle, MVToggleSwitch, MVCollapse, MVCounter, MVModal, MVButton, MVLoader } from "../../components";
import styles from "./MuvrBookingSteps.module.css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useYourVehicleStepHook } from "../../hooks";
import MVStairsCounter from "../MVCounter/MVStairsCounter";
import { Image } from "antd";
import { Swiper, SwiperSlide } from "swiper/react";
import { formatNumberWithDecimal } from "../../services";

export const YourVehicleStep = ({ successResponse, current }) => {
  const {
    loading,
    bookingCreateFormData,
    allVehicle,
    fetchSelectedItem,
    handlePlusBtn,
    handleMinusBtn,
    onRealIndexChange,
    checkHelp,
    isReadyToHelp,
    handleCheckIsStairsTrue,
    isflightsOfStairsCounter,
    stairsCounter,
    handleStairsCounter,
    isFinalPriceModalOpen,
    finaPriceModalClose,
    activeSlideIndex,
    discountPrice,
    clickOnNextButton,
    totalFinalPrice,
  } = useYourVehicleStepHook(successResponse, current);

  return (
    <>
      <section className="main-wrapper content-full">
        <h2 className="fw-600">Select vehicle</h2>

        {loading ? (
          <MVLoader />
        ) : (
          allVehicle?.vehicleList?.length > 0 && (
            <Swiper
              initialSlide={activeSlideIndex}
              pagination={{
                clickable: true,
              }}
              effect={"fade"}
              loop={true}
              navigation={true}
              slidesPerView={"auto"}
              modules={[Pagination, Navigation]}
              className={clsx(styles.selectVehicleSliderWraaper, "mt-6")}
              onRealIndexChange={onRealIndexChange}
            >
              {allVehicle?.vehicleList?.length > 0 &&
                allVehicle?.vehicleList?.map((item, index) => {
                  return (
                    <SwiperSlide className="text-center" key={index}>
                      <div className={clsx(styles.selctVehicleImgWrap, "position-relative mx-auto")}>
                        <Image src={item?.image} preview={false} width={295} height={174} className="obj-contain" />
                      </div>
                      <div className={clsx(styles.vehicleContentWrap)}>
                        <h2 className="d-flex align-center justify-center fw-600 green mb-2">
                          ${formatNumberWithDecimal(Number(totalFinalPrice))}
                          <span className="line-height-0 ml-1" onClick={() => finaPriceModalClose(true)}>
                            <InfoCircle size="16" className="gray" variant="Bold" fill="currentColor" />
                          </span>
                        </h2>
                        <h4 className="fw-500 dark mb-0">{item.name}</h4>
                      </div>
                    </SwiperSlide>
                  );
                })}
            </Swiper>
          )
        )}

        <div className="rounded-detail-box">
          <div className="d-flex align-center mb-3">
            <div className="pr-1">
              <h2 className="dark fw-600 mb-1">1 Muvr (I'll Help)</h2>
              <h5 className="fw-600 mb-0 gradiant-text-color">
                Get {allVehicle?.vehicleList && allVehicle?.vehicleList[activeSlideIndex] && allVehicle?.vehicleList[activeSlideIndex]?.save_getting_percentage.split(".")[0]}% Off
              </h5>
            </div>
            <div className="ml-auto flex-0-auto">
              <MVToggle className="green-switch-color" handleChange={(event) => checkHelp(event)} defaultChecked={isReadyToHelp ? true : false} checked={isReadyToHelp} />
            </div>
          </div>
          <p className="fw-400 mb-0 darkgray">
            You can get {allVehicle?.vehicleList && allVehicle?.vehicleList[activeSlideIndex] && allVehicle?.vehicleList[activeSlideIndex]?.save_getting_percentage.split(".")[0]}%
            off on your booking but make sure you are ready to help other muvr
          </p>
        </div>

        <div className="rounded-detail-box">
          <div className="d-flex align-center mb-3">
            <div className="pr-1">
              <h2 className="dark fw-600 mb-1">Any flights of stairs?</h2>
              <p className="fw-400 mb-0 darkgray">A flight of stairs is 6 or more steps inside or outside your home</p>
            </div>
            <div className="ml-auto flex-0-auto">
              <MVToggleSwitch
                defaultValue={stairsCounter > 0 ? "yes" : "no"}
                buttonStyle="solid"
                value={isflightsOfStairsCounter ? "yes" : "no"}
                value0="yes"
                value1="no"
                name0="Yes"
                name1="No"
                className=""
                onChange={handleCheckIsStairsTrue}
              />
            </div>
          </div>
          <div className="mb-3">
            <MVStairsCounter isflightsOfStairsCounter={isflightsOfStairsCounter} stairsCounter={stairsCounter} handleStairsCounter={handleStairsCounter} />
          </div>
          <p className="fw-400 mb-0 darkgray text-center mb-2">${formatNumberWithDecimal(Number(bookingCreateFormData?.stairsPrice))}/flight of stairs</p>
          <p className="fw-400 mb-0 darkgray text-center mb-2">Enter the total flight of stairs for both the pickup and drop-off locations</p>
        </div>
        <div className={styles.addItemsCollapseWrap}>
          <MVCollapse headerTitle={"Added items"} className={styles.Collapsemy}>
            <>
              <div className={styles.addedItemsContainer}>
                {fetchSelectedItem?.map((fetchitem, index) => {
                  let finalVal = fetchitem?.price * fetchitem?.quantity || "";
                  return (
                    <div className={styles.itemWithCounterWrap} key={index}>
                      <div className={styles.addedItemContainer}>
                        <div className={styles.addedItemsbg}>
                          <div className={styles.addedItemsWrap}>
                            <img
                              src={fetchitem?.booking_id ? fetchitem?.category?.image : fetchitem?.image}
                              alt={fetchitem?.booking_id ? fetchitem?.category?.name : fetchitem?.name}
                            />
                          </div>
                        </div>
                        <div className={styles.itemTitlePriceWrap}>
                          <h4 className="green fw-600">${finalVal}</h4>
                          <div className={styles.itemTitleQuantity}>
                            <h6 className="fw-400 pr-1">{fetchitem?.name}</h6>
                            <span className="lavender mr-1">|</span>
                            <h6 className="fw-400 darkgray">
                              ${formatNumberWithDecimal(Number(fetchitem?.price))} x {fetchitem?.quantity}
                            </h6>
                          </div>
                        </div>
                      </div>
                      <MVCounter handlePlusBtn={handlePlusBtn} handleMinusBtn={handleMinusBtn} selectItem={fetchitem} />
                    </div>
                  );
                })}
              </div>
            </>
          </MVCollapse>
        </div>
      </section>

      <MVButton variant="primary" className={`w-100 align-self-end radius-none ${styles.stepsBtn}`} handleClick={clickOnNextButton}>
        Next
      </MVButton>
      <MVModal
        title="This is a modal title"
        open={isFinalPriceModalOpen}
        width={500}
        handleClose={() => finaPriceModalClose(false)}
        centered
        confirmationModal
        className={styles.priceSummaryModal}
      >
        <div>
          <h2 className="fw-600 mb-3">Final Price summary</h2>
          <div className={styles.priceSummaryContainer}>
            <div className={styles.priceWrap}>
              <div>
                <h5 className="fw-400 black">Base fare</h5>
                <h6 className="fw-400 darkgray">{allVehicle?.vehicleList && allVehicle?.vehicleList[activeSlideIndex] && allVehicle?.vehicleList[activeSlideIndex]?.name}</h6>
              </div>
              <h5 className="fw-500 pl-1">
                ${allVehicle?.vehicleList && allVehicle?.vehicleList[activeSlideIndex] && formatNumberWithDecimal(Number(allVehicle?.vehicleList[activeSlideIndex]?.base_price))}
              </h5>
            </div>
            <div className={styles.priceWrap}>
              <div>
                <h5 className="fw-400 black">Miles</h5>
                <h6 className="fw-400 darkgray">
                  ${allVehicle?.vehicleList && allVehicle?.vehicleList[activeSlideIndex] && formatNumberWithDecimal(Number(allVehicle?.vehicleList[activeSlideIndex]?.per_miles))}
                  /mi × {formatNumberWithDecimal(Number(bookingCreateFormData?.distance))} mi
                </h6>
              </div>
              <h5 className="fw-500 pl-1">
                $
                {allVehicle?.vehicleList &&
                  allVehicle?.vehicleList[activeSlideIndex] &&
                  allVehicle?.vehicleList[activeSlideIndex]?.per_miles * formatNumberWithDecimal(Number(bookingCreateFormData?.distance))}
              </h5>
            </div>
            {/* {console.log(fetchSelectedItem)} */}
            {fetchSelectedItem?.map((fetchItem, index) => {
              let finalItemVal = formatNumberWithDecimal(Number(fetchItem?.price)) * fetchItem?.quantity || 0;
              return (
                <div className={styles.priceWrap} key={index}>
                  <div>
                    <h5 className="fw-400 black">{fetchItem?.name}</h5>
                    <h6 className="fw-400 darkgray">
                      ${formatNumberWithDecimal(Number(fetchItem?.price))} × {fetchItem?.quantity}
                    </h6>
                  </div>
                  <h5 className="fw-500 pl-1">${finalItemVal}</h5>
                </div>
              );
            })}
            {isflightsOfStairsCounter && (
              <div className={styles.priceWrap}>
                <div>
                  <h5 className="fw-400 black">Flights of stairs</h5>
                  <h6 className="fw-400 darkgray">
                    ${formatNumberWithDecimal(Number(bookingCreateFormData?.stairsPrice))} × {stairsCounter}
                  </h6>
                </div>
                <h5 className="fw-500 pl-1">${formatNumberWithDecimal(Number(bookingCreateFormData?.stairsPrice)) * stairsCounter}</h5>
              </div>
            )}
            {isReadyToHelp && (
              <div className={styles.priceWrap}>
                <div>
                  <h5 className="fw-400 black">Discount</h5>
                  <h6 className="fw-400 darkgray">
                    {allVehicle?.vehicleList &&
                      allVehicle?.vehicleList[activeSlideIndex] &&
                      formatNumberWithDecimal(Number(allVehicle?.vehicleList[activeSlideIndex]?.save_getting_percentage))}
                    % off (Only 1 helper)
                  </h6>
                </div>
                <h5 className="fw-500 pl-1">-${formatNumberWithDecimal(Number(discountPrice))}</h5>
              </div>
            )}
            <div className={styles.priceWrap}>
              <div>
                <h5 className="fw-400 black">Final Amount</h5>
              </div>
              <h5 className="fw-500 green pl-1">${formatNumberWithDecimal(Number(totalFinalPrice))}</h5>
            </div>
          </div>
        </div>
      </MVModal>
    </>
  );
};
