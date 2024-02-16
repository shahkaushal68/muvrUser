import { MVButton, MVIcon, MVSelect, MVTextInput } from "../../../components";
import { Link, useLocation } from "react-router-dom";
import { clsx } from "clsx";
import map from "../../../assets/images/covers/map.jpg";
import { Row, Col } from "antd";
import styles from "./LocationNotAvailable.module.css";
import { useLocationNotAvailable } from "../../../hooks";
import { Airpods, SearchNormal1 } from "iconsax-react";

const LocationNotAvailable = () => {
  const { loading, errorMessage, zipCode, selectedCountry, selectedState, selectedCity, onHandleOnSearchZipCode, onHandleChangeZipCode, handleOnClickBringMuvr } =
    useLocationNotAvailable();
  const location = useLocation();
  return (
    <>
      <section className="main-wrapper">
        <div className={clsx(styles.backArrow)}>
          <Link to={location?.state?.isBooingId ? `/booking-steps?bookingId=${location?.state?.bookingId}` : -1} className={"positioned-left header-btn"}>
            {MVIcon.BackArrow}
          </Link>
        </div>
      </section>
      <section className={clsx("content-full")}>
        <div className={styles.mapImg}>
          <span className={styles.locationIcon}>{MVIcon.locationIconBig}</span>
          <img src={map} alt="map" width={"100%"} height={"100%"} />
        </div>
        <h2 className="text-center fw-600 mt-2">Oops</h2>
        <p className="p-sm fw-400 darkgray mt-2 text-center">
          We apologize, but we are currently not operating in your area. Please enter your details below and we will notify you as soon as our services become available
        </p>
        <Row gutter={[15, 12]} className={styles.inputWraps}>
          <Col span={24} sm={12}>
            <MVTextInput
              type="number"
              value={zipCode}
              handleChange={onHandleChangeZipCode}
              label={"Zip code"}
              placeholder={"Enter Zip code"}
              className={styles.zipCodeInput}
              suffix={
                <MVButton handleClick={onHandleOnSearchZipCode} variant={"none"} className="link link-primary">
                  <SearchNormal1 size="16" color="var(--accent-primary)" />
                </MVButton>
              }
            />

            {Object.keys(errorMessage).length > 0 && errorMessage && <span className="error-message">{errorMessage?.zipCode}</span>}
            {loading ? <p style={{ color: "red" }}>Loading....</p> : ""}
          </Col>
          <Col span={24} sm={12}>
            <MVSelect
              // defaultValue={selectedData?.city !== undefined ? matchCityLabel : "Select City"}
              placeholder={"Select City"}
              value={selectedCity?.length > 0 && selectedCity[0]?.name}
              showSearch
              optionFilterProp="children"
              filterOption={(input, option) => {
                return option.label?.toLowerCase().indexOf(input?.toLowerCase()) >= 0;
              }}
              label="Enter City"
            //options={allCityBasedOnState}
            // handleChange={(value, name) => onHandleChangeFetchData(value, name = "city")}
            />
          </Col>
          <Col span={24} sm={12}>
            <MVSelect
              label="Enter State/Province"
              value={selectedState?.length > 0 && selectedState[0]?.name}
              showSearch
              optionFilterProp="children"
              filterOption={(input, option) => {
                return option.label?.toLowerCase().indexOf(input?.toLowerCase()) >= 0;
              }}
            //options={allStateBasedOnCountry}
            //handleChange={(value, name) => onHandleChangeFetchData(value, name = "state")}
            />
          </Col>
          <Col span={24} sm={12}>
            <MVSelect
              label="Enter Country"
              value={selectedCountry?.length > 0 && selectedCountry[0]?.name}
              showSearch
              optionFilterProp="children"
              filterOption={(input, option) => {
                return option.label?.toLowerCase().indexOf(input?.toLowerCase()) >= 0;
              }}
            //options={countryOptions}
            //handleChange={(value, name) => onHandleChangeFetchData(value, name = "country")}
            />
          </Col>
        </Row>
        <div className={styles.mvButtonNL}>
          <MVButton handleClick={handleOnClickBringMuvr} className={"w-100"} variant={"primary"}>
            Bring Muvr to my hometown
          </MVButton>
        </div>
      </section>
    </>
  );
};
export default LocationNotAvailable;
