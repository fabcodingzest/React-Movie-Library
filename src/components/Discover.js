import React from "react";
import ListItem from "./ListItem";
import { faFire, faChartLine, faGift } from "@fortawesome/free-solid-svg-icons";

function Discover() {
  return (
    <div className="text-gray-700">
      <p className="font-semibold">Discover</p>
      <ListItem text="Popular" icon={faFire} />
      <ListItem text="Top Rated" icon={faChartLine} />
      <ListItem text="Upcoming" icon={faGift} />
    </div>
  );
}

export default Discover;
