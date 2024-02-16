import { Link } from "react-router-dom";
import { MVHeader, MVIcon, MVLoader } from "../../../../components";
import styles from "../Help/Help.module.css";
import { ArrowRight2 } from "iconsax-react";
import { useHelpPageListHook } from "../../../../hooks";

const Help = () => {
  const { loading, helpPageList } = useHelpPageListHook();

  return (
    <>
      <MVHeader>
        <div className={"position-relative w-100"}>
          <Link to={"/profile"} className={"positioned-left header-btn"}>
            {MVIcon.BackArrow}
          </Link>
          <h3 className={"text-center fw-600"}>Help</h3>
        </div>
      </MVHeader>
      {loading ? (
        <MVLoader />
      ) : (
        <section className={"content-full pt-6 pl-4 pr-4 pb-10 h-100"}>
          <div className={styles.cardContentWrapper}>
            {helpPageList?.length > 0 &&
              helpPageList?.map((helpElem, helpIndex) => {
                return (
                  <Link to={`/${helpElem?.slug}`} className={`${styles.cardItem} mb-4`} key={helpIndex}>
                    <div className={styles.cardItemLeft}>
                      {/* <span className={styles.cardIcon}>{helpElem.icon}</span> */}
                      <span className={styles.cardText}>
                        <p className="p-lg dark fw-500">{helpElem?.name}</p>
                      </span>
                    </div>
                    <div className={styles.cardItemRight}>
                      <button className="btn-unstyled link link-primary p fw-500 d-block">
                        <ArrowRight2 color="var(--clr-darkgray)" size={20} />
                      </button>
                    </div>
                  </Link>
                );
              })}
          </div>
        </section>
      )}
    </>
  );
};

export default Help;
