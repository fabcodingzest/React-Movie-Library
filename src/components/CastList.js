import React from "react";
import CastItem from "./CastItem";
import Slider from "react-slick";

function CastList({ baseURL, castDetails: cast }) {
  var settings = {
    dots: false,
      infinite: true,
      autoplay: true,
      autoplaySpeed: 5000,
    swipeToSlide: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <Slider
      {...settings}
      className="flex justify-center items-center gap-2 overflow-x-auto"
    >
      {cast.map((castMember) => {
        const { name, id, profile_path } = castMember;
        return (
          <div>
            <CastItem
              baseURL={baseURL}
              image={profile_path}
              personId={id}
              name={name}
            />
          </div>
        );
      })}
    </Slider>
  );
}

export default CastList;
