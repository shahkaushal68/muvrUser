import clsx from "clsx";
import { MVIcon } from "../MVIcon/MVIcon";
import styles from "./MVButton.module.css";

export const MVButton = ({
  id,
  type,
  name,
  size = "medium",
  link,
  variant,
  className,
  disabled,
  handleClick,
  isLoading,
  children,
  ...rest
}) => {
  return (
    <button
      id={id}
      type={type}
      name={name}
      disabled={disabled}
      onClick={handleClick}
      className={clsx(className, {
        [styles.button]: variant !== "none",
        [styles.buttonPrimary]: variant === "primary",
        [styles.buttonSecondary]: variant === "secondary",
        [styles.buttonFlush]: variant === "flush",
        [styles.buttonBordered]: variant === "bordered",
        [styles.buttonSuccess]: variant === "success",
        [styles.buttonCancel]: variant === "cancel",
        [styles.buttonMedium]: size === "medium",
        [styles.buttonLarge]: size === "large",
        [styles.none]: variant === "none",
        [styles.isLoading]: isLoading,
      })}
      {...rest}
    >
      {isLoading && <span className={styles.Loader}>{MVIcon.Loader}</span>}
      {children}
    </button>
  );
};
