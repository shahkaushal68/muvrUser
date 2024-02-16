import { MVLoader, MVTabs } from "../../../../components";
const MyBookingUpcomingTab = ({ tabItems, activeKey, handleChange, loading }) => {
  return (
    <>
      {loading ? (
        <MVLoader />
      ) : (
        <section className="main-wrapper h-100">
          {tabItems && tabItems?.length > 0 && <MVTabs defaultActiveTab={activeKey} tabItems={tabItems} onChange={handleChange} shape="pill" centered />}
        </section>
      )}
    </>
  );
};
export default MyBookingUpcomingTab;
