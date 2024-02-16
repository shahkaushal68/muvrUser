import { Space } from "antd";
import { Airpods, Edit2, SearchNormal1 } from "iconsax-react";
import { MVButton } from "../../components/MVButton/MVButton";
import { MVCheckbox } from "../../components/MVCheckbox/MVCheckbox";
import {
  MVPasswordInput,
  MVTextArea,
  MVTextInput,
} from "../../components/MVInput/MVInput";
import { MVSelect } from "../../components/MVSelect/MVSelect";
import { MVAvatar } from "../../components/MVAvatar/MVAvatar";
import { MVPhoneInput } from "../../components/MVPhoneInput/MVPhoneInput";
import { MVDropdown } from "../../components/MVDropdown/MVDropdown";
import { MVModal } from "../../components/MVModal/MVModal";
import {
  boxTypeOptions,
  styleGuideDropdownItems,
  styleguideSelectOptions,
} from "../../constants/data";
import { MVTooltip } from "../../components/MVTooltip/MVTooltip";
import { Link } from "react-router-dom";
import { useState } from "react";
import OpenBox from "../../assets/images/icons/open-box.svg";
import MVRadioBtn from "../../components/MVRadioBtn/MVRadioBtn";
import { MVToggle } from "../../components/MVToggle/MVToggle";
import signBoard from "../../assets/images/icons/exclamation-sign-board.svg";
import styles from "./Styleguide.module.css";
import clsx from "clsx";

