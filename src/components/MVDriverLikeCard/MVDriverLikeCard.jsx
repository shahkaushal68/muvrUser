import clsx from "clsx";
import { Image } from "antd";
import styles from "./MVDriverLikeCard.module.css";

export const MVDriverLikeCard = ({ title, name, icon, actions, userImage, isLike, status }) => {
  return (
    <>
      <div className={styles.mvDriverLikeCardWrapper}>
        {/* <Link to="/booking-details" className={clsx(styles.userCard, "w-100 d-block")}> */}
        <div className={clsx(styles.userCardBodyHead, "d-flex align-center w-100")}>
          <div className={clsx(styles.userAvatarImg, "flex-0-auto")}>
            {userImage.map((user, index) => {
              return <Image src={user} key={index} alt="" className="w-100 h-100 round" preview={false} />;
            })}
          </div>
          <div className={clsx(styles.userName, "d-flex align-center pl-2 w-100")}>
            <div className="pr-2">
              <h5 className="fw-500 dark mb-0">{title}</h5>
              <span className="fw-400 darkgray mb-0 p-sm text-capitalize">{name}</span>
            </div>
            {!status && (
              <div className={clsx(styles.likeBox, "d-flex align-center justify-center round transition-03s cursor-pointer ml-auto", isLike ? styles.redText : "gray")}>{icon}</div>
            )}
          </div>
        </div>
        {/* </Link> */}
        <div className={clsx(styles.userCardBodyFooter, "d-flex flex-column w-100")}>{actions}</div>
      </div>
    </>
  );
};
