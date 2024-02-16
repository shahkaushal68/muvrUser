import { Radio } from "antd";
import clsx from "clsx";
import React from "react";
import styles from "./MVRadioBtn.module.css";

export const MVRadioBtn = ({ options, className, checked, ...rest }) => {
  return (
    <>
      <Radio.Group options={options} className={clsx(styles.MVRadio, className)} checked={checked} {...rest}></Radio.Group>
    </>
  );
};
export default MVRadioBtn;
