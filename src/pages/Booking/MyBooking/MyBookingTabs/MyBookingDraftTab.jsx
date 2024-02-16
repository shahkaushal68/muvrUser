import { MVTabs } from "../../../../components";
import { MBMovesContent } from "./MBMovesContent";
const MyBookingDraftTab = () => {
  const favoriteMuversTabItems = [
    {
      key: "1",
      label: (
        <>
          Movers<span className="pl-1">(4)</span>
        </>
      ),
      children: (
        <>
          <MBMovesContent />
        </>
      ),
    },
    {
      key: "2",
      label: (
        <>
          Junk removal<span className="pl-1">(3)</span>
        </>
      ),
      children: (
        <>
          <MBMovesContent />
        </>
      ),
    },
    {
      key: "3",
      label: (
        <>
          Labor<span className="pl-1">(3)</span>
        </>
      ),
      children: (
        <>
          <h2 className="fw-600">Select Helper</h2>
        </>
      ),
    },
  ];
  return (
    <>
      <section className="main-wrapper">
        <MVTabs
          defaultActiveTab="1"
          tabItems={favoriteMuversTabItems}
          onChange={() => console.log("Favorite muvr tab changed")}
          shape="pill"
        />
      </section>
    </>
  );
};
export default MyBookingDraftTab;
