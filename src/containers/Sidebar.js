import React from "react";
import StickyBox from "react-sticky-box";
import MovieIllustration from "../assets/movietime.jpg";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <StickyBox className="sidebar border border-gray-300 p-4 min-h-screen">
      <img className="mb-10" src={MovieIllustration} alt="Movie illustration" />
      <h1>Discover</h1>
      <NavLink exact to="/discover/Popular" className="block">
        Popular
      </NavLink>
      <NavLink exact to="/genre/drama">
        Drama
      </NavLink>
    </StickyBox>
  );
};

export default Sidebar;
