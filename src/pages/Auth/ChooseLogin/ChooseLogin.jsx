import React from "react";
import MuvrLogo from "../../../assets/images/logo/login-header-logo.png";
import menWithMuvrTshirt from "../../../assets/images/backgrounds/person-with-muvr-tshirt.png";
import { MVButton } from "../../../components/MVButton/MVButton";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import styles from "../Auth.module.css";
import clsx from "clsx";

export const ChooseLogin = () => {
  const navigate = useNavigate();
  const redirectPage = (type) => {
    navigate(`/authentication/${type}`);
  };
  return (
    <>
      <section>
        <div className={styles.logoCaptionWrap}>
          <div className={styles.MuvrLogoWrap}>
            <img src={MuvrLogo} alt="Muvr" />
          </div>
          <h2 className="fw-500 text-center">Move with ease</h2>
        </div>
        <div className={styles.muvrBgWrap}>
          <img
            src={menWithMuvrTshirt}
            alt="men with muvr Tshirt"
            className={styles.muvrBgImg}
          />
        </div>
        <div className={clsx(styles.loginRegisterBtnWrap, "main-wrapper")}>
          <MVButton
            variant={"primary"}
            className="w-100 mb-3"
            onClick={() => redirectPage("login")}
          >
            Log In
          </MVButton>
          <MVButton
            variant={"secondary"}
            className="w-100 mb-4"
            onClick={() => redirectPage("register")}
          >
            Register
          </MVButton>

          <div>
            <h4 className="fw-500 darkgray text-center">
              Ready to earn?{" "}
              <span>
                <Link className="link link-primary fw-600">Click here</Link>
              </span>
            </h4>
          </div>
        </div>
      </section>
    </>
  );
};
export default ChooseLogin;
