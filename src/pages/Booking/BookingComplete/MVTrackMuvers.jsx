import { Link } from "react-router-dom";
import { MVAvatar, MVIcon } from "../../../components";
export const MVTrackMuvers = ({ trackClassName, isRemoveBottom, muvrInfo, distance, bookingId }) => {
  // Track muvers start
  const MVTrackMuversData = [
    {
      profileImg: "https://i.pravatar.cc/300",
      name: "Jack",
      driverPosition: "Driver",
      iconChat: MVIcon.chatIcon,
      iconCall: MVIcon.callIcon,
    },
  ];
  // Track muvers end
  return (
    <>
      <div className={`${trackClassName} rounded-detail-box`}>
        {muvrInfo?.map((item, index) => (
          <div className={"ping-muvers-list d-flex align-center w-100"} key={index}>
            <MVAvatar shape={"circle"} size={40} src={item?.user?.profile_image ? item?.user?.profile_image : "https://i.pravatar.cc/300"} className="mr-2 flex-0-auto" />
            <div className="d-flex align-center w-100">
              <div>
                <h5 className="fw-400 mb-1 dark">{item?.user?.first_name ? `${item?.user?.first_name} ${item?.user?.last_name}` : ""}</h5>
                <h6 className="fw-400 mb-0 darkgray text-capitalize">{item?.type}</h6>
              </div>
              <div className="d-flex align-center g-2 ml-auto">
                <div className="icon-box d-flex align-center justify-center cursor-pointer transition-03s">
                  <Link to="/inbox">{MVIcon.chatIcon}</Link>
                </div>
                <div className="icon-box d-flex align-center justify-center cursor-pointer transition-03s">{MVIcon.callIcon}</div>
              </div>
            </div>
          </div>
        ))}
        {isRemoveBottom ? (
          <></>
        ) : (
          <>
            <div className="pt-3 ping-muvers-bottom-head">
              <Link to={`/track/${bookingId}`} className="mb-0 fw-500 d-flex align-center justify-center p violet">
                Track Muvrs
              </Link>
              <span className="p-sm fw-400 darkgray text-center d-block mt-1">{distance} Miles - On the way to pickup</span>
            </div>
          </>
        )}
      </div>
    </>
  );
};
