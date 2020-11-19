import React from "react";
import StickyBox from "react-sticky-box";
import MovieIllustration from "../assets/movietime.svg";
import TMDBLogo from "../assets/TMDBLogo.svg";
import { Link } from "react-router-dom";
import ListItem from "../components/ListItem";
import { faGift, faFire, faChartLine } from "@fortawesome/free-solid-svg-icons";

const Sidebar = ({ genres, config }) => {
  const staticCategories = ["Popular", "Top Rated", "Upcoming"];
  const staticIcons = [faGift, faFire, faChartLine];
  console.log("sidebar");
  return (
    <StickyBox className="border-r-2 sidebar border-gray-300 text-gray-500 min-h-screen">
      <img
        className="w-full pt-6 px-6"
        src={MovieIllustration}
        alt="Movie illustration"
      />
      <div className="sidebar p-4">
        <h1 className="text-gray-700 font-bold text-lg">Discover</h1>
        {renderStatic(staticCategories, staticIcons)}
        <br />
        <h1 className="text-gray-700 font-bold text-lg">Genres</h1>
        {renderGenres(genres)}
      </div>
      <p className="flex justify-center items-center mt-4 text-md">
        &copy; Copyright
        <a href="https://github.com/fabcodingzest" className="font-bold ml-2">
          Fab
        </a>
      </p>
      <img
        className="w-full px-16 py-6"
        src={TMDBLogo}
        alt="The Movie DB Logo"
      />
    </StickyBox>
  );
};

const renderStatic = (categories, staticIcons) => {
  return categories.map((category, index) => (
    <Link key={index} to={`${process.env.PUBLIC_URL}/discover/${category}`}>
      <ListItem text={category} icon={staticIcons[index]} />
    </Link>
  ));
};

const renderGenres = (genres) => {
  return genres.map((genre) => (
    <Link
      className="block"
      key={genre.id}
      to={`${process.env.PUBLIC_URL}/genre/${genre.name}`}
    >
      <ListItem text={genre.name} />
    </Link>
  ));
};

export default Sidebar;
