import clsx from "clsx";
import { Add, Minus } from "iconsax-react";
import React from "react";
import { MVButton } from "../MVButton/MVButton";
import styles from "./MVCounter.module.css";


export const MVCounter = ({ handlePlusBtn, handleMinusBtn, selectItem }) => {
  //console.log("selectedItem", selectItem);

  return (
    <>
      <div className={styles.quantityCounter}>
        <MVButton variant={"bordered"} onClick={() => handleMinusBtn(selectItem)}>
          <Minus size="16" color="#292D32" />
        </MVButton>
        <h4 className={clsx(styles.quantityNum, "fw-500")}>{selectItem?.quantity}</h4>
        <MVButton variant={"bordered"} onClick={() => handlePlusBtn(selectItem)}>
          <Add size="16" color="#292D32" />
        </MVButton>
      </div>
    </>
  );
};
export default MVCounter;
