import "./App.css";
import MovieList from "./components/MovieList";
import Search from "./components/Search";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <div className="App">
      <h1>React Movie Library</h1>
      <Sidebar />
      <Search />
      <MovieList />
    </div>
  );
}

export default App;
