import clsx from "clsx";
import { MVIcon, MVLoader } from "../../components";
import { Add } from "iconsax-react";
import styles from "./MVImageUploadGallary.module.css";

export const MVImageUploadGallary = ({ fileList, handleFielInputChange, onClickUpload, deleteFile, loading }) => {
  return (
    <>
      <div className={clsx(styles.imagesGrid, "mt-3")}>
        <label htmlFor="uploadButton" className={clsx(styles.gridItem, styles.uploadButton)}>
          <div className="d-flex justify-center align-center flex-column">
            <input type="file" accept="image/*, video/*" id="uploadButton" multiple onChange={handleFielInputChange} />
            <Add size="24" color="var(--accent-primary)" />
            Add item photos
          </div>
        </label>

        {loading ? (
          <MVLoader />
        ) : (
          fileList &&
          fileList?.length > 0 &&
          fileList?.map((item, index) => {
            return (
              <div key={index} className={styles.gridItem}>
                <div>
                  {
                    item?.image?.split(".")[1] === "mp4" ? (
                      <video height="100%" width="100%" controls>
                        <source src={item?.image?.includes("http") ? item?.image : item?.baseImage} />
                        Your browser does not support the video tag.
                      </video>
                    ) :
                      (
                        <img src={item?.image?.includes("http") ? item?.image : item?.baseImage} alt="" className="fluid w-100 h-100 obj-cover" />
                      )
                  }

                  <button type="button" onClick={() => deleteFile(item)}>
                    {MVIcon.closeIcon}
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </>
  );
};
