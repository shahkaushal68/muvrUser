import { ArrowRight2, Sms, Trash } from "iconsax-react";
import { Link } from "react-router-dom";
import { MVButton, MVHeader, MVIcon, MVLoader, MVModal } from "../../../../components";
import styles from "../Setting/Setting.module.css";
import { useDeleteProfileAccountHook } from "../../../../hooks";

const Setting = () => {
  const { loading, isDisabled, userDetails, profileDeleteViewModal, handleDeleteViewModal, handleDeleteCloseModal, handleDeleteAccountSubmit } = useDeleteProfileAccountHook();

  return (
    <>
      <MVHeader>
        <div className={"position-relative w-100"}>
          <Link to={"/profile"} className={"positioned-left header-btn"}>
            {MVIcon.BackArrow}
          </Link>
          <h3 className={"text-center fw-600"}>Settings</h3>
        </div>
      </MVHeader>

      {loading ? (
        <MVLoader />
      ) : (
        <section className={"content-full pt-6 pl-4 pr-4 pb-10 h-100"}>
          <div className={styles.cardContentWrapper}>
            <div className={`${styles.cardItem} mb-4`}>
              <div className={styles.cardItemLeft}>
                <span className={styles.cardIcon}>{MVIcon.callIcon}</span>
                <span className={(styles.cardText, "pr-1")}>
                  <h6 className="fw-500 gray mb-1 word-break-word">Phone number</h6>
                  <p className="p-lg dark fw-500 word-break-word">{userDetails?.phone_number ? `${userDetails?.phone_code} ${userDetails?.phone_number}` : ""}</p>
                </span>
              </div>

              <div className={styles.cardItemRight}>
                <Link to={"/change-phone-no"} state={{ changeType: "phone" }} className="link link-primary p fw-500 d-block">
                  change
                </Link>
              </div>
            </div>
            <div className={`${styles.cardItem} mb-4`}>
              <div className={styles.cardItemLeft}>
                <span className={styles.cardIcon}>
                  <Sms color="var(--accent-primary)" variant="Bold" size={24} />
                </span>
                <span className={(styles.cardText, "pr-1")}>
                  <h6 className="fw-500 gray mb-1 word-break-word">Email</h6>
                  <p className="p-lg dark fw-500 word-break-word">{userDetails?.email ? userDetails?.email : ""}</p>
                </span>
              </div>

              <div className={styles.cardItemRight}>
                <Link to={"/verify-email"} state={{ changeType: "email" }} className="link link-primary p fw-500 d-block">
                  verify
                </Link>
              </div>
            </div>
            <div className={`${styles.cardItem} mb-4`}>
              <div className={styles.cardItemLeft}>
                <span className={styles.cardIcon}>
                  <Sms color="var(--accent-primary)" variant="Bold" size={24} />
                </span>
                <span className={(styles.cardText, "pr-1")}>
                  <p className="p-lg dark fw-500 word-break-word">Delete account</p>
                </span>
              </div>

              <div className={styles.cardItemRight}>
                <button className="btn-unstyled link link-primary p fw-500 d-block" onClick={() => handleDeleteViewModal()}>
                  <ArrowRight2 color="var(--clr-darkgray)" size={20} />
                </button>
              </div>
            </div>
          </div>

          <MVModal
            title="Delete Account Modal"
            open={profileDeleteViewModal}
            width={343}
            handleClose={() => handleDeleteCloseModal()}
            centered
            className={styles.deleteAccountModal}
            bodyClassName={styles.deleteAccountBody}
            confirmationModal={true}
            closable={false}
          >
            <div className="text-center">
              <div className={styles.deleteCardContentWrap}>
                <div className={styles.deleteCardIcon}>
                  <Trash color="var(--clr-red)" variant="Bold" size={32} />
                </div>
                <div className={styles.deleteCardText}>
                  <h2 className={"mb-4 fw-500"}>Delete your account</h2>
                  <p>When you delete your account, your Muvr profile will be immediately deactivated and permanently deleted after 30 days.</p>
                </div>
                <div className={`${styles.deleteCardBtn} w-100`}>
                  <MVButton variant={"secondary"} handleClick={() => handleDeleteCloseModal()} disabled={isDisabled}>
                    Cancel
                  </MVButton>
                  <MVButton variant={"primary"} handleClick={() => handleDeleteAccountSubmit()} disabled={isDisabled}>
                    Delete
                  </MVButton>
                </div>
              </div>
            </div>
          </MVModal>
        </section>
      )}
    </>
  );
};

export default Setting;
