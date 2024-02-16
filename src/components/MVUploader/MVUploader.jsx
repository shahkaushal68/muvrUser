import clsx from "clsx";
import styles from "./MVUploader.module.css";
import { GalleryEdit } from "iconsax-react";

export const MVUploader = ({ id, title, icon, accept, description, handleChange, parentClassName, previewImage, errorMessage, multiple = false, ...rest }) => {
  return (
    <>
      <label htmlFor={id} className={clsx(parentClassName, styles.mvUploader)}>
        <input id={id} type="file" accept={accept} {...rest} />
        {previewImage ? (
          <div className={styles.uploaderPreview}>
            <img src={previewImage} height={100} alt="" className={styles.profileImg} />
            <div className={styles.imgUploaderBg}>
              <label htmlFor="image">
                <GalleryEdit size="16" color="var(--accent-primary)" variant="Bold" />
              </label>
            </div>
          </div>
        ) : (
          ""
        )}
      </label>
    </>
  );
};
