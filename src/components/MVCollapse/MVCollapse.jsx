import React from "react";
import { Collapse } from "antd";
import { ArrowDown2 } from "iconsax-react";
import { clsx } from "clsx";
import styles from "./MVCollapse.module.css";

const { Panel } = Collapse;
export const MVCollapse = ({
  children,
  index,
  headerTitle,
  className,
  ...rest
}) => {
  return (
    <>
      <Collapse
        defaultActiveKey={"1"}
        className={clsx(styles.addItemsCollapse, className)}
        expandIconPosition={"end"}
        expandIcon={() => {
          return (
            <>
              <ArrowDown2 size="20" color="#847B8B" />
            </>
          );
        }}
        {...rest}
      >
        <Panel header={headerTitle} key={"1"}>
          {children}
        </Panel>
      </Collapse>
    </>
  );
};

export default MVCollapse;
