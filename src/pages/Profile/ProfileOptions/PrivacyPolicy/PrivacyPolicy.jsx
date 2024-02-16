import { ShieldTick } from "iconsax-react";
import { Link } from "react-router-dom";
import { MVHeader, MVIcon, MVLoader } from "../../../../components";
import styles from "../PrivacyPolicy/PrivacyPolicy.module.css";
import { usePageContentHook } from "../../../../hooks";
import moment from "moment";

const PrivacyPolicy = () => {
  const { loading, faqPageContent, pageContent } = usePageContentHook();
  console.log(pageContent);
  return (
    <>
      <MVHeader>
        <div className={"position-relative w-100"}>
          <Link to={"/help"} className={"positioned-left header-btn"}>
            {MVIcon.BackArrow}
          </Link>
          <h3 className={"text-center fw-600"}>{faqPageContent?.display_name}</h3>
        </div>
      </MVHeader>
      {loading ? (
        <MVLoader />
      ) : (
        <section className={"h-100 overflow-scroll pb-14 pl-4 pr-4 pt-6"}>
          <div className={`${styles.cardContentHeader} mb-6`}>
            <div className={`${styles.cardIcon} mr-2`}>
              <ShieldTick color="var(--accent-primary)" variant="Bold" size={20} />
            </div>
            <div className={styles.cardContentText}>
              <h4 className="fw-500 mb-1">Muvr {faqPageContent?.display_name}</h4>
              <p className="darkgray">
                Last Updated: <span className="dark">{moment(faqPageContent?.updatedAt).format("ll")}</span>
              </p>
            </div>
          </div>

          {pageContent?.questions?.length > 0 &&
            pageContent?.questions?.map((questionItem, questionIndex) => {
              return (
                <div className={styles.cardContentWrapper}>
                  <h4 className="fw-500 mb-3">{questionItem?.question}</h4>
                  <div className={`${styles.cardContent} darkgray`}>
                    <p className="mb-2" dangerouslySetInnerHTML={{ __html: questionItem?.answer }}></p>
                  </div>
                </div>
              );
            })}
        </section>
      )}
    </>
  );
};

export default PrivacyPolicy;
