import React from "react";
import { SearchNormal1 } from "iconsax-react";
import { MVCollapse, MVTextInput, MVCounter, MVButton, MVModal, MVCheckbox, MVRadioBtn } from "../../components";
import styles from "./MuvrBookingSteps.module.css";
import { useSelectItemsStepHook } from "../../hooks";
import OpenBox from "../../assets/images/icons/open-box.svg";
import { formatNumberWithDecimal } from "../../services";

export const SelectItemsStep = ({ successResponse, current }) => {
  const {
    filterCategoryData,
    categoryList,
    handleSearchItem,
    isTypeOfBoxesModalOpen,
    boxOptions,
    handleClickOnPopularCategory,
    handleClickOnPopularClose,
    handleChangeSubcategorySelect,
    addBoxSubCategory,
    selectedItem,
    selectedCategoryList,
    handlePlusBtn,
    handleMinusBtn,
    handleClickAllCategory,
    isDontSeeModalOpen,
    handleClickAllCategoryClose,
    clickOnNextButton,
    addMultipleCategoriesCheckbox,
    addAllSelectedCheckboxCategory,
    subCategoryId,
    totalQuantity,
  } = useSelectItemsStepHook(successResponse, current);

  return (
    <>
      <section className="h-full pb-0">
        <div className="main-wrapper content-full">
          <h2 className="fw-600">Most popular items</h2>
          <div className={styles.mostPopularItemsWrapper}>
            {categoryList?.length > 0 &&
              categoryList?.map((categoryItem, index) => {
                return (
                  <div className={styles.mostPopularItemsContainer} key={index} onClick={() => handleClickOnPopularCategory(categoryItem)}>
                    <div className={styles.mostPopularItemsBg}>
                      <div className={styles.mostPopularItemsWrap}>
                        <img src={categoryItem?.image} alt={categoryItem?.name} />
                      </div>
                    </div>
                    <h6 className="fw-500 text-center">{categoryItem?.name}</h6>
                  </div>
                );
              })}
          </div>

          <MVTextInput
            label={"Don't see your item?"}
            prefix={
              <div className={styles.inputIconCircleWrap}>
                <SearchNormal1 size="14" color="var(--accent-primary)" />
              </div>
            }
            placeholder={"Start typing here..."}
            onClick={handleClickAllCategory}
          />
          <div className={styles.addItemsCollapseWrap}>
            {selectedItem?.length > 0 && (
              <MVCollapse headerTitle={"Added items"} className={styles.Collapsemy}>
                <>
                  <div className={styles.addedItemsContainer}>
                    {selectedItem?.map((selectItem, index) => {
                      let finalVal = Number(selectItem?.price) * selectItem?.quantity || "";
                      selectedItem[index].quantity_price = finalVal;
                      return (
                        <div className={styles.itemWithCounterWrap} key={index}>
                          <div className={styles.addedItemContainer}>
                            <div className={styles.addedItemsbg}>
                              <div className={styles.addedItemsWrap}>
                                <img src={selectItem?.image} alt={selectItem?.name} />
                              </div>
                            </div>
                            <div className={styles.itemTitlePriceWrap}>
                              <h4 className="green fw-600">${formatNumberWithDecimal(Number(finalVal))}</h4>
                              <div className={styles.itemTitleQuantity}>
                                <h6 className="fw-400 pr-1">{selectItem?.name}</h6>
                                <span className="lavender mr-1">|</span>
                                <h6 className="fw-400 darkgray">
                                  ${formatNumberWithDecimal(Number(selectItem?.price))} × {selectItem?.quantity}
                                </h6>
                              </div>
                            </div>
                          </div>
                          <MVCounter selectItem={selectItem} handlePlusBtn={handlePlusBtn} handleMinusBtn={handleMinusBtn} />
                        </div>
                      );
                    })}
                  </div>
                </>
              </MVCollapse>
            )}
          </div>
        </div>
        {/* <div className={styles.finalAmount}>
          <label className="h4">Final Amount</label>
          <div className="green h2 fw-600">${totalPrice || 0}</div>
        </div> */}
        <MVButton variant="primary" className={`w-100 align-self-end radius-none ${styles.stepsBtn}`} handleClick={clickOnNextButton}>
          Next ({totalQuantity})
        </MVButton>
      </section>

      {/* What type modal start  */}
      <MVModal
        title="This is a modal title"
        open={isTypeOfBoxesModalOpen}
        width={500}
        handleClose={() => handleClickOnPopularClose()}
        centered
        confirmationModal
        className={styles.typeOfBoxesModal}
      >
        <div>
          <div className={styles.openBoxBg}>
            <div className={styles.openBox}>
              <img src={OpenBox} alt="Box" />
            </div>
          </div>

          <h2 className="fw- text-center mt-3 mb-4">What type of boxes?</h2>
          <div className={styles.dontSeeListWrap}>
            <MVRadioBtn options={boxOptions} className={styles.boxTypeRadioBtn} onChange={handleChangeSubcategorySelect} value={subCategoryId} />
          </div>

          <div className={styles.cancelAddBtnWrap}>
            <MVButton variant={"secondary"} className="w-100" handleClick={() => handleClickOnPopularClose()}>
              Cancel
            </MVButton>
            <MVButton variant={"primary"} className="w-100" onClick={() => addBoxSubCategory()}>
              Add
            </MVButton>
          </div>
        </div>
      </MVModal>

      {/* What type modal start  */}
      <MVModal
        title="This is a modal title"
        open={isDontSeeModalOpen}
        width={500}
        handleClose={() => handleClickAllCategoryClose()}
        centered
        confirmationModal
        className={styles.typeOfBoxesModal}
      >
        <div>
          <MVTextInput
            label={"Don't see your item?"}
            prefix={
              <div className={styles.inputIconCircleWrap}>
                <SearchNormal1 size="14" color="var(--accent-primary)" />
              </div>
            }
            handleChange={(e) => handleSearchItem(e)}
            placeholder={"Start typing here..."}
            parentClassName="mb-2"
          />
          <div className={styles.dontSeeListWrap}>
            {filterCategoryData &&
              filterCategoryData?.map((categoryItem, categoryIndex) => {
                let checkedCategory = false;
                if (categoryItem.type === "category") {
                  checkedCategory = selectedCategoryList.some((itemData) => itemData.categoryId === categoryItem.id && itemData.type === "category");
                } else {
                  checkedCategory = selectedCategoryList.some(
                    (itemData) => itemData.categoryId === categoryItem.category_id && itemData.subcategoryId === categoryItem.id && itemData.type === "subCategory"
                  );
                }
                return (
                  <MVCheckbox
                    className={styles.dontSeeCheckbox}
                    key={categoryIndex}
                    value={categoryItem}
                    handleChange={(event) => addMultipleCategoriesCheckbox(event, false)}
                    checked={checkedCategory}
                  >
                    <h5 className="fw-500 pr-2">{categoryItem?.name}</h5>
                    <h5 className="fw-500 green">${formatNumberWithDecimal(Number(categoryItem?.price))}</h5>
                  </MVCheckbox>
                );
              })}
          </div>

          <div className={styles.cancelAddBtnWrap}>
            <MVButton variant={"secondary"} className="w-100" handleClick={() => handleClickAllCategoryClose()}>
              Cancel
            </MVButton>
            <MVButton variant={"primary"} className="w-100" onClick={addAllSelectedCheckboxCategory}>
              Add
            </MVButton>
          </div>
        </div>
      </MVModal>
      {/* Don't see modal end */}
    </>
  );
};
