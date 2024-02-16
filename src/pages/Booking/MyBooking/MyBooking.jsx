import { MVAppBar, MVHeader, MVLoader, MVTabs } from "../../../components";
import MyBookingUpcomingTab from "./MyBookingTabs/MyBookingUpcomingTab";
import { useBookingMovesListhook } from "../../../hooks/booking/bookingMovesList.hook";
import { NoteRemove } from "iconsax-react";

const MyBooking = () => {
  const { loading, bookingMovesAllList, bookingServiceList, dateTypeActiveTabKey, serviceActiveTabKey, handleChangeDateTypeKey, handleChangeServiceKey } =
    useBookingMovesListhook();
  // console.log3(bookingServiceList);
  const children = <MyBookingUpcomingTab tabItems={bookingServiceList} activeKey={serviceActiveTabKey} handleChange={handleChangeServiceKey} loading={loading} />;
  const noBookingData = (
    <>
      <div className="h-100 d-flex justify-center flex-column align-center">
        <NoteRemove size="32" color="#000" variant="Bold" />
        <h3>No bookings yet!</h3>
        <span>There is no data to show you right now</span>
      </div>
    </>
  );

  const MyBookingPageTabItems = [
    {
      key: "upcoming",
      label: (
        <>
          Upcoming
          <span className="pl-1">({bookingMovesAllList?.upcomingCount})</span>
        </>
      ),
      children: bookingMovesAllList?.upcomingCount > 0 ? children : noBookingData,
    },
    {
      key: "past",
      label: (
        <>
          Past
          <span className="pl-1">({bookingMovesAllList?.pastCount})</span>
        </>
      ),
      children: bookingMovesAllList?.pastCount > 0 ? children : noBookingData,
    },
    {
      key: "draft",
      label: (
        <>
          Draft
          <span className="pl-1">({bookingMovesAllList?.draftCount})</span>
        </>
      ),
      children: bookingMovesAllList?.draftCount > 0 ? children : noBookingData,
    },
  ];
  return (
    <>
      <MVHeader>
        <div className="w-100 d-flex justify-space-between">
          <div>
            <h2 className={"fw-600 mb-0"}>My bookings</h2>
            <p className="h5 mb-0 fw-400 darkgray">Manage all of your bookings</p>
          </div>
        </div>
      </MVHeader>
      <section className="content-full">
        {loading ? <MVLoader /> : <MVTabs defaultActiveTab={dateTypeActiveTabKey} tabItems={MyBookingPageTabItems} onChange={handleChangeDateTypeKey} shape="square" centered />}
      </section>

      <MVAppBar />
    </>
  );
};
export default MyBooking;
