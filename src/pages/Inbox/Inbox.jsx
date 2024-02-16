import { SearchNormal1 } from "iconsax-react";
import { MVAppBar, MVHeader, MVTabs } from "../../components";
import { InboxMovesTab } from "./InboxMovesTab";

const Inbox = () => {
  const inboxTabItems = [
    {
      key: "1",
      label: `Moves`,
      children: <InboxMovesTab />,
    },
    {
      key: "2",
      label: `Junk Removal`,
      children: "",
    },
    {
      key: "3",
      label: `Labor`,
      children: "",
    },
  ];

  return (
    <>
      <MVHeader>
        <div className="position-relative w-100 d-flex justify-space-between">
          <div>
            <h2 className="fw-600 mb-0">Inbox</h2>
            <p className="h5 mb-0 fw-400 darkgray">Chat with your Muvrs</p>
          </div>
          <button className={"positioned-right header-btn"}>
            <SearchNormal1 variant="Linear" size={24} color="#1d1721" />
          </button>
        </div>
      </MVHeader>
      <main className="content-full">
        <MVTabs shape={"square"} tabItems={inboxTabItems} />
      </main>
      <MVAppBar />
    </>
  );
};

export default Inbox;
