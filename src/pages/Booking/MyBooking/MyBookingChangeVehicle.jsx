import { Link } from "react-router-dom";
import { MVHeader, MVIcon } from "../../../components";
import { MVSelectVehicleSwiperSlide } from "../../../components/MVSelectVehicleSwiperSlide/MVSelectVehicleSwiperSlide";
const MyBookingChangeVehicle = () => {
  return (
    <>
      <MVHeader>
        <div className="position-relative w-100 d-flex align-center">
          <Link to="/booking-edit" className={"header-btn"}>
            {MVIcon.BackArrow}
          </Link>
          <div className="pl-2 pr-8 d-flex mx-auto">
            <h3 className="fw-500">Change vehicle</h3>
          </div>
        </div>
      </MVHeader>
      <section className="main-wrapper main-wrapper-scroll d-flex flex-column">
        <h2 className="fw-600">Select vehicle</h2>
        <MVSelectVehicleSwiperSlide />
        <p className="p-sm fw-400 darkgray text-center">
          The amount shown is only for the Base fare of the vehicle. You can
          view the final amount of your order on the main edit screen.
        </p>
        <div className="mt-auto">
          <Link
            to="/booking-edit"
            role="button"
            variant={"primary"}
            className="w-100 primary-btn text-decoration-none"
          >
            Save changes
          </Link>
        </div>
      </section>
    </>
  );
};
export default MyBookingChangeVehicle;
