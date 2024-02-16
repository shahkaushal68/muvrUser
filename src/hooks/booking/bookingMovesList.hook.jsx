import { useEffect, useState } from "react";
import { doFetchBookingMovesList, doFetchServiceList } from "../../actions";
import { getDescryptionString } from "../../services";
import { MBMovesContent } from "../../pages/Booking/MyBooking/MyBookingTabs/MBMovesContent";
import { NoteRemove } from "iconsax-react";

export const useBookingMovesListhook = () => {
  const [loading, setLoading] = useState(false);
  const [bookingMovesAllList, setbookingMovesAllList] = useState({});

  const [bookingServiceList, setBookingServiceList] = useState([]);
  const [dateTypeActiveTabKey, setdateTypeActiveTabKey] = useState("upcoming");
  const [serviceActiveTabKey, setServiceActiveTabKey] = useState({});
  const [dateTabData, setDateTabData] = useState({
    dateType: "upcoming",
    serviceId: 1,
  });

  useEffect(() => {
    try {
      setLoading(true);
      fetchBookingMoves();
    } catch (error) {
      console.log({ error });
    }
  }, [dateTabData]);

  const fetchBookingMoves = async () => {
    const bookingResponse = await doFetchBookingMovesList(
      dateTabData?.dateType,
      dateTabData?.serviceId,
      localStorage.getItem("_token") ? true : false,
      localStorage.getItem("_token") ? "" : localStorage.getItem("session_id")
    );

    const serviceListResponces = await doFetchServiceList(1, 100);
    if (serviceListResponces?.status === 200) {
      const serviceList = JSON.parse(getDescryptionString(serviceListResponces?.data?.data));

      const bookingList = JSON.parse(getDescryptionString(bookingResponse?.data?.data));
      console.log(bookingList);

      (await serviceList) &&
        serviceList?.length > 0 &&
        serviceList?.map(async (serviceItem, serviceIndex) => {
          // console.log(serviceItem);
          bookingList?.serviceList?.map((serviceData, index) => {
            if (serviceData?.id === serviceItem?.id) {
              const label = (
                <>
                  {serviceItem?.name}
                  <span className="pl-1">({serviceData?.bookingCount})</span>
                </>
              );
              let children;
              children = <MBMovesContent bookingList={bookingList?.bookingList} activeDateType={dateTypeActiveTabKey} />;
              const noServiceBookingData = (
                <>
                  <div className="h-100 d-flex justify-center flex-column align-center emptyTabs">
                    <NoteRemove size="32" color="#000" variant="Bold" />
                    <h3>No bookings yet!</h3>
                    <p>There is no data to show you right now</p>
                  </div>
                </>
              );
              // if (serviceIndex === 2) {
              //   children = <h2 className="fw-600">Select Helper</h2>;
              // }
              setBookingServiceList((prevState) => [
                ...prevState,
                {
                  key: serviceItem?.id,
                  id: serviceIndex,
                  label: label,
                  children: serviceData?.bookingCount > 0 ? children : noServiceBookingData,
                },
              ]);
            }
          });
        });
      setbookingMovesAllList(bookingList);
    }
    setLoading(false);
  };

  const handleChangeDateTypeKey = (key) => {
    setdateTypeActiveTabKey(key);
    setBookingServiceList([]);
    setDateTabData((prev) => ({ ...prev, dateType: key, serviceId: 1 }));
  };
  const handleChangeServiceKey = (key) => {
    setServiceActiveTabKey(key);
    setBookingServiceList([]);
    setDateTabData((prev) => ({ ...prev, serviceId: key }));
  };

  return {
    loading,
    bookingMovesAllList,
    bookingServiceList,
    dateTypeActiveTabKey,
    serviceActiveTabKey,
    handleChangeDateTypeKey,
    handleChangeServiceKey,
  };
};
