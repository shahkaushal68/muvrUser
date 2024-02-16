import { Modal } from "antd";
import clsx from "clsx";
import styles from "./MVModal.module.css";

export const MVModal = ({
  title,
  footer = <></>,
  open,
  handleClose,
  width,
  centered,
  className,
  closeOnOutsideClick,
  bodyClassName,
  confirmationModal,
  children,
  ...rest
}) => {
  return (
    <Modal
      open={open}
      onCancel={handleClose}
      className={clsx(styles.modal, className)}
      footer={footer}
      centered={centered}
      width={width}
      maskClosable={closeOnOutsideClick}
      maskStyle={{
        background: "linear-gradient(0deg, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7))",
      }}
      {...rest}
    >
      {!confirmationModal && <div className={styles.header}>{title}</div>}
      <div className={clsx(bodyClassName, styles.modalBody)}>{children}</div>
    </Modal>
  );
};
