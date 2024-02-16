import React from "react";
import MVRadioBtn from "../MVRadioBtn/MVRadioBtn";
import MovesHalfTruck from "../../assets/images/icons/moves-half-truck.svg";
import junkRemovalMachine from "../../assets/images/icons/junk-removal-machine.svg";
import Labor from "../../assets/images/icons/labor.svg";
import styles from "./MuvrBookingSteps.module.css";
import clsx from "clsx";
import { MVButton } from "../MVButton/MVButton";

export const SelectServiceStep = ({ current, setCurrent }) => {
  const options = [
    {
      label: (
        <>
          <div className={styles.selectServiceOption}>
            <div className={styles.serviceText}>
              <h1 className="fw-700 dark mb-1">Moves</h1>
              <h6 className="fw-400 darkgray">
                Reliable and efficient moving, store delivery, marketplace delivery, donations and more services for
                residential and commercial.
              </h6>
            </div>
            <div className={styles.serviceImg}>
              <img src={MovesHalfTruck} alt="Moves" />
            </div>
          </div>
        </>
      ),
      value: "Moves",
    },
    {
      label: (
        <>
          <div className={styles.selectServiceOption}>
            <div className={styles.serviceText}>
              <h1 className="fw-700 dark mb-1">Junk removal</h1>
              <h6 className="fw-400 darkgray">
                Remove, dispose and donate unwanted furniture, debris or clutter from homes, offices or other locations.
              </h6>
            </div>
            <div className={clsx(styles.serviceImg, styles.serviceImgSpace)}>
              <img src={junkRemovalMachine} alt="Junk Removal" />
            </div>
          </div>
        </>
      ),
      value: "Junk removal",
    },
    {
      label: (
        <>
          <div className={styles.selectServiceOption}>
            <div className={styles.serviceText}>
              <h1 className="fw-700 dark mb-1">Labor</h1>
              <h6 className="fw-400 darkgray">
                Residential and commercial labor service for a wide range of tasks such as heavy lifting,
                assembling/disassembling, loading & unloading.
              </h6>
            </div>
            <div className={clsx(styles.serviceImg, styles.serviceImgSpace)}>
              <img src={Labor} alt="Labor" />
            </div>
          </div>
        </>
      ),
      value: "Labor",
    },
  ];
  return (
    <>
      <div className="content-full">
        <section className="main-wrapper">
          <MVRadioBtn
            options={options}
            optionType="button"
            defaultValue={"Moves"}
            className={styles.selectServiceRadio}
          />
        </section>
      </div>
      <MVButton variant="primary" className={`w-100 align-self-end radius-none ${styles.stepsBtn}`} handleClick={() => setCurrent(current + 1)}>
        Next
      </MVButton>
    </>
  );
};
