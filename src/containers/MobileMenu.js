import React, { useState } from "react";
import StickyBox from "react-sticky-box";
import MovieIllustration from "../assets/movietime.svg";
import TMDBLogo from "../assets/TMDBLogoLight.svg";
import { Link } from "react-router-dom";
import ListItem from "../components/ListItem";
import { faGift, faFire, faChartLine } from "@fortawesome/free-solid-svg-icons";
import { slide as Menu } from "react-burger-menu";
import Searchbar from "../components/Searchbar";
import MenuItem from "../components/MenuItem";
let styles = {
  bmBurgerButton: {
    display: "none",
  },

  bmCrossButton: {
    height: "24px",
    width: "24px",
  },
  bmCross: {
    background: "#bdc3c7",
  },
  bmMenuWrap: {
    position: "fixed",
    height: "100%",
    top: "0",
    left: "0",
  },
  bmMenu: {
    background: "#373a47",
    padding: "2em 0.4em 0",
    fontSize: "1.15em",
  },
  bmItemList: {
    color: "#b8b7ad",
  },
  bmItem: {
    display: "inline-block",
    width: "100%",
  },
  bmOverlay: {
    background: "rgba(0, 0, 0, 0.3)",
  },
};
function MobileMenu({ genres, selected, setSelected }) {
  const staticCategories = ["Popular", "Top Rated", "Upcoming"];
  const [isOpen, setOpen] = useState(false);
  const staticIcons = [faGift, faFire, faChartLine];
  const isMenuOpen = function ({ isOpen }) {
    return setOpen(isOpen);
  };

  const handleMenuOpen = () => {
    setOpen(true);
  };
  return (
    <>
      <StickyBox className="w-full z-40 flex justify-between items-center py-6 px-8 sm:py-6 shadow-xl bg-indigo-300">
        <div className="menu cursor-pointer" onClick={handleMenuOpen}>
          <svg
            className="h-6 md:h-8 w-6 md:w-8 fill-current text-black"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="3"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </div>
        <Searchbar />
      </StickyBox>
      <Menu
        width={200}
        isOpen={isOpen}
        onStateChange={isMenuOpen}
        styles={styles}
      >
        <div className="img">
          <img
            className="w-full pt-6 px-16"
            src={MovieIllustration}
            alt="Movie illustration"
          />
        </div>
        <div className="sidebar p-4 text-gray-100">
          <h1 className="font-bold text-lg">Discover</h1>
          {renderStatic(staticCategories, staticIcons, selected, setOpen)}
          <br />
          <h1 className="font-bold text-lg">Genres</h1>
          {renderGenres(genres, selected, setOpen)}
        </div>
        <p className="text-gray-100 text-center flex justify-center items-center mt-4 text-md">
          &copy; Copyright
          <a href="https://github.com/fabcodingzest" className="font-bold ml-2">
            Fab
          </a>
        </p>
        <img
          className="w-full px-20 py-6"
          src={TMDBLogo}
          alt="The Movie DB Logo"
        />
      </Menu>
    </>
  );
}

const renderStatic = (categories, staticIcons, selected, setOpen) => {
  return categories.map((category, index) => (
    <Link
      className="block"
      key={index}
      onClick={setOpen ? () => setOpen(false) : null}
      to={`${process.env.PUBLIC_URL}/discover/${category}`}
    >
      <MenuItem
        text={category}
        icon={staticIcons[index]}
        selected={selected === category}
      />
    </Link>
  ));
};

const renderGenres = (genres, selected, setOpen) => {
  return genres.map((genre) => (
    <Link
      className="block"
      key={genre.id}
      onClick={setOpen ? () => setOpen(false) : null}
      to={`${process.env.PUBLIC_URL}/genre/${genre.name}`}
    >
      <MenuItem text={genre.name} selected={selected === genre.name} />
    </Link>
  ));
};
export default MobileMenu;
