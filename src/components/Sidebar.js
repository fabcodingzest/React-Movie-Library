import React from "react";
import StickyBox from "react-sticky-box";
import MovieIllustration from "../assets/movietime.jpg";
import Discover from "./Discover";
import Genres from "./Genres";

const Sidebar = () => {
  return (
    <StickyBox className="sidebar border border-gray-300 p-4 min-h-screen">
      <img className="mb-10" src={MovieIllustration} alt="Movie illustration" />
      <Discover />
      <Genres />
    </StickyBox>
  );
};

export default Sidebar;
