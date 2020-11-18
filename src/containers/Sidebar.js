import React from "react";
import StickyBox from "react-sticky-box";
import MovieIllustration from "../assets/movietime.jpg";
import { Link } from "react-router-dom";

const Sidebar = ({ genres, config }) => {
  console.log("ko");
  const staticCategories = ["Popular", "Top Rated", "Upcoming"];
  return (
    <StickyBox className="border sidebar border-gray-300 p-4 min-h-screen">
      <div className="sidebar">
        <img
          className="mb-10 w-16"
          src={MovieIllustration}
          alt="Movie illustration"
        />
        <h1 className="font-bold text-md">Discover</h1>
        {staticCategories.map((category, index) => (
          <Link
            key={index}
            to={`${process.env.PUBLIC_URL}/discover/${category}`}
            className="block"
          >
            {category}
          </Link>
        ))}
        <br />
        <h1 className="font-bold text-md">Genres</h1>
        {genres.map((genre) => (
          <Link
            className="block"
            key={genre.id}
            to={`${process.env.PUBLIC_URL}/genre/${genre.name}`}
          >
            {genre.name}
          </Link>
        ))}
      </div>
    </StickyBox>
  );
};

export default Sidebar;
