import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilm } from "@fortawesome/free-solid-svg-icons";

function ListItem(props) {
  return (
    <div className="pl-4 mt-4 text-sm font-semibold">
      <FontAwesomeIcon icon={props.icon ? props.icon : faFilm} />
      <span className="p-2">{props.text}</span>
    </div>
  );
}

export default ListItem;
