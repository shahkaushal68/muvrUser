import clsx from "clsx";
import { Add, Minus } from "iconsax-react";
import React from "react";
import { MVButton } from "../MVButton/MVButton";
import styles from "./MVCounter.module.css";

const MVStairsCounter = ({
  isflightsOfStairsCounter,
  stairsCounter,
  handleStairsCounter,
}) => {
  return (
    <>
      <div className={styles.quantityCounter}>
        <MVButton
          disabled={isflightsOfStairsCounter && stairsCounter > 1 ? false : true}
          variant={"bordered"}
          onClick={() => handleStairsCounter()}
        >
          <Minus size="16" color="#292D32" />
        </MVButton>
        <h4 className={clsx(styles.quantityNum, "fw-500")}>{stairsCounter}</h4>
        <MVButton
          disabled={isflightsOfStairsCounter ? false : true}
          variant={"bordered"}
          onClick={() => handleStairsCounter(true)}
        >
          <Add size="16" color="#292D32" />
        </MVButton>
      </div>
    </>
  );
};
export default MVStairsCounter;
