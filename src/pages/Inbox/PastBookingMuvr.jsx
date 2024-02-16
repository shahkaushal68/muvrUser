import { ArrowRight2 } from "iconsax-react";
import { Link } from "react-router-dom";
import { MVAvatar, MVButton, MVHeader, MVIcon } from "../../components";

const PastBookingMuvr = () => {
  return (
    <>
      <MVHeader>
        <div className="w-100 d-flex align-center">
          <Link to={"/inbox"} className={"header-btn mr-2"}>
            {MVIcon.BackArrow}
          </Link>
          <div>
            <h4 className="fw-600">Dianne Russell</h4>
          </div>
          <div className="d-flex align-center ml-auto">
            <button className={"header-btn ml-2"}>{MVIcon.column3Dot}</button>
          </div>
        </div>
      </MVHeader>
      <main className="main-wrapper content-full text-center">
        <div className="mb-2 text-center mt-10">
          <MVAvatar size={76} shape={"round"} src="https://i.pravatar.cc/76" alt={"Dianne Russell"} className="mb-3" />

          <h4 className="mb-1 fw-500">Dianne Russell</h4>
          <p className="darkgray h6">Last Book: Jan 24, 2022</p>
        </div>
        <div className="mt-auto">
          <Link className="justify-center d-flex link link-primary fw-600">
            View previous booking details <ArrowRight2 size="20" color="currentcolor" />
          </Link>

          <MVButton variant={"primary"} className={"w-100 mt-9"}>
            Book again
          </MVButton>
        </div>
      </main>
    </>
  );
};

export default PastBookingMuvr;
