import { Checkbox } from "antd";
import clsx from "clsx";
import styles from "./MVCheckbox.module.css";

export const MVCheckbox = ({ id, handleChange, disabled, className, children, ...rest }) => {
  return (
    <Checkbox id={id} className={clsx(styles.checkbox, className)} onChange={handleChange} disabled={disabled} {...rest}>
      {children}
    </Checkbox>
  );
};
