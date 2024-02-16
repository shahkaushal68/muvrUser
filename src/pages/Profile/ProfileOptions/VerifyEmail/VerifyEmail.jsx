import { Link } from "react-router-dom";
import { MVButton, MVHeader, MVIcon, MVTextInput } from "../../../../components";
import styles from "../verifyEmail/VerifyEmail.module.css"
import { Sms } from "iconsax-react";

const VerifyEmail = () => {
  return (
    <>
      <MVHeader>
        <div className={"position-relative w-100"}>
          <Link to={"/profile"} className={"positioned-left header-btn"}>
            {MVIcon.BackArrow}
          </Link>
          <h3 className={"text-center fw-600"}>Verify</h3>
        </div>
      </MVHeader>
      <section className={"content-full pl-4 pr-4 pt-6 pb-10 h-100 d-flex flex-column justify-space-between"}>
        <div className={styles.cardContent}>
          <MVTextInput
            label={"Email address"}
            prefix={<Sms color="var(--accent-primary)" variant="Bold" size={24} />}
            placeholder={"davidjohnson123@gmail.com"}
            rootClassName={"mb-2"}
          />
          <p className="p darkgray pb-4">A verification code will be sent to this email</p>
        </div>
        <div className={"card-btn w-100"}>
          <MVButton variant={"primary"} size="medium" className={"w-100"}>
            Verify
          </MVButton>
        </div>
      </section>
    </>
  );
}

export default VerifyEmail