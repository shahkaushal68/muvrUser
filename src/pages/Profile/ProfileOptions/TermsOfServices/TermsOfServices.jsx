import { Link } from "react-router-dom";
import { MVHeader, MVIcon } from "../../../../components";
import styles from "../TermsOfServices/TermsOfServices.module.css"
import { DocumentText } from "iconsax-react";

const TermsOfServices = () => {
  return (
    <>
      <MVHeader>
        <div className={"position-relative w-100"}>
          <Link to={"/help"} className={"positioned-left header-btn"}>
            {MVIcon.BackArrow}
          </Link>
          <h3 className={"text-center fw-600"}>Terms of service</h3>
        </div>
      </MVHeader>
      <section className={"h-100 content-full pb-14 pl-4 pr-4 pt-6"}>
        <div className={`${styles.cardContentHeader} mb-6`}>
          <div className={`${styles.cardIcon} mr-2`}>
            <DocumentText color="var(--accent-primary)" variant="Bold" size={20} />
          </div>
          <div className={styles.cardContentText}>
            <h4 className="fw-500 mb-1">Muvr Terms of service</h4>
            <p className="darkgray">Last Updated: <span className="dark">April 05, 2023</span></p>
          </div>
        </div>
        <div className={styles.cardContentWrapper}>
          <h4 className="fw-500 mb-3">What is Terms of service?</h4>
          <div className={`${styles.cardContent} darkgray`}>
            <p className="mb-5">These terms of service (“Terms”) govern your use of the Muvr app and any related services, websites, and products offered by Muvr (collectively referred to as “Services”). By using the Services, you agree to be bound by these Terms. If you do not agree to these Terms, you may not access or use the Services.</p>
            <p className="mb-5">Muvr is a technology platform that connects users with third-party service providers for moving, furniture delivery, and junk removal services. Muvr does not provide these services directly but facilitates the connection between users and service providers. Muvr is not responsible for any moving, furniture delivery, or junk removal services provided by third-party providers. It is your responsibility to determine the suitability and safety of a third-party provider and Muvr will not participate in disputes between users and service providers. Use of the Services is at your own risk.Subject to your compliance with these Terms, Muvr grants you a limited license to access and use the Services for personal, non-commercial use only. You may not modify, reproduce, distribute, sell, or otherwise exploit the Services. Any rights not explicitly granted are reserved by Muvr.</p>
            <p className="">By using the Services, you agree not to scrape, data mine, or use the Services in a way that hinders their operation. You also agree not to attempt to gain unauthorized access to the Services or any part of the Services. Muvr reserves the right to immediately terminate the Terms or any Services with respect to you at any time for any reason.</p>
          </div>
        </div>
      </section>
    </>
  );
}

export default TermsOfServices