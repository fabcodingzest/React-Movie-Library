import React from "react";
import StickyBox from "react-sticky-box";
import MovieIllustration from "../assets/movietime.svg";
import TMDBLogo from "../assets/TMDBLogoDark.svg";
import { Link } from "react-router-dom";
import ListItem from "../components/ListItem";
import { faGift, faFire, faChartLine } from "@fortawesome/free-solid-svg-icons";

const Sidebar = ({ genres,staticCategories, selected }) => {
  const staticIcons = [faGift, faFire, faChartLine];
  return (
    <StickyBox className="hidden lg:block border-r-2 sidebar border-gray-300 text-gray-500 min-h-screen">
      <img
        className="w-full pt-6 px-6"
        src={MovieIllustration}
        alt="Movie illustration"
      />
      <div className="sidebar p-4">
        <h1 className="text-gray-700 font-bold text-lg">Discover</h1>
        {renderStatic(staticCategories, staticIcons, selected)}
        <br />
        <h1 className="text-gray-700 font-bold text-lg">Genres</h1>
        {renderGenres(genres, selected)}
      </div>
      <p className="flex text-center justify-center items-center mt-4 text-md">
        &copy; Copyright
        <a href="https://github.com/fabcodingzest" className="font-bold ml-2">
          Fab
        </a>
      </p>
      <a href="https://www.themoviedb.org/" target="_blank" rel="noreferrer">
        <img
          className="w-full px-16 py-6"
          src={TMDBLogo}
          alt="The Movie DB Logo"
        />
      </a>
    </StickyBox>
  );
};

const renderStatic = (categories, staticIcons, selected) => {
  return categories.map((category, index) => (
    <Link
      className={`block pl-4 py-2 mt-2 text-sm rounded-full border border-transparent ${
        selected === category
          ? "bg-gray-700 text-gray-100 border-transparent"
          : "hover:border-gray-500"
      }`}
      key={index}
      to={`${process.env.PUBLIC_URL}/discover/${category}`}
    >
      <ListItem text={category} icon={staticIcons[index]} />
    </Link>
  ));
};

const renderGenres = (genres, selected) => {
  return genres.map((genre) => (
    <Link
      className={`block pl-4 py-2 mt-2 text-sm rounded-full border border-transparent ${
        selected === genre.name
          ? "bg-gray-700 text-gray-100 border-transparent"
          : "hover:border-gray-500"
      }`}
      key={genre.id}
      to={`${process.env.PUBLIC_URL}/genre/${genre.name}`}
    >
      <ListItem text={genre.name} />
    </Link>
  ));
};

export default Sidebar;
