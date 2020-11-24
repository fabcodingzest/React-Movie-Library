import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Button({ title, icon, solid, left }) {
  return (
    <button
      className={`md:text-sm font-semibold transform hover:-translate-y-0.5 hover:shadow-2xl ${
        solid ? "bg-gray-800 text-gray-100 shadow-2xl" : "text-gray-800"
      } hover:bg-gray-800 hover:text-gray-100 transition-all hover:translate-y-2 flex ${
        left && "flex-row-reverse"
      }  justify-center items-center gap-1 px-4 md:px-2 xl:px-4 py-2 border border-gray-700 rounded-full`}
    >
      {title}
      <FontAwesomeIcon icon={icon} className="text-sm mx-0.5" />
    </button>
  );
}

export default Button;
