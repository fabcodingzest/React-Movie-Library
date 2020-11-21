import React from "react";
import Stars from "react-rating";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as star } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
function Rating({ number }) {
  return (
    <Stars
      emptySymbol={<FontAwesomeIcon icon={star} />}
      fullSymbol={<FontAwesomeIcon icon={faStar} />}
      initialRating={number / 2}
      readonly
    />
  );
}

export default Rating;
