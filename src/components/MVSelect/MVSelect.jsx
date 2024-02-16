import { Select } from "antd";
import clsx from "clsx";
import { ArrowDown2 } from "iconsax-react";
import styles from "./MVSelect.module.css";

export const MVSelect = ({
  id,
  label,
  className,
  menuClassName,
  defaultValue,
  options,
  prefix,
  disabled,
  labelClass,
  handleChange,
  ...rest
}) => {
  return (
    <div
      className={clsx(styles.selectWrapper, {
        "position-relative": prefix || label,
        [styles.hasPrefix]: prefix,
        [styles.hasLabel]: label,
        [styles.isDisabled]: disabled,
      })}
    >
      <div className={styles.prefix}>{prefix && prefix}</div>
      {label && (
        <label htmlFor={id} className={clsx([styles.label, labelClass])}>
          {label}
        </label>
      )}
      <Select
        id={id}
        defaultValue={defaultValue}
        options={options}
        onChange={handleChange}
        popupClassName={clsx(styles.selectMenu, {
          menuClassName: menuClassName,
        })}
        className={clsx(styles.select, {
          [className]: className,
        })}
        disabled={disabled}
        suffixIcon={<ArrowDown2 size={14} color="var(--clr-dark)" />}
        {...rest}
      />
    </div>
  );
};
