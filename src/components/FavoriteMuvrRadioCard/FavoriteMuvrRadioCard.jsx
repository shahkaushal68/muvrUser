import { clsx } from "clsx";
import { MVAvatar } from "../MVAvatar/MVAvatar";
import { MVIcon } from "../MVIcon/MVIcon";
import styles from "./FavoriteMuvrRadioCard.module.css"

export const FavoriteMuvrRadioCard = ({
  id,
  name,
  labelName,
  value,
  image,
  rating,
  isSelected,
  bookings,
  onChange,
}) => {
  return (
    <label htmlFor={id} className={styles.favoriteMuvrRadio}>
      <MVAvatar shape={"circle"} size={40} src={image} className="mr-2" />

      <div>
        <h4 className="mb-0" style={{ lineHeight: 1 }}>
          {labelName}
        </h4>
        <div className={styles.muvrExtraDetails}>
          <div>
            <span className={styles.muvrRating}>{MVIcon.StarFilled}</span>{" "}
            {rating}
          </div>
          <div>{bookings} Rebook</div>
        </div>
      </div>

      <div
        className={clsx([styles.muvrSelectedRadio], {
          [styles.muvrSelected]: isSelected,
        })}
      ></div>

      <input
        id={id}
        type="radio"
        name={name}
        value={value}
        onChange={onChange}
        checked={isSelected}
      />
    </label>
  );
};
