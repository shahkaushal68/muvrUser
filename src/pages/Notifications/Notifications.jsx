import { Link } from "react-router-dom";
import { MVHeader, MVIcon, MVTabs } from "../../components";
import { notificationData } from "../../constants/data";
import styles from "../Notifications/Notifications.module.css";

const NotificationPageTabItems = [
  {
    key: "1",
    label: (
      <>
        Moves
        <span className="pl-1">(4)</span>
      </>
    ),
    children: (
      <>
        <div>
          <p className="darkgray mb-3">Today, April 10, 2023</p>
          <div className={styles.notificationCardWrap}>
            {notificationData.map((notificationElem, notificationIndex) => {
              return (
                <div className={`${styles.notificationCardItem} pa-3 mb-4`} key={notificationIndex}>
                  <div className="d-flex align-center justify-space-between mb-2">
                    <span className="dark p-lg fw-500">{notificationElem.notificationLabel}</span>
                    <span className="p-sm darkgray">{notificationElem.notificationDate}</span>
                  </div>
                  <div className="mb-3 darkgray">
                    {notificationElem.notificationMessage}
                  </div>
                  <div>
                    <Link to={notificationElem.notificationPath} className="accent-primary link p align-center d-flex fw-500">
                      {notificationElem.notificationLink}
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </>
    ),
  },
  {
    key: "2",
    label: (
      <>
        Junk removal
        <span className="pl-1">(3)</span>
      </>
    ),
    children: "Junk Removal Notifications",
  },
  {
    key: "3",
    label: (
      <>
        Labor
        <span className="pl-1">(3)</span>
      </>
    ),
    children: "Labor Notifications",
  },
];

const Notifications = () => {
  return (
    <>
      <MVHeader>
        <div className={"position-relative w-100"}>
          <Link to={"/"} className={"positioned-left header-btn"}>
            {MVIcon.BackArrow}
          </Link>
          <h3 className={"text-center fw-600"}>Notifications</h3>
        </div>
      </MVHeader>
      <section className="content-full px-4 py-3">
        <MVTabs
          defaultActiveTab="1"
          tabItems={NotificationPageTabItems}
          onChange={() => console.log("Favorite muvr tab changed")}
          shape="pill"
        />
      </section>
    </>
  );
}

export default Notifications