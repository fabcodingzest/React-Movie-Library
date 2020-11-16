import React from "react";
import StickyBox from "react-sticky-box";
import MovieIllustration from "../assets/movietime.jpg";
import { NavLink } from "react-router-dom";

const Sidebar = ({ genres, config }) => {
  const staticCategories = ["Popular", "Top Rated", "Upcoming"];
  return (
    <StickyBox className="sidebar border border-gray-300 p-4 min-h-screen">
      <img className="mb-10" src={MovieIllustration} alt="Movie illustration" />
      <h1 className="font-bold text-md">Discover</h1>
      {staticCategories.map((category) => (
        <NavLink exact to={`/discover/${category}`} className="block">
          {category}
        </NavLink>
      ))}
      <br />
      <h1 className="font-bold text-md">Genres</h1>

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
