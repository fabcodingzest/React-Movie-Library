import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilm } from "@fortawesome/free-solid-svg-icons";

function ListItem({ text, icon, hover }) {
  return (
    <div
      className={`text-lg sm:text-sm inline-block transition-all ${
        hover ? "transform hover:-translate-y-0.5" : ""
      }`}
    >
      <FontAwesomeIcon icon={icon ? icon : faFilm} />
      <span className="p-1.5">{text}</span>
    </div>
  );
}

export default ListItem;
