import { Edit2, ArrowRight2, LogoutCurve, Heart, Wallet, TicketDiscount, Profile2User, Setting2 } from "iconsax-react";
import { Link } from "react-router-dom";
import { MVAppBar, MVAvatar, MVButton, MVHeader, MVIcon, MVModal } from "../../components";
import styles from "./Profile.module.css";
import { useProfileLogoutHook } from "../../hooks";

const profileContentList = [
  {
    key: "1",
    title: "Favorite Muvrs",
    path: "/favorite-muvrs",
    icon: <Heart color="var(--accent-primary)" variant="Bold" size={24} />,
  },
  {
    key: "2",
    title: "Wallet",
    path: "/wallet",
    icon: <Wallet color="var(--accent-primary)" variant="Bold" size={24} />,
  },
  {
    key: "3",
    title: "Promotions",
    path: "/promotions",
    icon: <TicketDiscount color="var(--accent-primary)" variant="Bold" size={24} />,
  },
  {
    key: "4",
    title: "Invite friends",
    path: "/invite-friends",
    icon: <Profile2User color="var(--accent-primary)" variant="Bold" size={24} />,
  },
  {
    key: "5",
    title: "Settings",
    path: "/setting",
    icon: <Setting2 color="var(--accent-primary)" variant="Bold" size={24} />,
  },
  {
    key: "6",
    title: "Help",
    path: "/help",
    icon: <>{MVIcon.HelpFilled}</>,
  },
  {
    key: "7",
    title: "Become a Muvr",
    icon: <>{MVIcon.BoxMoverFilled}</>,
  },
  {
    key: "8",
    title: "Report a bug",
    path: "/report-bug",
    icon: <>{MVIcon.BugFilled}</>,
  },
];

const Profile = () => {
  const { isDisabled, userDetails, profileLogoutViewModal, handleLogoutSubmit, handleLogoutViewModal, handleLogoutCloseModal } = useProfileLogoutHook();

  return (
    <>
      <MVHeader>
        <div className="w-100 d-flex justify-space-between align-center">
          <div>
            <h1 className="fw-600 mb-0">Profile</h1>
          </div>
          <Link to={"/edit-profile"} className="header-btn">
            <Edit2 color="var(--clr-dark)" variant="Bold" size={24} />
          </Link>
        </div>
      </MVHeader>
      <section className="content-full text-center pl-4 pr-4">
        <div className={styles.profileHeader}>
          <MVAvatar src={userDetails?.profile_image ? userDetails?.profile_image : "https://i.pravatar.cc/300"} alt={userDetails?.first_name} className={styles.ctmAvtar} />
          <h3>{userDetails?.first_name ? `${userDetails?.first_name} ${userDetails?.last_name}` : ""}</h3>
          <p className={styles.subHeading}>{userDetails?.address}</p>
          <MVButton variant={"primary"} className={styles.bookButton}>
            Book a Muvr
          </MVButton>
        </div>
        <div className={styles.profileContent}>
          {profileContentList.map((profileContentElem) => {
            return (
              <div className={styles.profileContentListItem} key={profileContentElem.key}>
                <Link to={profileContentElem.path}>
                  <div className="listItemLeft d-flex align-center">
                    <div className={styles.profileContentIcon}>{profileContentElem.icon}</div>
                    <h4 className="fw-500 dark ml-2">{profileContentElem.title}</h4>
                  </div>
                  <div className={styles.listItemRight}>
                    <ArrowRight2 color="var(--clr-darkgray)" size={20} />
                  </div>
                </Link>
              </div>
            );
          })}
          <button className={`${styles.logoutBtn} d-flex align-center justify-center ma-auto btn-unstyled`} onClick={() => handleLogoutViewModal()}>
            <span className={styles.logoutIcon}>
              <LogoutCurve color="#EB5757" variant="Bold" size={20} />
            </span>
            <h4 className="fw-600 ml-2 cursor-pointer">logout</h4>
          </button>
        </div>

        <MVModal
          title="Logout Modal"
          open={profileLogoutViewModal}
          width={343}
          handleClose={() => handleLogoutCloseModal()}
          centered
          className={styles.logOutModal}
          bodyClassName={styles.logOutBody}
          confirmationModal={true}
          closable={false}
        >
          <div className="text-center">
            <div className={styles.logOutCardContentWrap}>
              <div className={styles.logOutCardIcon}>
                <LogoutCurve color="var(--clr-red)" variant="Bold" size={32} />
              </div>
              <div className={styles.logOutCardText}>
                <h2 className={"mb-4 fw-500"}>Log out</h2>
                <p>Are you sure you want to log out of your account?</p>
              </div>
              <div className={`${styles.logOutCardBtn} w-100`}>
                <MVButton variant={"secondary"} onClick={() => handleLogoutCloseModal()} disabled={isDisabled}>
                  No
                </MVButton>
                <MVButton variant={"primary"} disabled={isDisabled} handleClick={() => handleLogoutSubmit()}>
                  Yes
                </MVButton>
              </div>
            </div>
          </div>
        </MVModal>
      </section>
      <MVAppBar />
    </>
  );
};

export default Profile;
