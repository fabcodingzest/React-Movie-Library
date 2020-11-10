import React from "react";
import Sidebar from "./components/Sidebar";
import tmdbApi from "./api/api";
const getData = async () => {
  const result = await tmdbApi.get("movie/550", {
    params: {
      append_to_response: "videos",
    },
  });
  console.log(result.data);
};

function App() {
  getData();

  return (
    <div className="flex items-start">
      <Sidebar />
    </div>
  );
}

export default App;
