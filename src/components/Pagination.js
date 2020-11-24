import React from "react";
import { Link } from "react-router-dom";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Button from "./Button";
import { scroller } from "react-scroll";

const Wrapper = ({ children, type }) => {
  return (
    <div
      className={`flex items-center ${
        type === "one"
          ? "justify-start"
          : type === "both"
          ? "justify-between"
          : "justify-end"
      }`}
    >
      {children}
    </div>
  );
};

function Pagination({ movies }) {
  const { page, total_pages } = movies;

  const scrollTo = () => {
    scroller.scrollTo("scroll-to-element", {
      duration: 1500,
      smooth: true,
      offset: -100,
    });
  };

  if (total_pages === 1) return null;

  if (page < total_pages && page === 1) {
    return (
      <Wrapper>
        <Link
          to={`${process.env.PUBLIC_URL}?page=${page + 1}`}
          onClick={scrollTo}
        >
          <Button solid title={`Page ${page + 1}`} icon={faArrowRight} />
        </Link>
      </Wrapper>
    );
  } else if (page < total_pages) {
    return (
      <Wrapper type="both">
        <Link
          to={`${process.env.PUBLIC_URL}?page=${page - 1}`}
          onClick={scrollTo}
        >
          <Button solid left title={`Page ${page - 1} `} icon={faArrowLeft} />
        </Link>
        <Link
          to={`${process.env.PUBLIC_URL}?page=${page + 1}`}
          onClick={scrollTo}
        >
          <Button solid title={`Page ${page + 1}`} icon={faArrowRight} />
        </Link>
      </Wrapper>
    );
  } else {
    return (
      <Wrapper type="one">
        <Link
          to={`${process.env.PUBLIC_URL}?page=${page - 1}`}
          onClick={scrollTo}
        >
          <Button left solid title={`Page ${page - 1}`} icon={faArrowLeft} />
        </Link>
      </Wrapper>
    );
  }
}

export default Pagination;
