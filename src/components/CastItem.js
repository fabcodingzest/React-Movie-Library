import React from "react";
import { Link } from "react-router-dom";
import avatar from "../assets/avatar.svg";

function CastItem({ personId, baseURL, image, name }) {
  return (
    <Link to={`${process.env.PUBLIC_URL}/person/${personId}`} className="w-32">
      <img
        className="w-full"
        src={image ? `${baseURL}w185${image}` : avatar}
        alt={name}
      />u
    </Link>
  );
}

export default CastItem;
