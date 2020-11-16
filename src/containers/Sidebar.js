import React from "react";
import StickyBox from "react-sticky-box";
import MovieIllustration from "../assets/movietime.jpg";
import { NavLink } from "react-router-dom";

const Sidebar = ({ genres, config }) => {
  return (
    <StickyBox className="sidebar border border-gray-300 p-4 min-h-screen">
      <img className="mb-10" src={MovieIllustration} alt="Movie illustration" />
      <h1>Discover</h1>
      <NavLink exact to="/discover/popular" className="block">
        Popular
      </NavLink>
      <NavLink exact to="/genre/Crime">
        Drama
      </NavLink>
      {genres.map((genre) => (
        <NavLink
          className="block"
          key={genre.id}
          to={`${process.env.PUBLIC_URL}/genre/${genre.name}`}
        >
          {genre.name}
        </NavLink>
      ))}
    </StickyBox>
  );
};

export default Sidebar;
