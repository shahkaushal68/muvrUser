import clsx from "clsx";
import { Image, InputNumber, Select, Space } from "antd";
import { useCountries } from "use-react-countries";
import styles from "./MVPhoneInput.module.css";
import { ArrowDown2 } from "iconsax-react";

const { Option } = Select;

export const MVPhoneInput = ({
  id,
  value,
  label,
  selectClassName,
  rootClassName,
  labelClassName,
  disabled,
  errorMessage,
  selectedCountry = "+1",
  handleChangeSelect,
  ...rest
}) => {
  const { countries } = useCountries();

  const countryList = (
    <Select
      defaultValue={selectedCountry}
      listItemHeight={30}
      listHeight={200}
      className={clsx(styles.countrySelect, selectClassName)}
      popupMatchSelectWidth={210}
      popupClassName={styles.countrySelectPopup}
      onChange={(code) => handleChangeSelect(code)}
      disabled={disabled}
      suffixIcon={<ArrowDown2 size={14} color="var(--clr-dark)" />}
    >
      {countries.map(({ name, flags, countryCallingCode }, index) => (
        <Option value={countryCallingCode} key={index}>
          <Space className="align-items-center">
            <Image
              src={flags.svg}
              alt={name}
              width={20}
              height={20}
              preview={false}
              className={styles.flag}
            />
            <div className={styles.countryCode}>{countryCallingCode}</div>
            <div className={styles.countryName}>{name}</div>
          </Space>
        </Option>
      ))}
    </Select>
  );

  return (
    <div
      className={clsx(rootClassName, {
        "position-relative": label,
        [styles.hasLabel]: label,
        [styles.isDisabled]: disabled,
      })}
    >
      {label && (
        <label htmlFor={id} className={clsx(labelClassName, styles.label)}>
          {label}
        </label>
      )}
      <InputNumber
        id={id}
        min={0}
        max={999999999999999}
        type={"number"}
        prefix={selectedCountry}
        addonBefore={countryList}
        className={clsx(styles.phoneInput)}
        disabled={disabled}
        value={value}
        onKeyDown={(event) => {
          if (
            event.key === "ArrowUp" ||
            event.key === "ArrowDown" ||
            event.key === "e" ||
            event.key === "E" ||
            event.key === "+" ||
            event.key === "-"
          ) {
            event.preventDefault();
            return false;
          } else if (event?.key === ".") {
            if (!props?.isDecimal) {
              event.preventDefault();
              return false;
            }
            const { value } = event?.target;
            if (value.length === 0) {
              event.preventDefault();
              return false;
            }
          }
        }}
        {...rest}
      />
      {errorMessage && <span className="error-message">{errorMessage}</span>}
    </div>
  );
};
