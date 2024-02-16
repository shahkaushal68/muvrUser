import { GalleryEdit, GalleryExport, Profile } from "iconsax-react";
import { Link } from "react-router-dom";
import { MVAvatar, MVButton, MVHeader, MVIcon, MVTextInput, MVUploader } from "../../../../components";
import styles from "../EditProfile/EditProfile.module.css";
import { useEditProfileAccountHook } from "../../../../hooks";

const EditProfile = () => {
  const { isDisabled, validationMessages, profileData, handleFielInputChange, handleInputChange, handleEditProfileSubmit } = useEditProfileAccountHook();

  return (
    <>
      <MVHeader>
        <div className="position-relative w-100">
          <Link to={"/profile"} className={"positioned-left header-btn"}>
            {MVIcon.BackArrow}
          </Link>
          <h3 className={"text-center fw-600"}>Edit Profile</h3>
        </div>
      </MVHeader>
      <section className={"content-full pl-4 pr-4"}>
        <div className={`${styles.profileHeader} text-center`}>
          <MVUploader
            className={styles.editProfileImgUploader}
            multiple={false}
            name={"profile_image"}
            id={"image"}
            onChange={(event) => handleFielInputChange(event)}
            icon={<GalleryExport size="24" color="var(--accent-primary)" variant="Bold" />}
            title={"Upload image of item"}
            previewImage={profileData?.profile_image?.includes("http") ? profileData?.profile_image : profileData?.baseImage}
          />
          {/* <MVAvatar src={profileData?.profile_image} alt="Placeholder image" className={styles.ctmAvtar} /> */}
        </div>
        <div className={styles.profileContent}>
          <div className={"mb-3"}>
            <MVTextInput
              label={"First Name"}
              name={"first_name"}
              id={"firstName"}
              prefix={<Profile color="var(--clr-gray)" variant="Bold" size={24} />}
              placeholder={"Enter first name"}
              rootClassName={"mb-2"}
              value={profileData?.first_name}
              handleChange={handleInputChange}
              errorMessage={validationMessages?.first_name}
            />
          </div>
          <div className="">
            <MVTextInput
              label={"Last Name"}
              name={"last_name"}
              id={"lastName"}
              prefix={<Profile color="var(--clr-gray)" variant="Bold" size={24} />}
              placeholder={"Enter last name"}
              rootClassName={"mb-2"}
              value={profileData?.last_name}
              handleChange={(event) => handleInputChange(event)}
              errorMessage={validationMessages?.last_name}
            />
          </div>
        </div>
        <div className={"card-btn w-100"}>
          <MVButton variant={"primary"} size="medium" className={"w-100"} handleClick={() => handleEditProfileSubmit()} disabled={isDisabled}>
            Save
          </MVButton>
        </div>
      </section>
    </>
  );
};

export default EditProfile;
