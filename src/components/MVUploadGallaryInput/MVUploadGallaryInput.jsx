import clsx from "clsx";
import { MVIcon, MVLoader } from "../../components";
import { ExportCurve } from "iconsax-react";
import styles from "./MVUploadGallaryInput.module.css";

export const MVImageUploadGallaryInput = ({
  fileList,
  handleFileInputChange,
  onClickUpload,
  deleteFile,
  className,
  loading,
}) => {
  return (
    <>
      <label htmlFor="uploadButton" className={clsx(styles.uploadButton)}>
        <input type="file" accept="image/*, video/*" id="uploadButton" multiple onChange={handleFileInputChange} />
        <ExportCurve size="24" color="var(--accent-primary)" variant="Bold" className="mr-2" />
        <p className="p-sm dark fw-500">Upload photos or video</p>
        <h5 className="accent-primary fw-500 ml-auto">Upload</h5>
      </label>
      <div className={clsx(styles.imagesGrid, "mt-3")}>
        {loading ? (
          <MVLoader />
        ) : (
          fileList &&
          fileList?.length > 0 &&
          fileList?.map((item, index) => {
            return (
              <div key={index} className={styles.gridItem}>
                <div>
                  {item?.image?.split(".")[1] === "mp4" ? (
                    <video height="100%" width="100%" controls>
                      <source src={item?.image?.includes("http") ? item?.image : item?.baseImage} />
                      Your browser does not support the video tag.
                    </video>
                  ) : (
                    <img
                      src={item?.image?.includes("http") ? item?.image : item?.baseImage}
                      alt=""
                      className="fluid w-100 h-100 obj-cover"
                    />
                  )}

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
