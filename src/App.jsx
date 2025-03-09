import { Route, Routes, NavLink, useLocation } from "react-router-dom";
import { useState } from "react";
import "./App.css";
import data from "../data.json";
import Form from "./components/Form";
import Page from "./components/Page";
import Input from "./components/Input";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  const [value, setValue] = useState("");

  const filteredMovies =
    value.length > 0
      ? data.filter((item) =>
          item.title.toLowerCase().includes(value.toLowerCase())
        )
      : data;

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <div
      className={`${
        isLoggedIn ? "p-[32px] pr-[0px]" : ""
      } flex gap-[36px] bg-[#10141E]`}
    >
      {isLoggedIn && (
        <nav className="h-[960px] w-full min-w-[96px] max-w-[96px] flex flex-col items-center justify-between bg-[#161D2F] pt-[32px] pb-[32px] rounded-[20px]">
          <ul className="flex flex-col justify-center items-center gap-[75px]">
            <li>
              <img src="../src/assets/logo.svg" alt="Logo" />
            </li>
            <div className="h-[200px] flex flex-col justify-between">
              <li>
                <NavLink
                  to="/"
                  className={`nav-icon hover:cursor-pointer ${
                    location.pathname === "/" ? "active" : ""
                  }`}
                >
                  <img src="../src/assets/icon-nav-home.svg" alt="Home" />
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/movies"
                  className={`nav-icon cursor-pointer ${
                    location.pathname === "/movies" ? "active" : ""
                  }`}
                >
                  <img src="../src/assets/icon-nav-movies.svg" alt="Movies" />
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/tvseries"
                  className={`nav-icon cursor-pointer ${
                    location.pathname === "/tvseries" ? "active" : ""
                  }`}
                >
                  <img
                    src="../src/assets/icon-nav-tv-series.svg"
                    alt="TV Series"
                  />
                </NavLink>
              </li>
              <li className="flex justify-center">
                <NavLink
                  to="/favorites"
                  className={`nav-icon cursor-pointer ${
                    location.pathname === "/favorites" ? "active" : ""
                  }`}
                >
                  <img
                    src="../src/assets/icon-nav-bookmark.svg"
                    alt="Favorites"
                  />
                </NavLink>
              </li>
            </div>
          </ul>
          <img
            className="w-[40px] h-[40px]"
            src="../src/assets/image-avatar.png"
            alt="Avatar"
          />
        </nav>
      )}

      <Routes>
        {!isLoggedIn ? (
          <Route path="/" element={<Form onLogin={handleLogin} />} />
        ) : (
          <>
            <Route
              path="/"
              element={
                <div className="flex flex-col gap-[35px] w-[100%] overflow-hidden">
                  <Input
                    value={value}
                    onChange={handleChange}
                    placeholder="Search for movies or TV series"
                    className={`w-[100%] max-w-[1240px] text-white pl-4 pt-0 pr-4 pb-4.5 border-[#5A698F] border-b-[1px] focus:border-[#fff] outline-none placeholder-[#5A698F] focus:placeholder-[#fff]`}
                  />
                  <Page
                    className="w-[1440px] flex justify-start"
                    data={filteredMovies}
                    isTrending={true}
                    title="Trending"
                    slidesPerView={2.5}
                  />
                  <Page
                    className="flex flex-wrap gap-x-[40px] gap-y-[30px] w-[100%] max-w-[1240px]"
                    data={filteredMovies}
                    isTrending={false}
                    title="Recommended for you"
                    slidesPerView={2.5}
                  />
                </div>
              }
            />
            <Route
              path="/movies"
              element={
                <div className="flex flex-col gap-[35px] w-[100%] overflow-hidden">
                  <Input
                    value={value}
                    onChange={handleChange}
                    placeholder="Search for movies or TV series"
                    className={`w-[100%] max-w-[1240px] text-white pl-4 pt-0 pr-4 pb-4.5 border-[#5A698F] border-b-[1px] focus:border-[#fff] outline-none placeholder-[#5A698F] focus:placeholder-[#fff]`}
                  />
                  <Page
                    className="w-[1440px] flex justify-start"
                    data={filteredMovies}
                    isTrending={true}
                    category="Movie"
                    title="Trending"
                    slidesPerView={2.5}
                  />
                  <Page
                    className="flex flex-wrap gap-x-[40px] gap-y-[30px] w-[100%] max-w-[1240px]"
                    data={filteredMovies}
                    isTrending={false}
                    category="Movie"
                    title="Movies"
                  />
                </div>
              }
            />
            <Route
              path="/tvseries"
              element={
                <div className="flex flex-col gap-[35px] w-[100%] overflow-hidden">
                  <Input
                    value={value}
                    onChange={handleChange}
                    placeholder="Search for movies or TV series"
                    className={`w-[100%] max-w-[1240px] text-white pl-4 pt-0 pr-4 pb-4.5 border-[#5A698F] border-b-[1px] focus:border-[#fff] outline-none placeholder-[#5A698F] focus:placeholder-[#fff]`}
                  />
                  <Page
                    className="w-[1440px] flex justify-start"
                    data={filteredMovies}
                    isTrending={true}
                    category="TV Series"
                    title="Trending"
                    slidesPerView={2.5}
                  />
                  <Page
                    className="flex flex-wrap gap-x-[40px] gap-y-[30px] w-[100%] max-w-[1240px]"
                    data={filteredMovies}
                    isTrending={false}
                    category="TV Series"
                    title="TV Series"
                  />
                </div>
              }
            />
            <Route
              path="/favorites"
              element={
                <div className="flex flex-col gap-[35px] w-[100%] overflow-hidden">
                  <Input
                    value={value}
                    onChange={handleChange}
                    placeholder="Search for movies or TV series"
                    className={`w-[100%] max-w-[1240px] text-white pl-4 pt-0 pr-4 pb-4.5 border-[#5A698F] border-b-[1px] focus:border-[#fff] outline-none placeholder-[#5A698F] focus:placeholder-[#fff]`}
                  />
                  <Page
                    className="w-[1440px] flex justify-start"
                    data={filteredMovies}
                    isTrending={true}
                    isBookmarked={true}
                    title="Trending Movies"
                    category="Movie"
                    slidesPerView={2.5}
                  />
                  <Page
                    className="flex flex-wrap gap-x-[40px] gap-y-[30px] w-[100%] max-w-[1240px]"
                    data={filteredMovies} 
                    isBookmarked={true}
                    isTrending={false}
                    category="Movie"
                    title="Favorite Movies"
                  />
                  <Page
                    className="w-[1440px] flex justify-start"
                    data={filteredMovies}
                    category="TV Series"
                    isBookmarked={true}
                    isTrending={true}
                    title="Trending TV Series"
                    slidesPerView={2.5}
                  />
                  <Page
                    className="flex flex-wrap gap-x-[40px] gap-y-[30px] w-[100%] max-w-[1240px]"
                    data={filteredMovies}
                    isBookmarked={true}
                    isTrending={false}
                    category="TV Series"
                    title="Favorite TV Series"
                  />
                </div>
              }
            />
          </>
        )}
      </Routes>
    </div>
  );
}

export default App;
