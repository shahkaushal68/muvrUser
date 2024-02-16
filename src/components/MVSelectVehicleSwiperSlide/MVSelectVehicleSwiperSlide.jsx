import { Swiper, SwiperSlide } from "swiper/react";
import { Image } from "antd";
import clsx from "clsx";
import { Navigation, Pagination } from "swiper/modules";
import { InfoCircle } from "iconsax-react";
import truckFTImg from "../../assets/images/covers/truck-ft.png";
import styles from "./MVSelectVehicleSwiperSlide.module.css";
import "swiper/css/pagination";
import "swiper/css/navigation";
export const MVSelectVehicleSwiperSlide = () => {
  const selectVehicleSliderData = [
    {
      vechicleImg: truckFTImg,
      price: "$276.25",
      title: "MuvrXL (Cargo Van)",
    },
    {
      vechicleImg: truckFTImg,
      price: "$276.25",
      title: "MuvrXL (Cargo Van)",
    },
    {
      vechicleImg: truckFTImg,
      price: "$276.25",
      title: "MuvrXL (Cargo Van)",
    },
  ];
  return (
    <>
      <Swiper
        pagination={{
          clickable: true,
        }}
        effect={"fade"}
        navigation={true}
        modules={[Pagination, Navigation]}
        className={clsx(styles.selectVehicleSliderWraaper, "mt-6 w-100")}
      >
        {selectVehicleSliderData.map((item, index) => (
          <SwiperSlide className="text-center" key={index}>
            <div
              className={clsx(
                styles.selctVehicleImgWrap,
                "position-relative mx-auto"
              )}
            >
              <Image src={item.vechicleImg} preview={false} />
            </div>
            <div className={clsx(styles.vehicleContentWrap)}>
              <h2 className="d-flex align-center justify-center fw-600 green mb-2">
                {item.price}
                <span className="line-height-0 ml-1">
                  <InfoCircle
                    size="16"
                    className="gray"
                    variant="Bold"
                    fill="currentColor"
                  />
                </span>
              </h2>
              <h4 className="fw-500 dark mb-0">{item.title}</h4>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};
