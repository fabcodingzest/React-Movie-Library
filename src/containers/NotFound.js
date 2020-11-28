import React from "react";
import { Link } from "react-router-dom";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Empty from "../assets/empty.svg";

function NotFound({ title, subtitle, home }) {
  return (
    <div className="w-full lg:w-3/5 xl:w-3/5 h-full flex flex-col justify-center items-center max-w-lg sm:max-w-2xl xl:max-w-4xl mx-auto px-6 md:px-8">
      <p className="text-2xl sm:text-2xl xl:text-4xl  text-center">{title}</p>
      <p className="text-md md:text-lg xl:text-2xl text-center my-3 md:mb-8 break-all">
        {subtitle}
      </p>
      <img src={Empty} alt="Something went wrong" className="w-full" />
      {home && (
        <Link
          to={`${process.env.PUBLIC_URL}/`}
          className="bg-gray-800 text-gray-100 px-3 py-1.5 md:px-4 md:py-2 rounded-full font-semibold my-6 hover:scale-105"
        >
          <FontAwesomeIcon icon={faHome} className="mr-2" />
          Home
        </Link>
      )}
    </div>
  );
}

export default NotFound;
