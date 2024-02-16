import { Link } from "react-router-dom";
import { MVHeader, MVIcon } from "../../../../components";
import styles from "../Promotions/Promotions.module.css"
import { ArrowRight2, Copy } from "iconsax-react";
import { promotionsData } from "../../../../constants/data";

const Promotions = () => {
  return (
    <>
      <MVHeader>
        <div className={"position-relative w-100"}>
          <Link to={"/profile"} className={"positioned-left header-btn"}>
            {MVIcon.BackArrow}
          </Link>
          <h3 className={"text-center fw-600"}>Promotions</h3>
        </div>
      </MVHeader>
      <section className={"content-full pt-6 pl-4 pr-4 pb-10 h-100"}>
        <div className={styles.cardContentWrap}>
          {promotionsData.map((promoElem, promoIndex) => {
            return (
              <div className={`${styles.cardContentItem} mb-3`} key={promoIndex}>
                <div className="d-flex align-center justify-space-between mb-3">
                  <div className={styles.cardIcon}>{MVIcon.promotion}</div>
                  <div className={styles.cardLink}>
                    <Link to="/" className="accent-primary link p align-center d-flex">
                      Book Now
                      <ArrowRight2 size={16} color="var(--accent-primary)" className="d-flex ml-1" />
                    </Link>
                  </div>
                </div>
                <div className="mb-4">
                  <p className="p-lg green text-uppercase fw-500">{promoElem.promotionSaleLink}</p>
                  <p className="darkgray p-sm">
                    {promoElem.promotionContentText}
                  </p>
                </div>
                <div className="d-flex align-center">
                  <span className="mr-3">
                    <span className="darkgray p-sm">Exp : </span>
                    <span className="dark p-sm">{promoElem.promotionDate}</span>
                  </span>
                  <span className="d-flex align-center">
                    <span className="darkgray p-sm">Code : </span>
                    <span className="dark p-sm">{promoElem.promotionCode}</span>
                    <span className="ml-1 d-flex">
                      <Copy size={14} color="var(--accent-primary)" variant="Bold" />
                    </span>
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}

export default Promotions