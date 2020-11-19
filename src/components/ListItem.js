import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilm } from "@fortawesome/free-solid-svg-icons";

function ListItem({ text, icon }) {
  return (
    <div className="pl-4 mt-4 text-sm">
      <FontAwesomeIcon icon={icon ? icon : faFilm} />
      <span className="p-2">{text}</span>
    </div>
  );
}

export default ListItem;
