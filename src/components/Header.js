import React from "react";

function Header({ name }) {
  return (
    <div>
      <h1 className="text-3xl w-full font-thin uppercase ml-4">{name}</h1>
      <p className="text-sm uppercase font-bold ml-4">movies</p>
    </div>
  );
}

export default Header;