const Styleguide = () => {
  const options = [
    { label: "Apple", value: "Apple" },
    { label: "Pear", value: "Pear" },
    { label: "Orange", value: "Orange" },
  ];
  const requestOptions = [
    {
      label: "I'm happy to wait as long as necessary for their response.",
      value: "I'm happy to wait as long as necessary for their response.",
    },
    {
      label: "Continue with any Muvr",
      value: "Continue with any Muvr",
    },
    {
      label: "Cancel my booking",
      value: "Cancel my booking",
    },
  ];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTypeOfBoxesModalOpen, setIsTypeOfBoxesModalOpen] = useState(false);
  const [isTypeItemModalOpen, setIsTypeItemModalOpen] = useState(false);
  const [isPriceSummaryModalOpen, setIsPriceSummaryModalOpen] = useState(false);
  const [isRequestFavoriteMuvrModalOpen, setIsRequestFavoriteMuvrModalOpen] =
    useState(false);
  const [isNotRegisteredModalOpen, setIsNotRegisteredModalOpen] =
    useState(false);
  return (
    <>
      <div>
        <Space className="flex-column align-start">
          {/* Buttons start */}
          <h2>Buttons</h2>
          <Space className="d-flex flex-wrap">
            <MVButton variant={"primary"}>Primary Button</MVButton>
            <MVButton variant={"secondary"}>Secondary Button</MVButton>
            <MVButton variant={"flush"}>Flush Button</MVButton>
            <MVButton variant={"primary"} disabled>
              Primary Button Disabled
            </MVButton>
            <MVButton variant={"secondary"} disabled>
              Secondary Button Disabled
            </MVButton>
            <MVButton variant={"flush"} disabled>
              Flush Button Disabled
            </MVButton>
            <MVButton variant={"success"}>Success</MVButton>
            <MVButton variant={"cancel"}>Reject</MVButton>
            <MVButton variant={"primary"} size="medium">
              Button Medium
            </MVButton>
            <MVButton variant={"primary"} size="large">
              Button Large
            </MVButton>
          </Space>
          {/* Buttons end */}
          {/* Checkbox start */}
          <h2>Checkbox</h2>
          <Space className="d-flex flex-wrap">
            <MVCheckbox>Hello</MVCheckbox>
            <MVCheckbox disabled />
          </Space>
          {/* Checkbox end */}
          {/* Text Input start */}
          <h2>Text Input</h2>
          <Space className="d-flex flex-wrap">
            <MVTextInput placeholder={"No Prefix, No Label"} />
            <MVTextInput label={"Name"} placeholder={"No Prefix"} />
            <MVTextInput
              prefix={<Airpods size="24" color="#FF8A65" />}
              placeholder={"No Label"}
              suffix={<Airpods color="#000000" />}
            />
            <MVTextInput
              label={"Name"}
              prefix={<Airpods size="24" color="#FF8A65" />}
              placeholder={"Enter Text..."}
            />
            <MVTextInput
              label={"Name"}
              prefix={<Airpods size="24" color="#FF8A65" />}
              placeholder={"Enter Text..."}
            />
            <MVTextInput
              label={"Disable"}
              prefix={<Airpods size="24" color="#FF8A65" />}
              placeholder={"Disabled"}
              disabled
            />
            <MVTextInput label={"Disable"} placeholder={"Disabled"} disabled />
          </Space>
          {/* Text Input end */}
          {/* Select start */}
          <h2>Select</h2>
          <Space className="d-flex flex-wrap">
            <MVSelect
              id={"noLabelNoPrefix"}
              defaultValue={"No Label, No Prefix"}
              options={styleguideSelectOptions}
            />

            <MVSelect
              id={"noLabel"}
              defaultValue={"No Label"}
              prefix={<Airpods size={24} color="var(--accent-primary)" />}
              options={styleguideSelectOptions}
            />

            <MVSelect
              id={"noPrefix"}
              defaultValue={"No Prefix"}
              label="No Prefix"
              options={styleguideSelectOptions}
            />

            <MVSelect
              id={"mv-select"}
              defaultValue={"Select Service"}
              label="Service Type Service Type"
              prefix={<Airpods size={24} color="var(--accent-primary)" />}
              options={styleguideSelectOptions}
            />

            <MVSelect
              id={"disabled-mv-select"}
              defaultValue={"Select Service"}
              label="Service Type"
              prefix={<Airpods size={24} color="var(--accent-primary)" />}
              options={styleguideSelectOptions}
              disabled
            />
          </Space>
          {/* Select end */}
          {/* Avatar start */}
          <h2>Avatar</h2>
          <Space>
            <MVAvatar
              size={{
                xs: 24,
                sm: 32,
                md: 40,
                lg: 64,
                xl: 80,
                xxl: 200,
              }}
              icon={<Airpods color="var(--accent-primary)" size={30} />}
            />
            <MVAvatar
              src={"https://i.pravatar.cc/300"}
              alt="Placeholder image"
            />
            <MVAvatar className={"custom-icon"} text={"RP"} />
            <MVAvatar shape="square" className={"custom-icon"} text={"RP"} />
          </Space>
          {/* Avatar end */}
          {/* Phone Number input start */}
          <h2>Phone Number input</h2>
          <Space className="d-flex flex-wrap">
            <MVPhoneInput value="123-456-789" />
            <MVPhoneInput label={"With label"} placeholder="000-000-000" />
            <MVPhoneInput placeholder="000-000-000" />
            <MVPhoneInput placeholder="000-000-000" />
            <MVPhoneInput disabled />
          </Space>
          {/* Phone Number input end */}
          {/* Password Input start */}
          <h2>Password Input</h2>
          <Space className="d-flex flex-wrap">
            <MVPasswordInput prefix={<Airpods />} />
            <MVPasswordInput prefix={<Airpods />} disabled />
          </Space>
          {/* Password Input end */}
          {/* Icon Buttons and Links start */}
          <h2>Icon Buttons and Links</h2>
          <Space className="d-flex flex-wrap">
            <MVButton variant={"none"} className="link link-primary">
              <Airpods color="currentColor" size={30} />
            </MVButton>
            <MVButton variant={"none"} className="link link-darkgray">
              <Airpods color="currentColor" size={30} />
            </MVButton>
            <MVButton variant={"none"} className="link link-darkgray" disabled>
              <Airpods color="currentColor" size={30} />
            </MVButton>
            <Link className="link link-primary fw-bold">Primary Link</Link>
            <Link className="link link-darkgray fw-bold">Darkgray Link</Link>
          </Space>
          {/* Icon Buttons and Links end */}
          {/* Dropdowns start */}
          <h2>Dropdowns</h2>
          <Space className="d-flex justify-center">
            <MVDropdown
              items={styleGuideDropdownItems}
              selectedItems={"1"}
              prefix="Category"
            />
            <MVDropdown items={styleGuideDropdownItems} selectedItems={"2"} />
          </Space>
          {/* Dropdowns end */}
          {/* Modal start */}
          <h2>Modal</h2>
          <Space className="d-flex justify-center">
            <MVButton
              variant={"primary"}
              handleClick={() => setIsModalOpen(true)}
            >
              Open Modal
            </MVButton>
            <MVModal
              title="This is a modal title"
              open={isModalOpen}
              width={500}
              handleClose={() => setIsModalOpen(false)}
              centered
            >
              <MVTextInput
                prefix={<Airpods color="#000000" />}
                label="Modal Input"
                placeholder={"Modal Input Placeholder"}
              />

              <div className="text-center">
                <MVButton
                  handleClick={() => setIsModalOpen(false)}
                  variant="primary"
                  className={"mt-10"}
                >
                  Close Modal
                </MVButton>
              </div>
            </MVModal>
            <MVButton
              variant={"primary"}
              handleClick={() => setIsTypeOfBoxesModalOpen(true)}
            >
              Select items- What type of boxes?
            </MVButton>
            <MVModal
              title="This is a modal title"
              open={isTypeOfBoxesModalOpen}
              width={500}
              handleClose={() => setIsTypeOfBoxesModalOpen(false)}
              centered
              confirmationModal
              className={styles.typeOfBoxesModal}
            >
              <div>
                <div className={styles.openBoxBg}>
                  <div className={styles.openBox}>
                    <img src={OpenBox} alt="Box" />
                  </div>
                </div>
                <h2 className="fw- text-center mt-3 mb-4">
                  What type of boxes?
                </h2>
                <MVRadioBtn
                  options={boxTypeOptions}
                  className={styles.boxTypeRadioBtn}
                />
                <div className={styles.cancelAddBtnWrap}>
                  <MVButton
                    variant={"secondary"}
                    className="w-100"
                    handleClick={() => setIsTypeOfBoxesModalOpen(false)}
                  >
                    Cancel
                  </MVButton>
                  <MVButton variant={"primary"} className="w-100">
                    Add
                  </MVButton>
                </div>
              </div>
            </MVModal>
            <MVButton
              variant={"primary"}
              handleClick={() => setIsNotRegisteredModalOpen(true)}
            >
              Not registered
            </MVButton>
            <MVModal
              title="This is a modal title"
              open={isNotRegisteredModalOpen}
              width={500}
              handleClose={() => setIsNotRegisteredModalOpen(false)}
              centered
              confirmationModal
              className={styles.notRegisteredModal}
            >
              <div>
                <h2 className="fw-600 text-center mb-3">Not registered</h2>
                <h5 className="darkgray fw-400 mb-6 text-center">
                  You have entered a non-register mobile no, Do you want to
                  create a new account?
                </h5>
                <div className={styles.cancelAddBtnWrap}>
                  <MVButton
                    variant={"secondary"}
                    className="w-100"
                    handleClick={() => setIsNotRegisteredModalOpen(false)}
                  >
                    Not now
                  </MVButton>
                  <MVButton variant={"primary"} className="w-100">
                    Continue
                  </MVButton>
                </div>
              </div>
            </MVModal>
            <MVButton
              variant={"primary"}
              handleClick={() => setIsRequestFavoriteMuvrModalOpen(true)}
            >
              Request favorite modal
            </MVButton>
            <MVModal
              title="This is a modal title"
              open={isRequestFavoriteMuvrModalOpen}
              width={500}
              handleClose={() => setIsRequestFavoriteMuvrModalOpen(false)}
              centered
              confirmationModal
              className={styles.requestFavoriteMuvrModal}
            >
              <div>
                <div className="d-flex align-center justify-center mb-6">
                  <img src={signBoard} alt="sign board" />
                </div>
                <h4 className="fw-500 mb-5">
                  How would you like us to proceed if your favorite Muvr does
                  not accept or respond to the request within 24 hours?
                </h4>
                <MVRadioBtn
                  options={requestOptions}
                  className={styles.requestMuvrOptionsRadioBtn}
                />
                <div className={styles.cancelAddBtnWrap}>
                  <MVButton
                    variant={"secondary"}
                    className="w-100"
                    handleClick={() => setIsRequestFavoriteMuvrModalOpen(false)}
                  >
                    Not now
                  </MVButton>
                  <MVButton variant={"primary"} className="w-100">
                    Confirm
                  </MVButton>
                </div>
              </div>
            </MVModal>
            <MVButton
              variant={"primary"}
              handleClick={() => setIsTypeItemModalOpen(true)}
            >
              Select items- Type Item
            </MVButton>
            <MVModal
              title="This is a modal title"
              open={isTypeItemModalOpen}
              width={500}
              handleClose={() => setIsTypeItemModalOpen(false)}
              centered
              confirmationModal
              className={styles.priceSummaryModal}
            >
              <div>
                <h2 className="fw-600 mb-3">Final Price summary</h2>
                <div className={styles.priceSummaryContainer}>
                  <div className={styles.priceWrap}>
                    <div>
                      <h5 className="fw-400 black">Base fare</h5>
                      <h6 className="fw-400 darkgray">MuvrXL</h6>
                    </div>
                    <h5 className="fw-500 pl-1">$100.00</h5>
                  </div>
                  <div className={styles.priceWrap}>
                    <div>
                      <h5 className="fw-400 black">Miles</h5>
                      <h6 className="fw-400 darkgray">$2.5/mi × 10 mi</h6>
                    </div>
                    <h5 className="fw-500 pl-1">$25.00</h5>
                  </div>
                  <div className={styles.priceWrap}>
                    <div>
                      <h5 className="fw-400 black">
                        Bundle of 10 Large Moving Boxes (All packed up)
                      </h5>
                      <h6 className="fw-400 darkgray">$200 × 1</h6>
                    </div>
                    <h5 className="fw-500 pl-1">$200.00</h5>
                  </div>
                  <div className={styles.priceWrap}>
                    <div>
                      <h5 className="fw-400 black">Microwave</h5>
                      <h6 className="fw-400 darkgray">$30 × 2</h6>
                    </div>
                    <h5 className="fw-500 pl-1">$60.00</h5>
                  </div>
                  <div className={styles.priceWrap}>
                    <div>
                      <h5 className="fw-400 black">Flights of stairs</h5>
                      <h6 className="fw-400 darkgray">$20 × 2</h6>
                    </div>
                    <h5 className="fw-500 pl-1">$40.00</h5>
                  </div>
                  <div className={styles.priceWrap}>
                    <div>
                      <h5 className="fw-400 black">Discount</h5>
                      <h6 className="fw-400 darkgray">
                        35% Off (Only 1 Helper)
                      </h6>
                    </div>
                    <h5 className="fw-500 pl-1">-$148.75</h5>
                  </div>
                  <div className={styles.priceWrap}>
                    <div>
                      <h5 className="fw-400 black">Final amount</h5>
                    </div>
                    <h5 className="fw-600 green pl-1">$276.25</h5>
                  </div>
                </div>
              </div>
            </MVModal>
            <MVButton
              variant={"primary"}
              handleClick={() => setIsPriceSummaryModalOpen(true)}
            >
              Order details- Price summary
            </MVButton>
            <MVModal
              title="This is a modal title"
              open={isPriceSummaryModalOpen}
              width={500}
              handleClose={() => setIsPriceSummaryModalOpen(false)}
              centered
              confirmationModal
              className={styles.priceSummaryModal}
            >
              <div>
                <h2 className="fw-600 mb-3">Price summary</h2>
                <div className={styles.priceSummaryContainer}>
                  <h4 className="fw-600 mb-3">Pick up items</h4>
                  <div className={styles.priceWrap}>
                    <div>
                      <h5 className="fw-500 black mb-1">Junk removal</h5>
                      <h6 className="fw-400 darkgray">Base fare</h6>
                    </div>
                    <h5 className="fw-500 pl-1">$80.00</h5>
                  </div>
                  <div className={styles.priceWrap}>
                    <div>
                      <div className="d-flex align-center mb-1">
                        <MVButton
                          variant={"none"}
                          className={clsx(
                            "link link-primary d-flex mr-2",
                            styles.btnHeight
                          )}
                        >
                          <Edit2
                            size="16"
                            color="currentcolor"
                            variant="Bold"
                          />
                        </MVButton>{" "}
                        <h5 className="fw-500 black">Mattress</h5>
                      </div>
                      <h6 className="fw-400 darkgray">$40 × 1</h6>
                    </div>
                    <h5 className="fw-500 pl-1">$40.00</h5>
                  </div>
                  <div className={styles.priceWrap}>
                    <div>
                      <div className="d-flex align-center mb-1">
                        <MVButton
                          variant={"none"}
                          className={clsx(
                            "link link-primary d-flex mr-2",
                            styles.btnHeight
                          )}
                        >
                          <Edit2
                            size="16"
                            color="currentcolor"
                            variant="Bold"
                          />
                        </MVButton>{" "}
                        <h5 className="fw-500 black">Recliner</h5>
                      </div>
                      <h6 className="fw-400 darkgray">$40 × 3</h6>
                    </div>
                    <h5 className="fw-500 pl-1">$120.00</h5>
                  </div>
                  <div className={styles.discountWrap}>
                    <div>
                      <div className="d-flex align-center mb-1">
                        <h5 className="fw-400 black">Discount</h5>
                      </div>
                      <h6 className="fw-400 darkgray">
                        20% Off (Only 1 Helper)
                      </h6>
                    </div>
                    <h5 className="fw-500 pl-1">-$73.00</h5>
                  </div>
                  <h4 className="fw-600 mt-3">Disassembly items</h4>
                  <div className={styles.priceWrap}>
                    <div>
                      <div className="d-flex align-center mb-1">
                        <MVButton
                          variant={"none"}
                          className={clsx(
                            "link link-primary d-flex mr-2",
                            styles.btnHeight
                          )}
                        >
                          <Edit2
                            size="16"
                            color="currentcolor"
                            variant="Bold"
                          />
                        </MVButton>{" "}
                        <h5 className="fw-500 black">Mattress</h5>
                      </div>
                      <h6 className="fw-400 darkgray">$40 × 1</h6>
                    </div>
                    <h5 className="fw-500 pl-1">$40.00</h5>
                  </div>
                  <div className={styles.finalPriceWrap}>
                    <h5 className="fw-400 pr-2">Final amount</h5>
                    <h5 className="fw-600 green">$342.00</h5>
                  </div>
                </div>
              </div>
            </MVModal>
          </Space>
          {/* Modal end */}
          {/* Radio start */}
          <h2>Radio Button</h2>
          <Space className="d-flex justify-center">
            <MVRadioBtn options={options} />
          </Space>
          {/* Radio end */}
          <Space className="d-flex justify-center">
            <MVToggle />
          </Space>
          <Space className="d-flex justify-center">
            <MVTextArea
              label={"Message"}
              placeholder={"Enter message text here"}
            />
          </Space>
          <h2>tooltip</h2>
          <Space className="d-flex justify-center">
            <MVTooltip trigger={"hover"} content={<div>This is a tooltip</div>}>
              <Airpods size={40} color="red" />
            </MVTooltip>
          </Space>
        </Space>
      </div>
    </>
  );
};

export default Styleguide;
