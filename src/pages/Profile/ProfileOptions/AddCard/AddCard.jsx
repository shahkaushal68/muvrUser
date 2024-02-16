import { Link } from "react-router-dom";
import { MVButton, MVCheckbox, MVHeader, MVIcon, MVTextInput } from "../../../../components";
import { Card, CardPos, CardTick, Profile } from "iconsax-react";
import { Col, Row } from "antd";
import styles from "../AddCard/AddCard.module.css"
import { useAddToCardHook } from "../../../../hooks/";

const AddCard = () => {
  const {
    goBack,
    cardDetails,
    handleInputChange,
    handleAddCard,
    handleDefaultCard,
    errorMessage
  } = useAddToCardHook();

  return (
    <>
      <MVHeader >
        <div className={"position-relative w-100"}>
          <Link type="button" onClick={goBack} className={"positioned-left header-btn"}>
            {MVIcon.BackArrow}
          </Link>
          <h3 className={"text-center fw-600"}>Add Card</h3>
        </div>
      </MVHeader>
      <section className={"content-full pt-6 pl-4 pr-4 pb-10 d-flex align-center justify-space-between flex-column h-100"}>
        <div className={styles.addCardContent}>
          <Row gutter={[16, 16]}>
            <Col span={24} flex>
              <MVTextInput
                name="cardHolderName"
                label={"Card Holder Name"}
                prefix={<Profile color="var(--accent-primary)" variant="Bold" size={24} />}
                placeholder={"Enter Text..."}
                handleChange={handleInputChange}
                value={cardDetails?.cardName}
              />
              {Object.keys(errorMessage).length > 0 && errorMessage && <span className="error-message">{errorMessage?.cardHolderName}</span>}
            </Col>
            <Col span={24}>
              <MVTextInput
                name="cardNumber"
                label={"Card number"}
                prefix={<Card color="var(--accent-primary)" variant="Bold" size={24} />}
                placeholder={"Enter Text..."}
                handleChange={handleInputChange}
                value={cardDetails?.cardNumber}
                maxlength="16"
              />
              {Object.keys(errorMessage).length > 0 && errorMessage && <span className="error-message">{errorMessage?.cardNumber}</span>}
            </Col>
            <Col span={12}>
              <MVTextInput
                name="expDate"
                label={"Expire Date"}
                prefix={<Card color="var(--accent-primary)" variant="Bold" size={24} />}
                placeholder={"Expire Date... 12/2023"}
                handleChange={handleInputChange}
                value={cardDetails?.expDate}
              />
              {Object.keys(errorMessage).length > 0 && errorMessage && <span className="error-message">{errorMessage?.expDate}</span>}
            </Col>
            <Col span={12}>
              <MVTextInput
                name="cvc"
                prefix={<CardTick color="var(--clr-gray)" variant="Bold" size={24} />}
                placeholder={"CVV"}
                handleChange={handleInputChange}
                value={cardDetails?.cvv}
                maxlength="4"
              />
              {Object.keys(errorMessage).length > 0 && errorMessage && <span className="error-message">{errorMessage?.cvc}</span>}
            </Col>
            <Col span={24}>
              <MVTextInput
                name="zipCode"
                prefix={MVIcon.locationClock}
                placeholder={"Zip code"}
                handleChange={handleInputChange}
                value={cardDetails?.zipCode}
              />
              {Object.keys(errorMessage).length > 0 && errorMessage && <span className="error-message">{errorMessage?.zipCode}</span>}
            </Col>
            <Col span={24}>
              <MVTextInput
                name="nickName"
                prefix={<CardPos color="var(--clr-gray)" variant="Bold" size={24} />}
                placeholder={"Nickname (optional)"}
                handleChange={handleInputChange}
                value={cardDetails?.nickName}
              />
            </Col>
            <Col span={24}>
              <MVCheckbox className="mb-4" handleChange={handleDefaultCard}>Make this default card</MVCheckbox>
            </Col>
          </Row>
        </div>
        <div className={"card-btn w-100"}>
          <MVButton variant={"primary"} size="medium" className={"w-100"} handleClick={handleAddCard}>
            Add card
          </MVButton>
        </div>
      </section>
    </>
  );
}

export default AddCard