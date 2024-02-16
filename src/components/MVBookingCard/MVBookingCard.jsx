import clsx from "clsx";
import { Image } from "antd";
import { Link } from "react-router-dom";
import styles from "./MVBookingCard.module.css";
import { MVAvatar } from "../MVAvatar/MVAvatar";
import { User } from "iconsax-react";
export const MVBookingCard = ({ id, title, activeDateType, name, price, actions, userImage, requestText, isRequestAccepted, isRequestTrue, isRemoveProfilePic }) => {
  return (
    <>
      <div className={clsx(styles.userCard, "w-100 d-block")}>
        <Link
          to={activeDateType === "draft" ? `/booking-steps?bookingId=${id}` : `/booking-details/${id}?dateType=${activeDateType}`}
          className={clsx(styles.userCardBodyHead, "d-flex align-center w-100")}
        >
          {isRemoveProfilePic ? (
            <></>
          ) : (
            <>
              <div className={clsx(styles.userAvatarImg, "flex-0-auto")}>
                {userImage?.length > 0 ? (
                  userImage?.map((user, index) => {
                    return <Image src={user} key={index} alt="" className="w-100 h-100 round" preview={false} />;
                  })
                ) : (
                  <MVAvatar size={38} icon={<User className="darkgray" fill="currentColor" size={20} variant="Bold" />} className="bg-lavender" />
                )}
              </div>
            </>
          )}
          <div className={clsx(styles.userName, "d-flex align-center pl-2 w-100")}>
            <div className="pr-2">
              <h5 className="fw-500 dark mb-0">{title}</h5>
              <span className="fw-400 darkgray mb-0 p-sm">{name}</span>
            </div>

            <div className="ml-auto">
              {isRequestTrue && activeDateType !== "draft" ? (
                <>
                  <h5 className="green fw-500 mb-0 text-right">{price}</h5>
                  <span
                    className={`text-right p-sm fw-400 ${isRequestAccepted && `green`} ${isRequestTrue === "CANCEL_BOOKING" && "red"} ${isRequestTrue === "PENDING" && "orange"}`}
                  >
                    {requestText}
                  </span>
                </>
              ) : (
                <>
                  <h5 className="green fw-500 mb-0 text-right">{price}</h5>
                </>
              )}
            </div>
          </div>
        </Link>
        <div className={clsx(styles.userCardBodyFooter, "d-flex flex-column w-100")}>{actions}</div>
      </div>
    </>
  );
};
