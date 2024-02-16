import { Divider } from "antd";
import { Link } from "react-router-dom";
import { MVHeader, MVIcon, MVLoader } from "../../../../components";
import { Add, Trash } from "iconsax-react";
import MasterCard from "../../../../assets/images/icons/mastercard.png";
import Visa from "../../../../assets/images/icons/visa.png";
import styles from "./Wallet.module.css";
import { otherPaymentMethods } from "../../../../constants/data";
import React from "react";
import { useWalletCardDetailsHook } from "../../../../hooks";
import { formatCardNumber } from "../../../../services";

const Wallet = () => {
  const { loading, walletCardList, handleEditCardDetails, handleDeleteCardDetails } = useWalletCardDetailsHook();

  return (
    <>
      <MVHeader>
        <div className={"position-relative w-100"}>
          <Link to={"/profile"} className={"positioned-left header-btn"}>
            {MVIcon.BackArrow}
          </Link>
          <h3 className={"text-center fw-600"}>Wallet</h3>
        </div>
      </MVHeader>
      {loading ? (
        <MVLoader />
      ) : (
        <section className={"content-full pt-6 pl-4 pr-4 pb-10"}>
          <div className={`${styles.walletCardWrap} mb-6`}>
            <div className={"d-flex align-center justify-space-between mb-3"}>
              <h2 className="fw-600">Default card</h2>
              <Link to="/add-card" className="link link-primary d-flex align-center">
                <Add size="16" color="currentcolor" />
                <h6 className="fw-500">Add Card</h6>
              </Link>
            </div>
            {walletCardList?.cardDetail?.length > 0 &&
              walletCardList?.cardDetail?.map((walletCardElem, walletCardIndex) => {
                return (
                  walletCardElem?.is_default && (
                    <div className={styles.payCardWrap} key={walletCardIndex}>
                      <div className="d-flex align-center">
                        {/* <img src={MasterCard} alt="Master Card" /> */}
                        <div className="ml-2">
                          <h4 className="fw-500 mb-1">{walletCardElem?.card_holder_name}</h4>
                          <div className="d-flex align-center">
                            <h6 className="fw-400 mr-4">{formatCardNumber(walletCardElem?.card_number)}</h6>
                            <h6 className="fw-400">
                              {walletCardElem.expiry_month}/{walletCardElem?.expiry_year % 100}
                            </h6>
                          </div>
                        </div>
                      </div>
                      <button className="btn-unstyled link link-gray" onClick={() => handleDeleteCardDetails(walletCardElem?.id)}>
                        <Trash color="currentcolor" variant="Bold" />
                      </button>
                    </div>
                  )
                );
              })}
          </div>
          <div className={`${styles.walletCardWrap} mb-6`}>
            <div className="d-flex align-center justify-space-between mb-3">
              <h2 className="fw-600">Other card</h2>
            </div>
            {walletCardList?.cardDetail?.length > 0 &&
              walletCardList?.cardDetail?.map((walletCardElem, walletCardIndex) => {
                return (
                  !walletCardElem?.is_default && (
                    <div className={styles.walletCardWrapInner} key={walletCardIndex}>
                      <div className={styles.payCardWrap}>
                        <div className="d-flex align-center">
                          {/* <img src={Visa} alt="Visa" /> */}
                          <div className="ml-2">
                            <h4 className="fw-500 mb-1">{walletCardElem?.card_holder_name}</h4>
                            <div className="d-flex align-center">
                              <h6 className="fw-400 mr-4">{formatCardNumber(walletCardElem?.card_number)}</h6>
                              <h6 className="fw-400">
                                {walletCardElem?.expiry_month}/{walletCardElem?.expiry_year % 100}
                              </h6>
                            </div>
                          </div>
                        </div>
                        <button className="btn-unstyled link link-gray" onClick={() => handleDeleteCardDetails(walletCardElem?.id)}>
                          <Trash color="currentcolor" variant="Bold" />
                        </button>
                      </div>
                      {!walletCardElem?.is_default && (
                        <button className="btn-unstyled link link-primary mt-3 p-sm fw-500 d-block" onClick={() => handleEditCardDetails(walletCardElem?.id)}>
                          Make this default
                        </button>
                      )}
                      <Divider />
                    </div>
                  )
                );
              })}
          </div>
          <div className={`${styles.walletCardWrap} ${styles.walletPaymentCardWrap} mb-6`}>
            <div className="d-flex align-center justify-space-between mb-3">
              <h2 className="fw-600">Other payment methods</h2>
            </div>
            {otherPaymentMethods.map((paymentElem, paymentIndex) => {
              return (
                <React.Fragment key={paymentIndex}>
                  <div className={styles.payCardWrap}>
                    <div className="d-flex align-center">
                      <div className={styles.paymentIcon}>{paymentElem.icon}</div>
                      <div className="ml-2">
                        <h4 className="fw-500 mb-1">{paymentElem.title}</h4>
                      </div>
                    </div>
                    <div>
                      {paymentElem.paymentLink === "true" ? (
                        <button className="btn-unstyled link link-primary p-sm fw-500 d-block">Link your account</button>
                      ) : (
                        <button className="btn-unstyled link link-gray">
                          <Trash color="currentcolor" variant="Bold" />
                        </button>
                      )}
                    </div>
                  </div>
                  <Divider />
                </React.Fragment>
              );
            })}
          </div>
        </section>
      )}
    </>
  );
};

export default Wallet;
