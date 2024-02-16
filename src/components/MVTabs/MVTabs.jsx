import { Tabs } from "antd";
import clsx from "clsx";
import styles from "./MVTabs.module.css";

export const MVTabs = ({ tabItems, onChange, activeKey, className, shape, defaultActiveTab, centered, ...rest }) => {
  //console.log("activeKey--------------", activeKey);
  return (
    <Tabs
      defaultActiveKey={defaultActiveTab}
      activeKey={activeKey}
      items={tabItems}
      onChange={onChange}
      rootClassName={clsx(className, {
        [styles.squareTabs]: shape === "square",
        [styles.pillTabs]: shape === "pill",
        [styles.tabsCentered]: centered,
      })}
      {...rest}
    />
  );
};
