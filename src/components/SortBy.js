import React from "react";
import Select from "react-select";

const options = [
  { value: "popularity.desc", label: "Popularity" },
  { value: "vote_average.desc", label: "Votes Average" },
  { value: "original_title.asc", label: "Title" },
  { value: "release_date.desc", label: "Release Date" },
];

function SortBy({ option, setOption }) {
  const handleChange = (selectedOption) => {
    setOption(selectedOption);
  };
  return (
    <Select
      className="text-sm"
      theme={(theme) => ({
        ...theme,
        borderRadius: 5,
        width: "50",
        colors: {
          ...theme.colors,
          primary25: "#E5E7EB",
          primary: "#374151",
        },
      })}
      options={options}
      value={option}
      isSearchable={false}
      onChange={handleChange}
    />
  );
}

export default SortBy;
