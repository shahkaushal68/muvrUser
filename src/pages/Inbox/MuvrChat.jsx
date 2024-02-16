import clsx from "clsx";
import { ArrowRight2, Call, Camera, Send2 } from "iconsax-react";
import { Link } from "react-router-dom";
import { MVHeader, MVIcon } from "../../components";
import { inboxMuvrChat } from "../../constants/data";
import styles from "./Inbox.module.css";

const MessageItem = ({ data: { isSeen, timestamp, isOutgoing, messageText } }) => {
  return (
    <div
      className={clsx([styles.message], {
        [styles.isOutgoing]: isOutgoing,
      })}
    >
      {!isOutgoing && (
        <img
          src="https://i.pravatar.cc/52"
          alt="Robert Fox"
          width={40}
          height={40}
          className={"obj-cover round mt-4"}
        />
      )}

      <div className={styles.messageBox}>
        <p className={styles.messageText}>{messageText}</p>
        <div className={styles.messageBoxFooter}>
          <span>{timestamp}</span>
          {isOutgoing && (
            <span
              className={clsx({
                "accent-primary": isSeen,
                gray: !isSeen,
              })}
            >
              {MVIcon.doubleTick}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

const MuvrChat = () => {
  return (
    <>
      <MVHeader>
        <div className="w-100 d-flex">
          <Link to={"/inbox"} className={"header-btn mr-2"}>
            {MVIcon.BackArrow}
          </Link>
          <div>
            <h4 className="fw-600 mb-1">Robert Fox</h4>
            <div className={styles.muvrChatHeaderInfo}>
              <div>Jun 24</div>
              <div>Driver</div>
              <div>Muvr XXL</div>
            </div>
          </div>
          <div className="d-flex align-center ml-auto">
            <button className={"header-btn"}>
              <Call size={24} color="var(--clr-dark)" variant="Bold" />
            </button>
            <button className={"header-btn ml-2"}>{MVIcon.column3Dot}</button>
          </div>
        </div>
      </MVHeader>
      <main className="content-full position-relative">
        <Link
          to="/booking-details"
          className={clsx(styles.currentBookingDetailsBanner, "d-flex link link-primary fw-600")}
        >
          View booking details <ArrowRight2 size="20" color="currentcolor" />
        </Link>

        <div className={styles.messageDay}>Today</div>
        {inboxMuvrChat.map((message, index) => (
          <MessageItem key={index} data={message} />
        ))}
        <div className={styles.chatFooter}>
          <div className={styles.messageInputWrap}>
            <input type="text" className={styles.messageInput} name="Message" placeholder="Message..." />

            <button className={styles.mediaUploadButton}>
              <Camera size="20" color="var(--clr-dark)" variant="Bold" />
            </button>
          </div>
          <button className={styles.sendMessage}>
            <Send2 size="20" color="var(--clr-dark)" variant="Bold" />
          </button>
        </div>
      </main>
    </>
  );
};

export default MuvrChat;
