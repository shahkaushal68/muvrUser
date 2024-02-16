import React from "react";
import MuvrLogo from "../../../assets/images/logo/login-header-logo.png";
import menWithMuvrTshirt from "../../../assets/images/backgrounds/person-with-muvr-tshirt.png";
import { MVButton } from "../../../components/MVButton/MVButton";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";
import styles from "../Auth.module.css";

export const SplashUser = () => {
  const navigate = useNavigate();
  const registerNavigate = useNavigate();
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
          <h2 className="fw-500 text-center mb-3">Get anything moved</h2>
          <MVButton
            variant={"primary"}
            className="w-100 mb-3"
            onClick={() => {
              navigate("/choose-auth");
            }}
          >
            Get started
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
export default SplashUser;
