import { Calendar, Home, Messages3, User } from "iconsax-react";
import { NavLink } from "react-router-dom";
import styles from "./MVAppBar.module.css";
import { useSelector } from "react-redux";
import { MVAvatar } from "../MVAvatar/MVAvatar";

export const MVAppBar = () => {
  const { userDetails } = useSelector((state) => state.storeAuthenticateReducer);

  return (
    <div className={styles.appBar}>
      <NavLink className={styles.appBarLink} to="/">
        <Home size={24} color={"currentcolor"} variant="Bold" />
        <h6>Home</h6>
      </NavLink>
      <NavLink className={styles.appBarLink} to="/my-bookings">
        <Calendar size={24} color={"currentcolor"} variant="Bold" />
        <h6>Orders</h6>
      </NavLink>
      <NavLink className={styles.appBarLink} to="/inbox">
        <Messages3 size={24} color={"currentcolor"} variant="Bold" />
        <h6>Inbox</h6>
      </NavLink>
      <NavLink className={styles.appBarLink} to={`${localStorage?.getItem("_token") ? "/profile" : "/choose-auth"}`}>
        <div className={styles.accountImg}>
          {userDetails?.profile_image ? (
            <img src={userDetails?.profile_image} alt="User" width={24} height={24} className="obj-contain fluid round" />
          ) : (
            <MVAvatar size={25} icon={<User className="darkgray" fill="currentColor" size={20} variant="Bold" />} className="bg-lavender" />
          )}
        </div>
        <h6>Account</h6>
      </NavLink>
    </div>
  );
};
