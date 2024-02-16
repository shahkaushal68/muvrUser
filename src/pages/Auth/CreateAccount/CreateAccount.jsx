import { Col, Row } from "antd";
import { Sms, Location, PasswordCheck, User, SearchNormal1 } from "iconsax-react";
import muvrLogo from "../../../assets/images/logo/login-header-logo.png";
import {
  MVButton,
  MVIcon,
  MVTextInput,
  MVHeader,
  MVPhoneInput,
  MVSelect,
} from "../../../components";
import { useCreateUserProfileHook, useLocationNotAvailable } from "../../../hooks";
import styles from "../Auth.module.css";
import PlacesAutocomplete from "react-places-autocomplete";

export const CreateAccount = () => {
  const {
    isLoading,
    userData,
    validateMessages,
    handleInputChange,
    handleUserProfileSubmit,
    handlePhoneInputChange,
    handleChangeSelect,
    handleSelectAddress,
    addressLocation,
    setAddressLocation,
    addressDetails,
  } = useCreateUserProfileHook();

  const {
    loading,
    zipCode,
    selectedCountry,
    selectedState,
    selectedCity,
    onHandleChangeZipCode,
  } = useLocationNotAvailable();

  // console.log({
  //   selectedCountry,
  //   selectedState,
  //   selectedCity
  // });

  return (
    <>
      <MVHeader>
        <img
          src={muvrLogo}
          alt="Muvr"
          width={95}
          height={32}
          className="d-block obj-contain fluid mx-auto"
        />
      </MVHeader>
      <section className={`content-full ${styles.loginPageStructure}`}>
        <div className="mb-4">
          <h2 className={styles.pageTitle}>Create Account</h2>
          <h4 className={styles.pageSubTitle}>
            Enter your details to set up your account
          </h4>
          <div className={styles.loginInputWrap}>
            <Row gutter={[12, 12]}>
              <Col span={12}>
                <MVTextInput
                  label={"First name"}
                  name={"firstName"}
                  id={"firstName"}
                  value={userData?.firstName}
                  handleChange={handleInputChange}
                  prefix={
                    <User
                      size="24"
                      color="var(--accent-primary)"
                      variant="Bold"
                    />
                  }
                  placeholder={"Enter Text..."}
                  errorMessage={validateMessages?.firstName}
                />
              </Col>
              <Col span={12}>
                <MVTextInput
                  label={"Last name"}
                  name={"lastName"}
                  id={"lastName"}
                  value={userData?.lastName}
                  handleChange={handleInputChange}
                  prefix={
                    <User
                      size="24"
                      color="var(--accent-primary)"
                      variant="Bold"
                    />
                  }
                  placeholder={"Enter Text..."}
                  errorMessage={validateMessages?.lastName}
                />
              </Col>
              <Col span={24}>
                <MVTextInput
                  label={"Email address"}
                  name={"email"}
                  id={"email"}
                  value={userData?.email}
                  readOnly={userData?.loginType === "email" ? true : false}
                  handleChange={handleInputChange}
                  prefix={
                    <Sms
                      size="24"
                      color="var(--accent-primary)"
                      variant="Bold"
                    />
                  }
                  placeholder={"Enter Text..."}
                  errorMessage={validateMessages?.email}
                />
              </Col>
              <Col span={24}>
                <MVPhoneInput
                  name="phoneNumber"
                  label={"Enter phone number"}
                  placeholder="000-000-000"
                  value={userData?.phoneNumber}
                  onChange={(event) =>
                    handlePhoneInputChange(event, "phoneNumber")
                  }
                  errorMessage={validateMessages?.phoneNumber}
                  selectedCountry={userData?.phoneCode}
                  handleChangeSelect={handleChangeSelect}
                  readOnly={userData?.loginType === "phone" ? true : false}
                />
              </Col>
              <Col span={24}>
                <PlacesAutocomplete
                  value={addressLocation}
                  onChange={setAddressLocation}
                  onSelect={handleSelectAddress}
                >
                  {({
                    getInputProps,
                    suggestions,
                    getSuggestionItemProps,
                    loading,
                  }) => (
                    <div>
                      <MVTextInput
                        label={"Location"}
                        prefix={
                          <Location
                            size="24"
                            color="var(--accent-primary)"
                            variant="Bold"
                          />
                        }
                        placeholder={"Enter Location..."}
                        suffix={MVIcon.LocationIcon}
                        errorMessage={validateMessages?.address}
                        {...getInputProps({
                          // placeholder: "Pick up location",
                          className: "location-input",
                        })}
                      />
                      <div className="autocomplete-dropdown-container">
                        {loading && <div>Loading...</div>}
                        {suggestions.map((suggestion, index) => {
                          const className = suggestion.active
                            ? "suggestion-item-active"
                            : "suggestion-item";
                          return (
                            <div
                              key={index} // Add a unique key prop
                              {...getSuggestionItemProps(suggestion, {
                                className,
                              })}
                            >
                              <span>{suggestion.description}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </PlacesAutocomplete>

              </Col>
              <Row gutter={[15, 12]} className={styles.inputWraps}>
                <Col span={24} sm={12}>
                  {
                    addressDetails?.zipCode ? (
                      <MVSelect
                        placeholder={"Select ZipCode"}
                        value={addressDetails?.zipCode}
                        showSearch
                        optionFilterProp="children"
                        filterOption={(input, option) => {
                          return (
                            option.label?.toLowerCase().indexOf(input?.toLowerCase()) >= 0
                          );
                        }}
                        label="Zipcode"
                      />
                    ) : (
                      <MVTextInput
                        type="number"
                        value={zipCode}
                        handleChange={onHandleChangeZipCode}
                        label={"Zip code"}
                        placeholder={"Enter Zip code"}
                        className={styles.zipCodeInput}
                      />

                    )
                  }
                  {loading ? <p style={{ color: "red" }}>Loading....</p> : ""}
                </Col>
                <Col span={24} sm={12}>
                  <MVSelect
                    placeholder={"Select City"}
                    value={(addressDetails?.city) || (selectedCity?.length > 0 && selectedCity[0]?.name)}
                    showSearch
                    optionFilterProp="children"
                    filterOption={(input, option) => {
                      return (
                        option.label?.toLowerCase().indexOf(input?.toLowerCase()) >= 0
                      );
                    }}
                    label="Enter City"
                  />
                </Col>
                <Col span={24} sm={12}>
                  <MVSelect
                    label="Enter State/Province"
                    value={(addressDetails?.state) || (selectedState?.length > 0 && selectedState[0]?.name)}
                    showSearch
                    optionFilterProp="children"
                    filterOption={(input, option) => {
                      return (
                        option.label?.toLowerCase().indexOf(input?.toLowerCase()) >= 0
                      );
                    }}
                  />
                </Col>
                <Col span={24} sm={12}>
                  <MVSelect
                    label="Enter Country"
                    value={(addressDetails?.country) || (selectedCountry?.length > 0 && selectedCountry[0]?.name)}
                    showSearch
                    optionFilterProp="children"
                    filterOption={(input, option) => {
                      return (
                        option.label?.toLowerCase().indexOf(input?.toLowerCase()) >= 0
                      );
                    }}
                  />
                </Col>
              </Row>
              <Col span={24}>
                <MVTextInput
                  name={"referCode"}
                  id={"referCode"}
                  value={userData?.referCode}
                  handleChange={handleInputChange}
                  prefix={
                    <PasswordCheck
                      size="24"
                      color="var(--clr-gray)"
                      variant="Bold"
                    />
                  }
                  placeholder={"Refer Code (Optional)"}
                  errorMessage={validateMessages?.referCode}
                />
              </Col>
            </Row>
          </div>
        </div>

        <MVButton
          variant={"primary"}
          className={"w-100 mt-auto"}
          handleClick={() => handleUserProfileSubmit(selectedCity, zipCode)}
          isLoading={isLoading}
        >
          Create
        </MVButton>
      </section>
    </>
  );
};
export default CreateAccount;
