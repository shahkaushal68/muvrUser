import { User } from "iconsax-react";
import { MVAvatar } from "../../../components";

export const MVmuvrNameCard = () => {
  // ping muvers start
  const muvrNameCard = [
    {
      profileImg: `https://i.pravatar.cc/150?img=3`,
      name: "Muvr name",
      requestTitle: "Muvr yet to be assign",
    },
  ];
  // ping muvers end
  return (
    <>
      <div className="rounded-detail-box">
        {muvrNameCard.map((item, index) => (
          <div className={"d-flex align-center w-100"} key={index}>
            <MVAvatar
              size={38}
              icon={
                <User
                  className="darkgray"
                  fill="currentColor"
                  size={20}
                  variant="Bold"
                />
              }
              className="bg-lavender"
            />
            <div className="pl-2">
              <h6 className="fw-400 mb-1 dark">{item.name}</h6>
              <p className="fw-400 mb-0 darkgray p-sm mb-0">
                {item.requestTitle}
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
