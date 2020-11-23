import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilm } from "@fortawesome/free-solid-svg-icons";

function ListItem({ text, icon }) {
  return (
    <div className="text-lg sm:text-sm inline-block">
      <FontAwesomeIcon icon={icon ? icon : faFilm} />
      <span className="p-2">{text}</span>
    </div>
  );
}

export default ListItem;
