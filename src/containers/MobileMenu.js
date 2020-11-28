import React, { useState } from "react";
import StickyBox from "react-sticky-box";
import TMDBLogo from "../assets/TMDBLogoLight.svg";
import { Link } from "react-router-dom";
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
    fontSize: "1.15rem",
  },
  bmItemList: {
    color: "#b8b7ad",
  },
  bmItem: {
    display: "inline-block",
    width: "100%",
    outline: "none",
  },
  bmOverlay: {
    top: 0,
    background: "rgba(0, 0, 0, 0.3)",
  },
};
function MobileMenu({ genres, staticCategories, selected }) {
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
      <StickyBox className="w-full z-40 flex justify-between items-center py-4 px-8 shadow-xl bg-indigo-300">
        <div className="menu cursor-pointer" onClick={handleMenuOpen}>
          <svg
            className="h-10 w-10 fill-current text-black"
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
        <Searchbar className="z-40" />
      </StickyBox>
      <Menu
        width={200}
        isOpen={isOpen}
        onStateChange={isMenuOpen}
        styles={styles}
      >
        <div className="sidebar p-4 pl-1 text-gray-100">
          <h1 className="font-bold text-lg mt-6">Discover</h1>
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
        <a href="https://www.themoviedb.org/" target="_blank" rel="noreferrer">
          <img
            className="w-full px-16 sm:px-10 py-6"
            src={TMDBLogo}
            alt="The Movie DB Logo"
          />
        </a>
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
