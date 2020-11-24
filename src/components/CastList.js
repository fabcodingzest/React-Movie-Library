import { useRef, useState, useEffect } from "react";
import CastItem from "./CastItem";
import Slider from "react-slick";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";

const NextArrow = ({ onClick }) => {
  return (
    <FontAwesomeIcon
      icon={faChevronRight}
      onClick={onClick}
      className="cursor-pointer absolute h-12 top-0 -right-6 translate-y-2/4"
    />
  );
};

const PrevArrow = ({ onClick }) => {
  return (
    <FontAwesomeIcon
      icon={faChevronLeft}
      onClick={onClick}
      className="cursor-pointer absolute h-12 top-0 -left-6 translate-y-2/4"
    />
  );
};

function CastList({ baseURL, castDetails: cast }) {
  const sliderRef = useRef();
  const [totalShow, setTotalShow] = useState(null);
  const changeTotalShow = () => {
    let totalItems = Math.round(sliderRef.current.offsetWidth / 70);
    if (totalItems > cast.length) {
      totalItems = cast.length;
    }
    setTotalShow(totalItems);
  };
  useEffect(() => {
    changeTotalShow();
    window.addEventListener("resize", changeTotalShow);
    return () => window.removeEventListener("resize", changeTotalShow);
  });
  let settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    swipeToSlide: true,
    speed: 500,
    slidesToShow: totalShow,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };
  return (
    <div ref={sliderRef} className="my-8 mx-6">
      <Slider {...settings}>
        {cast.map((castMember) => {
          const { name, id, profile_path } = castMember;
          return (
            <div className="w-12" key={id}>
              <CastItem
                key={id}
                baseURL={baseURL}
                image={profile_path}
                personId={id}
                name={name}
              />
            </div>
          );
        })}
      </Slider>
    </div>
  );
}

export default CastList;
