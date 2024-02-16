import clsx from "clsx";
import { Dropdown } from "antd";
import { useState } from "react";
import { ArrowDown2 } from "iconsax-react";
import styles from "./MVDropdown.module.css";

export function MVDropdown({
  items,
  prefix,
  selectedItems,
  handleItemSelect,
  open = false,
  trigger = "click",
  placement = "bottomLeft",
  ...rest
}) {
  const [isOpen, setIsOpen] = useState(open);
  const [selectedValue, setSelectedValue] = useState(() => {
    if (selectedItems) {
      let matchedItem = items?.find((item) => item.key === selectedItems[0]);
      return matchedItem.label;
    } else {
      return items[0]?.label;
    }
  });
  const dropdownPrefix = `${prefix}: `;

  const handleMenuItemClick = ({ domEvent }) => {
    handleItemSelect && handleItemSelect();
    setSelectedValue(domEvent.target.innerText);
    setIsOpen(false);
  };

  return (
    <Dropdown
      placement={placement}
      menu={{
        items,
        selectable: true,
        defaultSelectedKeys: selectedItems,
        onClick: handleMenuItemClick,
        className: styles.dropdownMenu,
      }}
      trigger={trigger}
      onOpenChange={(open) => setIsOpen(open)}
      {...rest}
    >
      <button
        className={clsx([styles.dropdownButton], {
          [styles.dropdownButtonActive]: isOpen,
        })}
      >
        {prefix && <span className={"darkgray"}>{dropdownPrefix}</span>}
        <span
          className={clsx([styles.dropdownButtonText], {
            [styles.noTextPrefix]: !prefix,
          })}
        >
          {selectedValue}
        </span>
        <span
          className={clsx([styles.dropdownArrow], {
            [styles.arrowRotate]: isOpen,
          })}
        >
          <ArrowDown2 size="14" color="#847b8b" />
        </span>
      </button>
    </Dropdown>
  );
}
