import { Link } from "react-router-dom";
import { MVCollapse, MVHeader, MVIcon, MVTextInput, MVLoader } from "../../../../components";
import { SearchNormal1 } from "iconsax-react";
import styles from "../FAQs/FAQs.module.css";
import { useFaqPageContentHook } from "../../../../hooks";

const FAQs = () => {
  const { loading, faqPageContent, filterData, searchQuery, handleFaqSearch } = useFaqPageContentHook();

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
        <section className={"content-full pt-6 pl-4 pr-4 pb-10 h-100"}>
          <div className="mb-6">
            <p className="darkgray mb-6">We’re here to help you with anything and everything on Muvr</p>
            <MVTextInput
              name="search"
              value={searchQuery}
              handleChange={(event) => handleFaqSearch(event)}
              prefix={<SearchNormal1 color="var(--accent-primary)" size={24} />}
              placeholder={"Search Help"}
            />
          </div>
          <div className={styles.faqCardContent}>
            {filterData?.length > 0 &&
              filterData?.map((faqContentElem, index) => {
                return (
                  <div className={styles.faqCardItem} key={`faqContent${index}`}>
                    {faqContentElem.type ? <h2 className="fw-600 mb-4 dark">{faqContentElem.type}</h2> : ""}
                    {faqContentElem?.questions?.length > 0 &&
                      faqContentElem?.questions?.map((questionItem, questionIndex) => {
                        return (
                          <MVCollapse
                            className={`${styles.faqCollapse} mb-4`}
                            headerTitle={<h4 className="fw-500 dak">{questionItem?.question}</h4>}
                            defaultActiveKey={questionIndex === 1 && 1}
                            key={`question${index}${questionIndex}`}
                          >
                            <p className="darkgray fw-400" dangerouslySetInnerHTML={{ __html: questionItem?.answer }}></p>
                          </MVCollapse>
                        );
                      })}
                  </div>
                );
              })}
          </div>
        </section>
      )}
    </>
  );
};

export default FAQs;
