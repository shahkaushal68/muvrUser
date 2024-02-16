import clsx from "clsx";
import styles from "./MVProgressChain.module.css";
export const MVProgressChain = ({ tracking }) => {
  const progressChainData = [
    {
      title: "Pickup request accepted",
      label: "Pickup request accepted",
    },
    {
      title: "Muvrs on the way to pickup",
      label: "24 min left - 16 miles remaining",
    },
    {
      title: "Muvrs on the way to destination",
      label: "ETA: 01:45 PM",
    },
    {
      title: "Delivered",
      label: "ETA: 01:45 PM",
    },
  ];
  return (
    <>
      <div className={clsx(styles.progressChainWrap)}>
        {progressChainData.map((item, index) => (
          // ///////////// USE ACTIVE CLASS IN THE BOTTOM DIV /////////////////// //
          <div className={clsx(styles.progressFlexWrap, "d-flex")} key={index}>
            <div className={clsx(styles.chainLeftCol, "d-flex align-center justify-center")}>
              <div className={clsx(styles.progressChainBar, "round d-flex align-center justify-center")}>
                <div className={clsx(styles.roundCircle, "round")}></div>
              </div>
            </div>
            <div className={clsx(styles.chainContentRightCol)}>
              <h4 className="fw-500 dark mb-1 word-break-all ">{item.title}</h4>
              <p className="p-sm fw-400 darkgray mb-0 word-break-all ">{item.label}</p>
            </div>
          </div>
        ))}
        {/* <div className={clsx(styles.progressFlexWrap, "d-flex")}>
          <div
            className={clsx(
              styles.chainLeftCol,
              "d-flex align-center justify-center"
            )}
          >
            <div
              className={clsx(
                styles.progressChainBar,
                "round d-flex align-center justify-center"
              )}
            >
              <div className={clsx(styles.roundCircle, "round")}></div>
            </div>
          </div>
          <div className={clsx(styles.chainContentRightCol)}>
            <h4 className="fw-500 dark mb-1">Pickup request accepted</h4>
            <p className="p-sm fw-400 darkgray mb-0">Pickup request accepted</p>
          </div>
        </div> */}
      </div>
    </>
  );
};
