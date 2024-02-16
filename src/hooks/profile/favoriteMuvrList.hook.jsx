import { useEffect, useMemo, useState } from "react";
import { doFetchAllFavouriteMuvr, doFetchServiceList } from "../../actions";
import { formatNumberWithDecimal, getDescryptionString } from "../../services";
import { MVButton, MVIcon, MVTabs } from "../../components";
import { Link } from "react-router-dom";
import clsx from "clsx";
import { Avatar } from "antd";
import styles from "../../pages/Profile/ProfileOptions/FavoriteMuvrs/FavoriteMuvrs.module.css";
import { HeartRemove } from "iconsax-react";

export const useFavoriteMuvrListHook = () => {
  const [loading, setLoading] = useState(false);
  const [favouriteMuvrAllList, setfavouriteMuvrAllList] = useState({});
  const [serviceList, setServiceList] = useState([]);

  useEffect(() => {
    try {
      setLoading(true);
      fetchFavoriteMuvrDetails();
    } catch (error) {
      console.error("Error", error);
    }
  }, []);

  useEffect(() => {
    try {
      setLoading(true);
      fetchServices();
    } catch (error) {
      console.error("Error", error);
    }
  }, [favouriteMuvrAllList]);

  const fetchFavoriteMuvrDetails = async () => {
    try {
      const favouriteMuvrResponse = await doFetchAllFavouriteMuvr();
      if (favouriteMuvrResponse?.status === 200) {
        const favoriteMuvrDetail = JSON.parse(getDescryptionString(favouriteMuvrResponse?.data?.data));
        console.log(favoriteMuvrDetail);
        setfavouriteMuvrAllList(favoriteMuvrDetail);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const favoriteMuvrsItemTab = useMemo(() => {
    return [
      {
        key: "1",
        label: `Driver(${favouriteMuvrAllList?.driverList?.length > 0 ? favouriteMuvrAllList?.driverList?.length : 0})`,
        children:
          favouriteMuvrAllList?.driverList?.length > 0 ? (
            favouriteMuvrAllList?.driverList?.map((muvrItem, muvrIndex) => (
              <div className={styles.muvrCardContainer}>
                <div className={styles.muvrCard} key={muvrIndex}>
                  <MVButton variant={"none"} className={clsx(styles.closeIcon, "link link-darkgray")}>
                    {MVIcon.cross}
                  </MVButton>
                  <Link to={"/favorite-muvr-detail"} className={clsx("dark", styles.muvrDetailsLink)}>
                    <div className={styles.muvrDetails}>
                      <div className="d-flex align-center">
                        <Avatar
                          shape={"round"}
                          size={40}
                          src={muvrItem?.users?.profile_image ? muvrItem?.users?.profile_image : "https://i.pravatar.cc/300"}
                          className="flex-0-auto"
                        ></Avatar>
                        <div className="ml-2">
                          <h4 className="fw-500 text-dark">{muvrItem?.users?.first_name ? `${muvrItem?.users?.first_name} ${muvrItem?.users?.last_name}` : ""}</h4>
                          <div className="d-flex align-center">
                            {MVIcon.star} <h5 className="fw-400 darkgray ml-1">{formatNumberWithDecimal(Number(muvrItem?.totalRatingCount))}</h5>
                            <div className={clsx(styles.dot, "ml-2 mr-2")}></div>
                            <h5 className="darkgray fw-400">4 Rebook</h5>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                  <div className={styles.bookAgain}>
                    <Link to="/" className="link link-primary fw-500 d-block text-center">
                      Book again
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="h-100 d-flex justify-center flex-column align-center">
              <HeartRemove size="32" color="var(--clr-dark)" variant="Bold" />
              <h3>No favorite Drivers yet!</h3>
              <span>You don't have any favorite Drivers yet!</span>
            </div>
          ),
      },
      {
        key: "2",
        label: `Helper(${favouriteMuvrAllList?.helperList?.length > 0 ? favouriteMuvrAllList?.helperList?.length : 0})`,
        children:
          // <>
          //   <h2 className="fw-600">Select Helper</h2>
          // </>
          favouriteMuvrAllList?.driverList?.length > 0 ? (
            favouriteMuvrAllList?.helperList?.map((muvrItem, muvrIndex) => {
              return (
                <>
                  <div className={styles.muvrCardContainer}>
                    <div className={styles.muvrCard} key={muvrIndex}>
                      <MVButton variant={"none"} className={clsx(styles.closeIcon, "link link-darkgray")}>
                        {MVIcon.cross}
                      </MVButton>
                      <Link to={"/favorite-muvr-detail"} className={clsx("dark", styles.muvrDetailsLink)}>
                        <div className={styles.muvrDetails}>
                          <div className="d-flex align-center">
                            <Avatar
                              shape={"round"}
                              size={40}
                              src={muvrItem?.users?.profile_image ? muvrItem?.users?.profile_image : "https://i.pravatar.cc/300"}
                              className="flex-0-auto"
                            ></Avatar>
                            <div className="ml-2">
                              <h4 className="fw-500 text-dark">{muvrItem?.users?.first_name ? `${muvrItem?.users?.first_name} ${muvrItem?.users?.last_name}` : ""}</h4>
                              <div className="d-flex align-center">
                                {MVIcon.star} <h5 className="fw-400 darkgray ml-1">{formatNumberWithDecimal(Number(muvrItem?.totalRatingCount))}</h5>
                                <div className={clsx(styles.dot, "ml-2 mr-2")}></div>
                                <h5 className="darkgray fw-400">4 Rebook</h5>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                      <div className={styles.bookAgain}>
                        <Link className="link link-primary fw-500 d-block text-center">Book again</Link>
                      </div>
                    </div>
                  </div>
                </>
              );
            })
          ) : (
            <div className="h-100 d-flex justify-center flex-column align-center">
              <HeartRemove size="32" color="var(--clr-dark)" variant="Bold" />
              <h3>No favorite Helpers yet!</h3>
              <span>You don't have any favorite Helpers yet!</span>
            </div>
          ),
      },
    ];
  }, [favouriteMuvrAllList]);

  const fetchServices = async () => {
    const serviceListResponces = await doFetchServiceList(1, 100);
    if (serviceListResponces?.status === 200) {
      const serviceList = JSON.parse(getDescryptionString(serviceListResponces?.data?.data));
      let serviceOptionList = [];
      if (serviceList && serviceList?.length > 0) {
        serviceList?.forEach((serviceItem, serviceIndex) => {
          const children = (
            <section
              className={`main-wrapper ${favouriteMuvrAllList?.driverList?.length === 0 || (favouriteMuvrAllList?.helperList?.length === 0 ? "no-favorite-muvrs" : "")} h-100`}
            >
              <MVTabs defaultActiveTab="1" tabItems={favoriteMuvrsItemTab} onChange={() => console.log("Favorite muvr tab changed")} shape="pill" />
            </section>
          );

          serviceOptionList?.push({ key: serviceItem?.id, id: serviceIndex, label: serviceItem?.name, children: children });
        });
      }
      setLoading(false);
      setServiceList(serviceOptionList);
    }
  };

  return {
    loading,
    serviceList,
  };
};
