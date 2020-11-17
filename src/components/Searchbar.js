import { useState } from "react";
import { withRouter } from "react-router-dom";

function Searchbar({ history }) {
  const [input, setInput] = useState("");
  const handleInput = (e) => {
    setInput(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    history.push(`${process.env.PUBLIC_URL}/search/${input}`);
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search for a movie..."
        className="ml-3 px-4 py-2 rounded-full w-1/2 bg-gray-300"
        onChange={handleInput}
      />
    </form>
  );
}

export default withRouter(Searchbar);
