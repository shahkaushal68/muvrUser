import { Radio } from "antd";
import styles from "./MVToggleSwitch.module.css";
import clsx from "clsx";
export const MVToggleSwitch = (props) => {
  return (



    <>
      <Radio.Group
        defaultValue={props.defaultValue}
        buttonStyle={props.buttonStyle}
        className={clsx(styles.customToggleSwitch, props.toggleClass)}
        onChange={props.onChange}
        value={props.value}
      >
        <Radio.Button value={props.value0}>{props.name0}</Radio.Button>
        <Radio.Button value={props.value1}>{props.name1}</Radio.Button>
      </Radio.Group>
    </>
  );
};
