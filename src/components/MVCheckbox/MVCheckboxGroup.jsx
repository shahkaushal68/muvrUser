import { Checkbox } from "antd";
import clsx from "clsx";
import styles from "./MVCheckbox.module.css";
const CheckboxGroup = Checkbox.Group;

export const MVCheckboxGroup = ({ id, handleChange, checkedList, disabled, className, children, ...rest }) => {
    return (
        <CheckboxGroup id={id} className={clsx(styles.checkbox, className)} value={checkedList}
            onChange={handleChange} disabled={disabled} {...rest}>
            {children}
        </CheckboxGroup>
    );
};
