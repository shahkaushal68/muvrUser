import { Image, Progress, Radio, Rate, Select } from "antd";
import clsx from "clsx";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  MVAvatar,
  MVButton,
  MVHeader,
  MVIcon,
  MVModal,
} from "../../../../../components";
import styles from "./FavoriteMuvrProfile.module.css";
import useFavoriteMuvrProfileDetailsHook from "../../../../../hooks/profile/favoriteMuvrProfileDeatils.hook";
import moment from "moment/moment";

export const FavoriteMuvrProfile = () => {
  const {
    recentOptions,
    serviceOptions,
    muvrProfileDetail,
    fvrtMuvrModalOpen,
    reviewPercentage,
    onHandleClickBookMuvr
  } = useFavoriteMuvrProfileDetailsHook();

  // console.log("muvrProfileDetail-------------", reviewPercentage);
  // console.log("muvrProfileDetail-------------", muvrProfileDetail);
  const percentageCountOfRate = (percent, total) => {
    return ((percent) * total)
  }
  return (
    <>
      <MVHeader>
        <div className="position-relative w-100">
          <Link
            to={"/favorite-muvrs"}
            className={"positioned-left header-btn"}
          >
            {MVIcon.BackArrow}
          </Link>
          <h3 className="text-center fw-600">Favorite Muvrs</h3>
        </div>
      </MVHeader>
      <section className="main-wrapper">
        <div className="d-flex align-center justify-center mb-3">
          <MVAvatar size={120} src={muvrProfileDetail?.muvrList?.muvrs?.profile_image} />
        </div>
        <div className="d-flex align-center justify-center mb-1">
          {MVIcon.star}
          <h4 className="dark fw-500 text-center ml-1">
            {muvrProfileDetail?.muvrList?.totalRatingAvg}<span className="darkgray fw-400">({muvrProfileDetail?.muvrList?.totalRatingCount})</span>
          </h4>
        </div>
        <h3 className="fw-600 text-center mb-1">{muvrProfileDetail?.muvrList?.muvrs?.first_name + " " + muvrProfileDetail?.muvrList?.muvrs?.last_name}</h3>
        <div className="d-flex align-center justify-center flex-wrap">
          <h6 className="fw-400 darkgray">
            <span className="accent-primary">{muvrProfileDetail?.muvrList?.driverPercentage.split(".")[0]}%</span> Driver job
          </h6>
          <div className={styles.grayDot}></div>
          <h6 className="fw-400 darkgray">
            <span className="blue">{muvrProfileDetail?.muvrList?.helperPercentage.split(".")[0]}%</span> Helper job
          </h6>
        </div>
        <div className={styles.workQuantityCardWrap}>
          <div className={styles.workQuantityCard}>
            <h5 className="fw-500 text-center mb-1">{muvrProfileDetail?.muvrList?.service_list[2]?.bookingCount}</h5>
            <h6 className="fw-400 darkgray text-center">Moves</h6>
          </div>
          <div className={styles.workQuantityCard}>
            <h5 className="fw-500 text-center mb-1">{muvrProfileDetail?.muvrList?.service_list[0]?.bookingCount}</h5>
            <h6 className="fw-400 darkgray text-center">Junk removal</h6>
          </div>
          <div className={styles.workQuantityCard}>
            <h5 className="fw-500 text-center mb-1">{muvrProfileDetail?.muvrList?.service_list[1]?.bookingCount}</h5>
            <h6 className="fw-400 darkgray text-center">Labor</h6>
          </div>
        </div>
        <MVButton
          variant={"primary"}
          className="w-100"
          handleClick={() => onHandleClickBookMuvr(true)}
        >
          Book Muvr
        </MVButton>
        <div className={styles.ratingsReviewsWrap}>
          <h2 className="fw-600 mb-3">Rating & reviews</h2>
          {
            reviewPercentage?.map((reviewItem, index) => {
              return (
                <div className="d-flex align-center justify-center mb-3" key={index}>
                  {MVIcon.star}
                  <h6 className="fw-500 ml-1 mr-2">{reviewItem?.rating}</h6>
                  <Progress
                    percent={percentageCountOfRate(reviewItem?.ratingCount, muvrProfileDetail?.muvrList?.totalRatingCount)}
                    className={clsx(styles.fvrtMuvrDetailsProgress, "mb-0")}
                  />
                </div>
              )
            })
          }
        </div>
        <div className={styles.fvrtMuvrDetailsSelect}>
          <Select
            defaultValue="Recent"
            style={{
              width: 95,
            }}
            options={[
              {
                value: "Recent",
                label: "Recent",
              },
              {
                value: "option 1",
                label: "option 1",
              },
              {
                value: "option 2",
                label: "option 2",
              },
            ]}
            className={clsx(styles.fvrtMuvrSelect, "mr-2")}
            popupClassName={styles.fvrtMuvrSelectDropdown}
          />
          <Select
            defaultValue="Junk removal"
            style={{
              width: 136,
            }}
            options={[
              {
                value: "Junk removal",
                label: "Junk removal",
              },
              {
                value: "Moves",
                label: "Moves",
              },
              {
                value: "Labor",
                label: "Labor",
              },
            ]}
            className={styles.fvrtMuvrSelect}
            popupClassName={styles.fvrtMuvrSelectDropdown}
          />
        </div>
      </section>
      <section>
        {
          muvrProfileDetail?.reviewList?.length > 0 &&
          muvrProfileDetail?.reviewList?.map((reviewListItem, index) => {
            const experience = reviewListItem?.experience?.split(",");
            const inputDateTime = moment(reviewListItem?.createdAt);
            // Current date and time
            const now = moment();

            // Calculate the difference in minutes, hours, and days
            const minutesAgo = now.diff(inputDateTime, 'minutes');
            const hoursAgo = now.diff(inputDateTime, 'hours');
            const daysAgo = now.diff(inputDateTime, 'days');

            // Combine the results based on the largest unit
            let result = '';
            if (daysAgo > 0 && daysAgo < 2) {
              result = `${daysAgo} day${daysAgo > 1 ? 's' : ''} ago`;
            } else if (daysAgo > 1) {
              result = now.format("Do MMM YY")
            } else if (hoursAgo > 0) {
              result = `${hoursAgo} hour${hoursAgo > 1 ? 's' : ''} ago`;
            } else if (minutesAgo > 0) {
              result = `${minutesAgo} minute${minutesAgo > 1 ? 's' : ''} ago`;
            } else {
              result = 'Just now';
            }

            return (
              <div className="review-listing-section" key={index}>
                <div className="main-wrapper">
                  <div className="d-flex justify-space-between flex-wrap mb-3">
                    <div className="d-flex align-center">
                      <MVAvatar size={40} src={reviewListItem?.users?.profile_image} />
                      <div className="ml-2">
                        <h4 className="fw-500 mb-1">{reviewListItem?.users?.first_name + " " + reviewListItem?.users?.last_name}</h4>
                        <Rate
                          disabled
                          defaultValue={4}
                          className={styles.fvrtMuvrProfileRate}
                        />
                      </div>
                    </div>
                    <h6 className="darkgray fw-400 mb-0 pl-2">{result}</h6>
                  </div>
                  <div className="d-flex align-center mb-1">
                    {
                      experience?.map((experienceItem, experienceIndex) => {
                        return (
                          <div className={styles.qualityBadge} key={experienceIndex}>
                            <h6 className="fw-400 violet">{experienceItem}</h6>
                          </div>
                        )
                      })
                    }

                  </div>
                  <p className="p-sm fw-400">{reviewListItem?.comment}</p>
                </div>
                {
                  reviewListItem?.reviewImages?.length > 0 &&
                  (
                    <div className={styles.sectionSpaceBR}>
                      <Swiper
                        slidesPerView={4.5}
                        spaceBetween={8}
                        className={styles.workImgSlider}
                      >
                        {
                          reviewListItem?.reviewImages?.map((reviewImagesItem, reviewImagesIndex) => {
                            return (
                              <SwiperSlide>
                                <div className={clsx(styles.workImg, "fill-ant-img")} key={reviewImagesIndex}>
                                  <Image
                                    src={reviewImagesItem}
                                    alt="Lugage load in truck"
                                    className="w-100 h-100"
                                  />
                                </div>
                              </SwiperSlide>
                            )
                          })
                        }
                      </Swiper>
                    </div>
                  )
                }

              </div>
            )
          })
        }



      </section>



      <MVModal
        title="This is a modal title"
        open={fvrtMuvrModalOpen}
        width={500}
        handleClose={() => onHandleClickBookMuvr(false)}
        centered
        confirmationModal
        className={styles.fvrtMuvrModal}
      >
        <div>
          <h2 className="fw-600 mb-3">Review type</h2>
          <Radio.Group
            options={recentOptions}
            optionType="button"
            buttonStyle="solid"
            className={styles.fvrtMuvrRadio}
          />
          <div className={styles.serviceType}>
            <h2 className="fw-600 mb-3">Service type</h2>
            <Radio.Group
              options={serviceOptions}
              optionType="button"
              buttonStyle="solid"
              className={styles.fvrtMuvrRadio}
            />
          </div>
          <div className={styles.modalBtnWrap}>
            <MVButton
              variant={"secondary"}
              handleClick={() => onHandleClickBookMuvr(false)}
            >
              Cancel
            </MVButton>
            <MVButton variant={"primary"}>Apply</MVButton>
          </div>
        </div>
      </MVModal>
    </>
  );
};
export default FavoriteMuvrProfile;
