import { NotificationBing } from "iconsax-react";
import { MVAppBar, MVHeader, MVTabs } from "../../components";
import styles from "./Home.module.css";
import { useHomeHook } from "../../hooks";

const Home = () => {
  const { userDetails, homePageTabItems } = useHomeHook();

  return (
    <>
      <MVHeader>
        <div className="w-100 d-flex justify-space-between">
          <div>
            <h2 className="fw-600 mb-0">
              Hello, {userDetails?.first_name} {userDetails?.last_name}
            </h2>
            <p className="h5 mb-0 fw-400 darkgray">How can we help?</p>
          </div>
          <button className="header-btn">
            <NotificationBing
              color="var(--clr-dark)"
              variant="Bold"
              size={24}
            />
          </button>
        </div>
      </MVHeader>
      <section className="content-full">
        {/* {console.log({ homePageTabItems })} */}
        {homePageTabItems && homePageTabItems?.length > 0 && (
          <MVTabs
            defaultActiveTab={"0"}
            shape="square"
            tabItems={homePageTabItems}
            onChange={() => console.log("Home page tab changed")}
          />
        )}
      </section>
      <MVAppBar />
    </>
  );
};
export default Home;
