// import type { RadioChangeEvent } from "antd";
import { Radio } from "antd";
import { MVButton, MVCalendar } from "../../components";
import styles from "./MuvrBookingSteps.module.css";
import { useDateTimeStepHook } from "../../hooks";

export const DateTimeStep = ({ successResponse, current }) => {
  // const [onChange] = useState(new Date());
  const { selectDate, handleDateChange, selectTime, handleTimeChange, handleClickOnNextButton, timeSlotList, threeMonthsLater } = useDateTimeStepHook(successResponse, current);

  return (
    <>
      <div className="content-full">
        <section className="main-wrapper">
          <h2 className="fw-600">Pickup date</h2>
          <div className="mt-3">
            <MVCalendar minDate={new Date()} date={selectDate} maxDate={threeMonthsLater} onDateChange={handleDateChange} />
          </div>
          <div className="mt-4">
            <h2 className="fw-600">Pickup between</h2>
            <div className="mt-3 custom-radio-style pickup-between-grid">
              <Radio.Group defaultValue="c" className="d-grid" onChange={handleTimeChange} value={selectTime}>
                {timeSlotList &&
                  timeSlotList?.length > 0 &&
                  timeSlotList?.map((timeSlotItem, timeSlotIndex) => {
                    return (
                      // !timeSlotItem?.isBooked && (
                      <Radio.Button
                        key={timeSlotIndex}
                        value={timeSlotItem?.time}
                        className="d-flex align-center justify-center fw-500 darkgray"
                        disabled={timeSlotItem?.isBooked ? true : false}
                      >
                        {timeSlotItem?.time}
                      </Radio.Button>
                      // )
                    );
                  })}
              </Radio.Group>
            </div>
          </div>
        </section>
      </div>

      <MVButton variant="primary" className={`w-100 align-self-end radius-none ${styles.stepsBtn}`} handleClick={handleClickOnNextButton}>
        Next
      </MVButton>
    </>
  );
};
