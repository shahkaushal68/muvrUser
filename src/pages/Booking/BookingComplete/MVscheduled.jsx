import greenTick from "../../../assets/images/icons/green-tick-big.svg";
import Truck from "../../../assets/images/covers/truck.png";
export const MVscheduled = ({ pickUpDate, pickUpTime, vehicleName }) => {
  return (
    <>
      <div className="green-tick">
        <img src={greenTick} alt="greenTick" />
      </div>
      <h2 className="fw-600 text-center mb-2">Your move is scheduled!</h2>
      <h5 className="darkgray fw-500 text-center">
        Your booking for MuvrXL is successfully scheduled for {pickUpDate && pickUpDate} Between
        {pickUpTime && pickUpTime}
      </h5>
      <div>
        <div className="vehicle-img">
          <img src={Truck} alt="Truck" />
        </div>
        <h4 className="fw-500 text-center">{vehicleName && vehicleName}</h4>
        <h5 className="darkgray fw-500 text-center mt-2">
          We will notify you when a Muvr is assigned to your booking and on the
          way to the pickup location.
        </h5>
      </div>
    </>
  );
};
export default MVscheduled;
