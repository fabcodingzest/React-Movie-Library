import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilm } from "@fortawesome/free-solid-svg-icons";

function MenuItem({ text, icon, hover, selected }) {
  return (
    <div
      className={`pl-4 py-2 mt-2 text-sm rounded-full border border-transparent transition-all ${
        selected
          ? "bg-gray-100 text-gray-700 border-transparent"
          : "hover:border-gray-100"
      } ${hover ? "transform hover:-translate-y-0.5" : ""}`}
    >
      <FontAwesomeIcon icon={icon ? icon : faFilm} />
      <span className="p-1.5">{text}</span>
    </div>
  );
}

export default MenuItem;
