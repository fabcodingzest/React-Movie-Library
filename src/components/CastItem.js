import React from "react";
import { Link } from "react-router-dom";
import avatar from "../assets/avatar.svg";

function CastItem({ personId, baseURL, image, name }) {
  return (
    <div className="h-full flex justify-center items-center rounded-full mx-auto">
      <Link to={`${process.env.PUBLIC_URL}/person/${personId}`}>
        <img
          className="w-12 h-12 object-cover rounded-full"
          src={image ? `${baseURL}w185${image}` : avatar}
          alt={name}
        />
      </Link>
    </div>
  );
}

export default CastItem;
