import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilm } from "@fortawesome/free-solid-svg-icons";

function ListItem({ text, icon, selected }) {
  return (
    <div
      className={`pl-4 py-2 mt-2 text-sm rounded-full border border-transparent ${
        selected
          ? "bg-gray-700 text-gray-100 border-transparent"
          : "hover:border-gray-500"
      }`}
    >
      <FontAwesomeIcon icon={icon ? icon : faFilm} />
      <span className="p-2">{text}</span>
    </div>
  );
}

export default ListItem;
