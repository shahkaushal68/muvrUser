import { Switch } from "antd";
import styles from "./MVToggle.module.css";

export const MVToggle = ({ id, handleChange, disabled, ...rest }) => {
  return (
    <Switch id={id} defaultChecked className={styles.switch} onChange={handleChange} size="default" disabled={disabled} autoFocus={true}  {...rest} />
  );
};
