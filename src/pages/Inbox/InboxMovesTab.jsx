import clsx from "clsx";
import { Link } from "react-router-dom";
import { MVIcon } from "../../components";
import { inboxMuvrsList } from "../../constants/data";
import styles from "./Inbox.module.css";

const MuvrListItem = ({ data: { activeMuvr, image, name, newMessages, notificationBlocked } }) => {
  return (
    <Link
      to={activeMuvr ? `/inbox/chat/${name}` : `/inbox/${name}`}
      className={clsx([styles.muvrItem], {
        [styles.newMessage]: newMessages,
      })}
    >
      <img src={image} alt={name} width={52} height={52} className="round mr-3" />

      <div className="w-100">
        <h4 className="mb-1 fw-500 lh-1">{name}</h4>
        <div className={styles.muvrExtraDetails}>
          {newMessages !== 0 ? (
            <p className="h6 mb-0 fw-400">{newMessages} new messages</p>
          ) : (
            <p className="h6 mb-0 gray">Book again</p>
          )}
          {notificationBlocked && <div className={styles.notifOff}>{MVIcon.notificationBellOff}</div>}
        </div>
      </div>
    </Link>
  );
};

export const InboxMovesTab = () => {
  return (
    <main className="main-wrapper">
      <h2 className="mb-3">Active Muvrs</h2>

      <div className={styles.muvrsList}>
        {inboxMuvrsList.map((muvr, index) => {
          return muvr.activeMuvr ? <MuvrListItem key={index} data={muvr} /> : null;
        })}
      </div>

      <h2 className="my-4">Previous Muvrs</h2>

      <div className={styles.muvrsList}>
        {inboxMuvrsList.map((muvr, index) => {
          return !muvr.activeMuvr ? <MuvrListItem key={index} data={muvr} /> : null;
        })}
      </div>
    </main>
  );
};
