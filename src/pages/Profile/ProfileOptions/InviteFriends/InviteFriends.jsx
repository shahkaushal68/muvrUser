import { Link } from "react-router-dom";
import { MVButton, MVHeader, MVIcon, MVTextInput } from "../../../../components";
import InviteFriendsImg from "../../../../assets/images/covers/invite-friends.svg";
import styles from "../InviteFriends/InviteFriends.module.css"

const InviteFriends = () => {
  return (
    <>
      <MVHeader>
        <div className={"position-relative w-100"}>
          <Link to={"/profile"} className={"positioned-left header-btn"}>
            {MVIcon.BackArrow}
          </Link>
          <h3 className={"text-center fw-600"}>Invite friends</h3>
        </div>
      </MVHeader>
      <section className={"content-full pt-6 pl-4 pr-4 pb-10 d-flex align-center justify-space-between flex-column h-100"}>
        <div className={styles.inviteCardContent}>
          <div className={styles.imageCardContent}>
            <img src={InviteFriendsImg} alt="Invite Friends" />
          </div>
          <div className={`${styles.TextCardContent} darkgray`} >
            <h2 className="fw-600">Give $10, Get $10</h2>
            <p className="p-lg">Refer a friend to Muvr and you both get $10 in Muvr credit</p>
          </div>
          <div className={"w-100"}>
            <MVTextInput
              placeholder={"BP47DD"}
              suffix={
                <button className="btn-unstyled link link-primary p-sm fw-500 d-block">copy</button>
              }
            />
          </div>
        </div>
        <div className={"card-btn w-100 mt-4"}>
          <MVButton variant={"primary"} size="medium" className={"w-100"}>
            Share
          </MVButton>
        </div>
      </section>
    </>
  );
}

export default InviteFriends