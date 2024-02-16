import clsx from "clsx";
import React, { useState } from "react";
import { MVAvatar } from "../MVAvatar/MVAvatar";
import { MVToggle } from "../MVToggle/MVToggle";
import { Link } from "react-router-dom";
import { MVIcon } from "../MVIcon/MVIcon";
import { Drawer } from "antd";
import { MVButton } from "../MVButton/MVButton";
import { ArrowRight2 } from "iconsax-react";
import { requestFavoriteDriversList, requestFavoriteHelpersList } from "../../constants/data";
import { FavoriteMuvrRadioCard } from "../FavoriteMuvrRadioCard/FavoriteMuvrRadioCard";
import { MVTabs } from "../MVTabs/MVTabs";
import styles from "./MuvrBookingSteps.module.css";

export const YourMuvrsStep = ({ current, setCurrent }) => {
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [selectedHelper, setSelectedHelper] = useState(null);
  const favoriteMuversTabItems = [
    {
      key: "1",
      label: `Driver`,
      children: (
        <>
          <h2 className="fw-600">Select Driver</h2>
          <div className="mt-3">
            {requestFavoriteDriversList.map((driver) => (
              <FavoriteMuvrRadioCard
                key={driver.id}
                id={driver.id}
                name={driver.name}
                image={driver.image}
                value={driver.value}
                rating={driver.rating}
                bookings={driver.bookings}
                isSelected={selectedDriver === driver.id}
                onChange={() => setSelectedDriver(driver.id)}
              />
            ))}
          </div>
        </>
      ),
    },
    {
      key: "2",
      label: `Helper`,
      children: (
        <>
          <h2 className="fw-600">Select Helper</h2>
          <div className="mt-3">
            {requestFavoriteHelpersList.map((helper) => (
              <FavoriteMuvrRadioCard
                key={helper.id}
                id={helper.id}
                name={helper.name}
                image={helper.image}
                value={helper.value}
                rating={helper.rating}
                bookings={helper.bookings}
                isSelected={selectedHelper === helper.id}
                onChange={() => setSelectedHelper(helper.id)}
              />
            ))}
          </div>
        </>
      ),
    },
  ];
  return (
    <>
      <div className="content-full">
        <section className="main-wrapper">
          <div className={styles.discountCard}>
            <div className={styles.titleToggleWrap}>
              <h2 className="fw-600 pr-3">1 Muvr (I'll Help)</h2>
              <MVToggle />
            </div>
            <h5 className={clsx("fw-600 mt-1", styles.gradientText)}>Get up to 40% Off</h5>
            <p className="p-sm fw-400 mt-3">
              You can get up to 40% off on your booking but make sure you are ready to help other muvr
            </p>
          </div>
          <div>
            <h2 className={clsx(styles.selectMuvrTitle, "fw-600")}>Selected Muvrs</h2>
            <div className={styles.selectMuvrCard}>
              <div className={"d-flex align-center pr-2"}>
                <MVAvatar src={"https://i.pravatar.cc/300"} alt="User Name" size={44} className={"flex-0-auto"} />
                <div className="ml-2">
                  <h5 className="fw-400 mb-1">John smith</h5>
                  <h5 className="fw-400 darkgray">Driver</h5>
                </div>
              </div>
              <Link className="link link-primary fw-bold">Change</Link>
            </div>
            <div className={styles.selectMuvrCard}>
              <div className={"d-flex align-center pr-2"}>
                <MVAvatar src={"https://i.pravatar.cc/300"} alt="User Name" size={44} className={"flex-0-auto"} />
                <div className="ml-2">
                  <h5 className="fw-400 mb-1">John smith</h5>
                  <h5 className="fw-400 darkgray">Driver</h5>
                </div>
              </div>
              <div className="d-flex">
                <Link className="link link-primary fw-bold">Change</Link>
                <Link className="link link-darkgray fw-bold ml-3">{MVIcon.crossSmall}</Link>
              </div>
            </div>
            <MVButton
              variant={"secondary"}
              className="w-100 h4 fw-600 d-flex align-center justify-space-between mt-3"
              onClick={showDrawer}
            >
              Add 2nd favorite Muvr <ArrowRight2 size="20" color="#6810df" />
            </MVButton>
            <p className="p-sm fw-400 darkgray mt-2">
              If you don't want to choose someone as your 2nd Muvr, we will assign someone for you unless you select the
              1 Muvr (I'll Help) option
            </p>
          </div>
          <Drawer
            title="Drawer with extra actions"
            placement={"bottom"}
            onClose={onClose}
            open={open}
            getContainer={".App"}
            rootClassName={styles.favoriteMuvrsDrawer}
            rootStyle={{
              position: "absolute",
              zIndex: 9,
            }}
            height={"80vh"}
          >
            <h2 className="fw-600 mb-3">Favorite Muvrs</h2>
            <MVTabs
              defaultActiveTab="1"
              tabItems={favoriteMuversTabItems}
              onChange={() => console.log("Favorite muvr tab changed")}
              shape="pill"
            />
          </Drawer>
        </section>
      </div>
      <MVButton variant="primary" className={`w-100 align-self-end radius-none ${styles.stepsBtn}`} handleClick={() => setCurrent(current + 1)}>
        Next
      </MVButton>
    </>
  );
};
