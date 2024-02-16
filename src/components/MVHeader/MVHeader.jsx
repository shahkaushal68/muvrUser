import styles from "./MVHeader.module.css";

export const MVHeader = ({ children }) => {
  return <header className={styles.header}>{children}</header>;
};
