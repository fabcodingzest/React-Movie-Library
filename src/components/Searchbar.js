import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useState, useRef, useEffect } from "react";
import { withRouter } from "react-router-dom";

function Searchbar({ history }) {
  const inputRef = useRef();
  const formRef = useRef();
  const [focus, setFocus] = useState(false);
  const [input, setInput] = useState("");

  useEffect(() => {
    // add the event listener to the document when component mounts
    document.addEventListener("mousedown", handleClick);

    // clean up the component when unmounted
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  const handleInput = (e) => {
    setInput(e.target.value);
  };

  const handleClick = (e) => {
    if (formRef.current.contains(e.target)) return;
    setFocus(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.length === 0) return;
    setInput("");
    setFocus(false);
    history.push(`${process.env.PUBLIC_URL}/search/${input}`);
  };
  console.log("searchbar");
  return (
    <div className="w-full absolute top-0 flex justify-end">
      <form
        ref={formRef}
        onClick={() => {
          setFocus(true);
          inputRef.current.focus();
        }}
        onSubmit={handleSubmit}
        className={`transition-all ease-in mt-6 ${
          focus ? "w-80 cursor-auto" : "w-8 cursor-pointer"
        } relative text-gray-100`}
      >
        <input
          ref={inputRef}
          type="text"
          placeholder="Search for a movie..."
          value={input}
          className={`transition-all ease-in w-full pl-10 py-2 outline-none rounded-full bg-gray-600 text-gray-50 placeholder-gray-100 border-none ${
            focus ? "cursor-auto" : "cursor-pointer"
          }`}
          onChange={handleInput}
        />
        <button
          type="submit"
          className={`absolute inset-3 flex justify-center items-center text-lg ${
            focus
              ? "pointer-events-auto cursor-pointer"
              : "pointer-events-none cursor-none"
          }`}
        >
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </form>
    </div>
  );
}

export default withRouter(Searchbar);
