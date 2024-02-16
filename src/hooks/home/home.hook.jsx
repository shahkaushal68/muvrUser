import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { doFetchServiceList } from "../../actions";
import { HomeJunkRemovalTab } from "../../pages/Home/HomeTabs/HomeJunkRemovalTab";
import HomeLaborTab from "../../pages/Home/HomeTabs/HomeLaborTab";
import { HomeMovesTab } from "../../pages/Home/HomeTabs/HomeMovesTab";
import { getDescryptionString } from "../../services";
import uuid from "react-uuid";

export const useHomeHook = () => {
  const navigate = useNavigate();
  const [homePageTabItems, setHomePageTabItems] = useState([]);
  const [sessionId, setSessionId] = useState("");
  const { userDetails } = useSelector((state) => state.storeAuthenticateReducer);

  // useEffect(() => {
  //   if (!userDetails?.is_profile_complete) {
  //     navigate("/create-account");
  //   }
  // }, [userDetails]);

  useEffect(() => {
    let storeSessionId = localStorage.getItem("session_id");
    if (!storeSessionId) {
      storeSessionId = uuid();
      localStorage.setItem("session_id", storeSessionId);
    }
    setSessionId(storeSessionId);
  }, []);

  useEffect(() => {
    fetchService();
  }, []);
  const fetchService = async () => {
    const serviceListResponces = await doFetchServiceList(1, 100);
    if (serviceListResponces?.status === 200) {
      const serviceList = JSON.parse(getDescryptionString(serviceListResponces?.data?.data));
      let homePageTabItemsList = [];
      (await serviceList) &&
        serviceList?.length > 0 &&
        serviceList?.map(async (serviceItem, serviceIndex) => {
          let children;
          if (serviceIndex === 0) {
            children = <HomeMovesTab serviceId={serviceItem?.id} />;
          }
          if (serviceIndex === 1) {
            children = <HomeJunkRemovalTab serviceId={serviceItem?.id} />;
          }
          if (serviceIndex === 2) {
            children = <HomeLaborTab serviceId={serviceItem?.id} />;
          }
          await setHomePageTabItems((prevState) => [
            ...prevState,
            {
              key: serviceIndex,
              id: serviceItem?.id,
              label: serviceItem?.name,
              children: children,
            },
          ]);
        });
    }
  };
  return {
    sessionId,
    userDetails,
    homePageTabItems,
  };
};
