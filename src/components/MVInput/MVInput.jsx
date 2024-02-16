import { Input } from "antd";
import clsx from "clsx";
import { Eye, EyeSlash } from "iconsax-react";
import styles from "./MVInput.module.css";
const { Password } = Input;

export const MVTextInput = ({
  parentClassName,
  label,
  className,
  labelClass,
  prefix,
  placeholder,
  value,
  name,
  type,
  id,
  handleChange,
  disabled,
  isDecimal,
  errorMessage,
  ...rest
}) => {
  return (
    <div
      className={clsx(parentClassName, {
        "position-relative": label,
      })}
    >
      <Input
        id={id}
        name={name}
        className={clsx(className, styles.input, {
          [styles.hasLabel]: label,
          [styles.hasPrefix]: prefix,
          [styles.isDisabled]: disabled,
        })}
        value={value}
        placeholder={placeholder}
        size="large"
        type={type}
        prefix={prefix}
        disabled={disabled}
        onChange={handleChange}
        onKeyDown={(event) => {
          if (type === "number") {
            if (event.key === "ArrowUp" || event.key === "ArrowDown" || event.key === "e" || event.key === "E" || event.key === "+" || event.key === "-") {
              event.preventDefault();
              return false;
            } else if (event?.key === ".") {
              if (!isDecimal) {
                event.preventDefault();
                return false;
              }
              const { value } = event?.target;
              if (value.length === 0) {
                event.preventDefault();
                return false;
              }
            }
          }
        }}
        {...rest}
      />
      {label && (
        <label htmlFor={id} className={clsx(labelClass, styles.label)}>
          {label}
        </label>
      )}
      {errorMessage && <span className="error-message">{errorMessage}</span>}
    </div>
  );
};

export const MVPasswordInput = ({ parentClassName, label, className, labelClass, prefix, placeholder, value, name, id, disabled, errorMessage, ...rest }) => {
  return (
    <div
      className={clsx(parentClassName, {
        "position-relative": label,
      })}
    >
      <Password
        id={id}
        name={name}
        className={clsx(className, styles.input, {
          [styles.hasLabel]: label,
          [styles.hasPrefix]: prefix,
          [styles.isDisabled]: disabled,
        })}
        value={value}
        placeholder={placeholder}
        size="large"
        prefix={prefix}
        disabled={disabled}
        iconRender={(visible) => {
          if (visible) {
            return <Eye size="20" color="#847b8b" variant="Bold" />;
          } else {
            return <EyeSlash size="20" color="#847b8b" variant="Bold" />;
          }
        }}
        {...rest}
      />
      {label && (
        <label htmlFor={id} className={clsx(labelClass, styles.label)}>
          {label}
        </label>
      )}
      {errorMessage && <span className="error-message">{errorMessage}</span>}
    </div>
  );
};

export const MVTextArea = ({ parentClassName, label, className, labelClass, placeholder, value, name, type, id, handleChange, disabled, errorMessage, ...rest }) => {
  const { TextArea } = Input;

  return (
    <div
      className={clsx(parentClassName, {
        "position-relative": label,
      })}
    >
      <TextArea
        id={id}
        name={name}
        className={clsx(className, styles.input, {
          [styles.hasLabel]: label,
          [styles.isDisabled]: disabled,
        })}
        value={value}
        placeholder={placeholder}
        type={type}
        disabled={disabled}
        onChange={handleChange}
        {...rest}
      />
      {label && (
        <label htmlFor={id} className={clsx(labelClass, styles.label)}>
          {label}
        </label>
      )}
      {errorMessage && <span className="error-message">{errorMessage}</span>}
    </div>
  );
};
