import { MVHeader, MVIcon, MVLoader, MVTabs } from "../../../../components";
import { Link } from "react-router-dom";
import styles from "./FavoriteMuvrs.module.css";
import { useFavoriteMuvrListHook } from "../../../../hooks";

const FavoriteMuvrs = () => {
  const { loading, serviceList } = useFavoriteMuvrListHook();

  return (
    <>
      <MVHeader>
        <div className="position-relative w-100">
          <Link to={"/profile"} className={"positioned-left header-btn"}>
            {MVIcon.BackArrow}
          </Link>
          <h3 className="text-center fw-600">Favorite Muvrs</h3>
        </div>
      </MVHeader>
      {loading ? (
        <MVLoader />
      ) : (
        <section className={styles.favoriteMuvrsPage}>
          <MVTabs defaultActiveTab="1" tabItems={serviceList} onChange={() => console.log("Favorite muvr tab changed")} className={"h-100"} shape="square" />
        </section>
      )}
    </>
  );
};

export default FavoriteMuvrs;
