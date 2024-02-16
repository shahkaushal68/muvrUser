import { Avatar } from "antd";
import styles from "./MVAvatar.module.css";
import clsx from "clsx";

export const MVAvatar = ({ className, shape, src, size, icon, alt, text, ...rest }) => {
  return (
    <Avatar shape={shape} className={clsx(styles.MVIcon, className)} src={src} size={size} alt={alt} icon={icon} {...rest}>
      {text && text}
    </Avatar>
  );
};
