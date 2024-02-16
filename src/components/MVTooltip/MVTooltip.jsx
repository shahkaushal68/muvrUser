import { Tooltip } from "antd";
import clsx from "clsx";
import styles from "./MVTooltip.module.css";

export const MVTooltip = ({ className, content, placement, children, ...rest }) => {
  return (
    <Tooltip
      title={content}
      placement={placement}
      className={clsx(styles.tooltip, className, {
        className: className,
      })}
      {...rest}
    >
      {children}
    </Tooltip>
  );
};
