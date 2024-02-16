import { Link } from "react-router-dom";
import { MVAvatar } from "../../../components";
export const MVPingMuvers = ({ muvrInfo }) => {
  return (
    <>
      <div className="rounded-detail-box">
        {muvrInfo?.map((item, index) => (
          <div className={"ping-muvers-list d-flex align-center w-100"} key={index}>
            <MVAvatar shape={"circle"} size={40} src={item?.user?.profile_image ? item?.user?.profile_image : "https://i.pravatar.cc/300"} className="mr-2 flex-0-auto" />
            <div>
              <h5 className="fw-400 mb-1 dark">{item?.user?.first_name ? `${item?.user?.first_name} ${item?.user?.last_name}` : ""}</h5>
              <p className="fw-400 mb-0 d-flex align-center">
                <span className={item.muvr_request && item.muvr_request === "ACCEPTED" ? "green" : "orange"}>{item.muvr_request ? `Request ${item.muvr_request}` : ""}</span>
                <b className="points-dot mx-2"></b>
                <span className="darkgray text-capitalize">{item.type}</span>
              </p>
            </div>
          </div>
        ))}
        <div className="pt-3 ping-muvers-bottom-head">
          <Link to="/" className="mb-0 fw-500 d-flex align-center justify-center p violet">
            Ping Muvers
          </Link>
        </div>
      </div>
    </>
  );
};
