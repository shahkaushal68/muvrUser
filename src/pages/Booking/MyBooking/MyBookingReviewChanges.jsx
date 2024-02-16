import { Link } from "react-router-dom";
import { MVCollapse, MVHeader, MVIcon } from "../../../components";
import styles from "./MyBooking.module.css";
import { Box, Box1, Calendar, Location, Receipt2, Truck } from "iconsax-react";
import clsx from "clsx";
import {
  reviewChangesDisassemblyData,
  reviewChangesDonateItemData,
  reviewChangesFlightOfStairsData,
  reviewChangesImageData,
  reviewChangesInnerItemsData,
  reviewChangesItemsData,
  reviewChangesLocationsData,
  reviewChangesPickupTypeData,
  reviewChangesRescheduleData,
  reviewChangesVehicleData,
} from "../../../constants/data";
import { Image } from "antd";
const MyBookingReviewChanges = () => {
  return (
    <>
      <MVHeader>
        <div className="position-relative w-100 d-flex align-center">
          <Link to="/booking-edit" className={"header-btn"}>
            {MVIcon.BackArrow}
          </Link>
          <div className="pl-2 pr-8 d-flex mx-auto">
            <h3 className="fw-500">Review changes</h3>
          </div>
        </div>
      </MVHeader>
      <section className="main-wrapper main-wrapper-scroll d-flex flex-column">
        <div className="rounded-detail-box mb-0">
          <div className="d-flex align-center mb-3">
            <div className="pr-1 d-flex align-center">
              <Receipt2
                size="24"
                fill="currentColor"
                variant="Bold"
                className="violet"
              />
              <h2 className="dark fw-600 mb-0 ml-1">Total bill</h2>
            </div>
            <div className="ml-auto flex-0-auto">
              <h2 className="fw-600 mb-0 green">+$115</h2>
            </div>
          </div>
          <p className="fw-400 mb-0 darkgray">
            You need to pay this additional amount to confirm your edited order.
          </p>
        </div>
        <div className={clsx(styles.addItemsCollapseWrap)}>
          <MVCollapse
            headerTitle={
              <div className="d-flex align-center w-100">
                <Location
                  size="24"
                  fill="currentColor"
                  variant="Bold"
                  className="violet"
                />
                <span className="pl-1">Locations</span>
              </div>
            }
            className={styles.Collapsemy}
          >
            <>
              <h2
                className={clsx(
                  styles.reviewChangesExtraHeadText,
                  "fw-600 mb-0 green ml-auto extra-head-text-collapse"
                )}
              >
                +$35
              </h2>
              <div className={clsx(styles.addedItemsContainer)}>
                {reviewChangesLocationsData.map((item, index) => (
                  <div
                    className={clsx(styles.itemWithCounterWrap, "d-block")}
                    key={index}
                  >
                    <h5 className="darkgray fw-500 text-uppercase mb-3">
                      {item.locationTitle}
                    </h5>
                    <div className="w-100 pb-3">
                      <h6 className="darkgray fw-400 mb-0">
                        {item.pickupLocation}
                      </h6>
                      <h5 className="fw-500 dark">{item.pickupAddress}</h5>
                    </div>
                    <div className="w-100 pb-3">
                      <h6 className="darkgray fw-400 mb-0">
                        {item.dropOffLocation}
                      </h6>
                      <h5 className="fw-500 dark">{item.dropOffAddress}</h5>
                    </div>
                    <div className="w-100 pb-0 d-flex align-center">
                      <h6 className="darkgray fw-400 mb-0">{item.miles}</h6>
                      <b className="points-dot mx-2"></b>
                      <h4 className="green w-500 mb-0">{item.price}</h4>
                    </div>
                  </div>
                ))}
              </div>
            </>
          </MVCollapse>
        </div>
        <div className={clsx(styles.addItemsCollapseWrap)}>
          <MVCollapse
            headerTitle={
              <div className="d-flex align-center w-100">
                <Box1
                  size="24"
                  fill="currentColor"
                  variant="Bold"
                  className="violet"
                />
                <span className="pl-1">Items</span>
              </div>
            }
            className={styles.Collapsemy}
          >
            <>
              <h2
                className={clsx(
                  styles.reviewChangesExtraHeadText,
                  "fw-600 mb-0 green ml-auto extra-head-text-collapse"
                )}
              >
                +$35
              </h2>
              <div className={clsx(styles.addedItemsContainer)}>
                {reviewChangesItemsData.map((item, index) => (
                  <div
                    className={clsx(styles.itemWithCounterWrap, "d-block")}
                    key={index}
                  >
                    <h5 className="darkgray fw-500 text-uppercase mb-3">
                      {item.itemTitle}
                    </h5>
                    {item.subItemsData.map((innerItem, index) => (
                      <div className="w-100 pb-3" key={index}>
                        <h6 className="darkgray fw-400 mb-0">
                          {innerItem.itemCountity_one}
                        </h6>
                        <h5 className="fw-500 dark">
                          {innerItem.itemLabel_one}
                        </h5>
                      </div>
                    ))}
                    <div className="w-100 pb-0 d-flex align-center">
                      <h6 className="darkgray fw-400 mb-0">{item.itemMiles}</h6>
                      <b className="points-dot mx-2"></b>
                      <h4 className="green w-500 mb-0">{item.itemPrice}</h4>
                    </div>
                  </div>
                ))}
              </div>
            </>
          </MVCollapse>
        </div>
        <div className={clsx(styles.addItemsCollapseWrap)}>
          <MVCollapse
            headerTitle={
              <div className="d-flex align-center w-100">
                <Box
                  size="24"
                  fill="currentColor"
                  variant="Bold"
                  className="violet"
                />
                <span className="pl-1">Pick up type</span>
              </div>
            }
            className={styles.Collapsemy}
          >
            <>
              <h2
                className={clsx(
                  styles.reviewChangesExtraHeadText,
                  "fw-600 mb-0 green ml-auto extra-head-text-collapse"
                )}
              >
                -$10
              </h2>
              <div className={clsx(styles.addedItemsContainer)}>
                {reviewChangesPickupTypeData.map((item, index) => (
                  <>
                    <div
                      className={clsx(styles.itemWithCounterWrap, "d-block")}
                      key={index}
                    >
                      <h5 className="darkgray fw-500 text-uppercase mb-3">
                        {item.pickupTypeTitle}
                      </h5>
                      <div className="w-100 pb-3">
                        <h5 className="fw-500 dark">{item.pickupTypeName}</h5>
                      </div>
                    </div>
                  </>
                ))}
                <h4 className="green w-500 mb-0 d-flex align-center">
                  $10{" "}
                  <span className="darkgray fw-400 p-sm pl-1">Discount</span>
                </h4>
              </div>
            </>
          </MVCollapse>
        </div>
        <div className={clsx(styles.addItemsCollapseWrap)}>
          <MVCollapse
            headerTitle={
              <div className="d-flex align-center w-100">
                <div className="violet">{MVIcon.stairsIcon}</div>
                <span className="pl-1">Flights of stairs</span>
              </div>
            }
            className={styles.Collapsemy}
          >
            <>
              <h2
                className={clsx(
                  styles.reviewChangesExtraHeadText,
                  "fw-600 mb-0 green ml-auto extra-head-text-collapse"
                )}
              >
                +$40
              </h2>
              <div className={clsx(styles.addedItemsContainer)}>
                {reviewChangesFlightOfStairsData.map((item, index) => (
                  <div
                    className={clsx(styles.itemWithCounterWrap, "d-block")}
                    key={index}
                  >
                    <h5 className="darkgray fw-500 text-uppercase mb-3">
                      {item.flightOfStairsTitle}
                    </h5>
                    <div className="w-100 pb-3">
                      <h5 className="fw-500 dark">{item.flightOfStairsName}</h5>
                    </div>
                  </div>
                ))}
                <span className="w-100 pb-0 d-flex align-center">
                  <h6 className="darkgray fw-400 mb-0">$20 × 2</h6>
                  <b className="points-dot mx-2"></b>
                  <h4 className="green w-500 mb-0">$40</h4>
                </span>
              </div>
            </>
          </MVCollapse>
        </div>
        <div className={clsx(styles.addItemsCollapseWrap)}>
          <MVCollapse
            headerTitle={
              <div className="d-flex align-center w-100">
                <div className="violet">{MVIcon.disassemblyIcon}</div>
                <span className="pl-1">Item disassembly</span>
              </div>
            }
            className={styles.Collapsemy}
          >
            <>
              <h2
                className={clsx(
                  styles.reviewChangesExtraHeadText,
                  "fw-600 mb-0 green ml-auto extra-head-text-collapse"
                )}
              >
                +$15
              </h2>
              <div className={clsx(styles.addedItemsContainer)}>
                {reviewChangesDisassemblyData.map((item, index) => (
                  <div
                    className={clsx(styles.itemWithCounterWrap, "d-block")}
                    key={index}
                  >
                    <h5 className="darkgray fw-500 text-uppercase mb-3">
                      {item.disassemblyTitle}
                    </h5>
                    {item.isNotAdded ? (
                      <>
                        <h5 className="fw-500 dark">Not added</h5>
                      </>
                    ) : (
                      <>
                        <div className="w-100 pb-3">
                          <h6 className="darkgray fw-400 mb-0">
                            {item.disassemblyItem}
                          </h6>
                          <h5 className="fw-500 dark">
                            {item.disassemblyName}
                          </h5>
                        </div>
                      </>
                    )}
                  </div>
                ))}
                <span className="w-100 pb-0 d-flex align-center">
                  <h6 className="darkgray fw-400 mb-0">1 Item</h6>
                  <b className="points-dot mx-2"></b>
                  <h4 className="green w-500 mb-0">$15</h4>
                </span>
              </div>
            </>
          </MVCollapse>
        </div>
        <div className={clsx(styles.addItemsCollapseWrap)}>
          <MVCollapse
            headerTitle={
              <div className="d-flex align-center w-100">
                <div className="violet">{MVIcon.donateIcon}</div>
                <span className="pl-1">Donate your items?</span>
              </div>
            }
            className={styles.Collapsemy}
          >
            <>
              <div className={clsx(styles.addedItemsContainer)}>
                {reviewChangesDonateItemData.map((item, index) => (
                  <div
                    className={clsx(styles.itemWithCounterWrap, "d-block")}
                    key={index}
                  >
                    <h5 className="darkgray fw-500 text-uppercase mb-3">
                      {item.donateItemTitle}
                    </h5>
                    {item.isNoDonate ? (
                      <>
                        <h5 className="fw-500 dark">No</h5>
                      </>
                    ) : (
                      <>
                        <div className="w-100 pb-3">
                          <h5 className="fw-500 dark">{item.donateItemName}</h5>
                          <h6 className="darkgray fw-400 mb-0">
                            {item.donateItemItem}
                          </h6>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </>
          </MVCollapse>
        </div>
        <div className={clsx(styles.addItemsCollapseWrap)}>
          <MVCollapse
            headerTitle={
              <div className="d-flex align-center w-100">
                <Truck
                  size="24"
                  fill="currentColor"
                  variant="Bold"
                  className="violet"
                />
                <span className="pl-1">Vehicle</span>
              </div>
            }
            className={styles.Collapsemy}
          >
            <>
              <h2
                className={clsx(
                  styles.reviewChangesExtraHeadText,
                  "fw-600 mb-0 green ml-auto extra-head-text-collapse"
                )}
              >
                +$50
              </h2>
              <div className={clsx(styles.addedItemsContainer)}>
                {reviewChangesVehicleData.map((item, index) => (
                  <div
                    className={clsx(styles.itemWithCounterWrap, "d-block")}
                    key={index}
                  >
                    <h5 className="darkgray fw-500 text-uppercase mb-3">
                      {item.vehicleTitle}
                    </h5>
                    <div className="w-100 pb-3">
                      <h5 className="fw-500 dark">{item.vehicleName}</h5>
                    </div>
                    <div className="w-100 pb-0 d-flex align-center">
                      <h6 className="darkgray fw-400 mb-0">Base fare</h6>
                      <b className="points-dot mx-2"></b>
                      <h4 className="green w-500 mb-0">{item.price}</h4>
                    </div>
                  </div>
                ))}
              </div>
            </>
          </MVCollapse>
        </div>
        <div className={clsx(styles.addItemsCollapseWrap)}>
          <MVCollapse
            headerTitle={
              <div className="d-flex align-center w-100">
                <Calendar
                  size="24"
                  fill="currentColor"
                  variant="Bold"
                  className="violet"
                />
                <span className="pl-1">Reschedule</span>
              </div>
            }
            className={styles.Collapsemy}
          >
            <>
              <div className={clsx(styles.addedItemsContainer)}>
                {reviewChangesRescheduleData.map((item, index) => (
                  <div
                    className={clsx(styles.itemWithCounterWrap, "d-block")}
                    key={index}
                  >
                    <h5 className="darkgray fw-500 text-uppercase mb-3">
                      {item.rescheduleTitle}
                    </h5>
                    <div className="w-100 pb-3">
                      <h5 className="fw-500 dark">{item.rescheduleDateTime}</h5>
                    </div>
                  </div>
                ))}
              </div>
            </>
          </MVCollapse>
        </div>
        <div className={clsx(styles.addItemsCollapseWrap)}>
          <MVCollapse
            headerTitle={
              <div className="d-flex align-center w-100">
                <Calendar
                  size="24"
                  fill="currentColor"
                  variant="Bold"
                  className="violet"
                />
                <span className="pl-1">Instruction & Images</span>
              </div>
            }
            className={styles.Collapsemy}
          >
            <>
              <div className={clsx(styles.addedItemsContainer)}>
                <div className={clsx(styles.itemWithCounterWrap, "d-block")}>
                  <h5 className="darkgray fw-500 text-uppercase mb-3">
                    Images
                  </h5>
                  <div className="d-grid item-image-wrap-grid">
                    {reviewChangesImageData.map((item, index) => (
                      <div className="item-image-wrap-col" key={index}>
                        <Image
                          src={item.itemImage}
                          alt="Muvr item image"
                        ></Image>
                      </div>
                    ))}
                  </div>
                </div>
                <div className={clsx(styles.itemWithCounterWrap, "d-block")}>
                  <h5 className="darkgray fw-500 text-uppercase mb-3">
                    Instructions
                  </h5>
                  <ul className="pl-4">
                    <li className="fw-500 dark py-0">Gate code: 5676</li>
                    <li className="fw-500 dark py-0">Parking: Road parking</li>
                    <li className="fw-500 dark py-0">Elevator: On east side</li>
                    <li className="fw-500 dark py-0">Elevator: On east side</li>
                  </ul>
                </div>
                <div className={clsx(styles.itemWithCounterWrap, "d-block")}>
                  <h5 className="darkgray fw-500 text-uppercase mb-3">
                    Work description
                  </h5>
                  <h5 className="fw-500 dark mb-0">
                    First thing we'll need to do is pack up all the boxes in
                    this room and label them according to which room they'll go
                    in at the new place. We'll also need to disassemble any
                    large furniture that won't fit through the doorways or up
                    the stairs. Once everything is packed up, we'll load it into
                    the truck and head over to the new place. It's a third-floor
                    apartment, so we'll need to be careful going up the stairs
                    with the heavier items. When we get there, we'll unload
                    everything and start unpacking in each room. Let me know if
                    you have any questions, and we'll work together to get it
                    done as efficiently and safely as possible.
                  </h5>
                </div>
              </div>
            </>
          </MVCollapse>
        </div>
      </section>
    </>
  );
};
export default MyBookingReviewChanges;
