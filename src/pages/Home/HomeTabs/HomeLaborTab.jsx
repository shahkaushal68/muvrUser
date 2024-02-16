import React from "react";
import { MVButton, MVCounter, MVSelect } from "../../../components";
import { Location, ArrowRight } from "iconsax-react";
import { arrivalLocatiomtOptions } from "../../../constants/data";
import heavyLifting from "../../../assets/images/covers/heavy-lifting.jpg";
import assembly from "../../../assets/images/covers/assembly.jpg";
import loadUnload from "../../../assets/images/covers/load-unload.jpg";
import { Link, useNavigate } from "react-router-dom";
import styles from "../Home.module.css";

const HomeLaborTab = ({ serviceId }) => {
  const navigate = useNavigate();
  console.log("serviceId------------------>", serviceId);

  return (
    <>
      <section>
        <div className="main-wrapper">
          <MVSelect
            id={"mv-select"}
            defaultValue={"New York, NY, USA"}
            label="Service Type Service Type"
            prefix={
              <Location
                size="16"
                color="var(--accent-primary)"
                variant="Bold"
              />
            }
            options={arrivalLocatiomtOptions}
          />
          <div className={styles.counterCardContainer}>
            <div className={styles.counterCardWrap}>
              <h4 className="fw-600 mb-1">No. of Muvrs</h4>
              <h6 className="darkgray fw-400 mb-4">
                <span className="black">$70</span>/hour for 1 Muvr
              </h6>
              <MVCounter />
            </div>
            <div className={styles.counterCardWrap}>
              <h4 className="fw-600 mb-4">No. of hours required for job</h4>
              <MVCounter />
            </div>
          </div>
          <MVButton
            variant={"primary"}
            className="w-100"
            handleClick={() => navigate("/booking-steps")}
          >
            Continue
          </MVButton>
        </div>
        <div className={styles.separator}></div>
        <div className="main-wrapper">
          <h2 className="fw-600 mb-3">No truck, just muscle</h2>
          <div className={styles.learnMoreCard}>
            <img src={heavyLifting} alt="Heavy lifting" />

            <div className="ml-2">
              <h3 className="lh-1 fw-500 mb-1">Heavy lifting</h3>
              <p className="fw-400 darkgray mb-3 p-sm">
                Help with moving as much or as little as you’d like
              </p>
              <Link className="link link-primary fw-500 d-flex align-center">
                Learn More{" "}
                <ArrowRight
                  className="ml-1"
                  size="16"
                  color="var(--accent-primary)"
                />
              </Link>
            </div>
          </div>
          <div className={styles.learnMoreCard}>
            <img src={assembly} alt="Assembly & Disassembly" />

            <div className="ml-2">
              <h3 className="lh-1 fw-500 mb-1">Assembly & Disassembly</h3>
              <p className="fw-400 darkgray mb-3 p-sm">
                Help with putting together or taking your furniture apart
              </p>
              <Link className="link link-primary fw-500 d-flex align-center">
                Learn More{" "}
                <ArrowRight
                  className="ml-1"
                  size="16"
                  color="var(--accent-primary)"
                />
              </Link>
            </div>
          </div>
          <div className={styles.learnMoreCard}>
            <img src={loadUnload} alt="Load & Unload" />

            <div className="ml-2">
              <h3 className="lh-1 fw-500 mb-1">Load & Unload</h3>
              <p className="fw-400 darkgray mb-3 p-sm">
                Help with loading or unloading your belongings
              </p>
              <Link className="link link-primary fw-500 d-flex align-center">
                Learn More{" "}
                <ArrowRight
                  className="ml-1"
                  size="16"
                  color="var(--accent-primary)"
                />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default HomeLaborTab;
