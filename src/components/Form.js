import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "./Card";
import { useLocation } from "react-router-dom";

/*The Form page, has the search effect which makes it easy for you to search a film or tv show. */


const Form = () => {
  const [moviesData, setMoviesData] = useState([]);
  const [search, setSearch] = useState("");
  const location = useLocation();
  //console.log(location);
  if (location.state !== null && location.state !== undefined){
    let tmpQueryStr = location.state.tmpStr;
    if (tmpQueryStr !== undefined) {
      setSearch(tmpQueryStr);
      location.state = null;
    }
  }
/*The api for you to search the api database. Then we call Card with the movie id. */
  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/search/movie?api_key=2005cf20cc76ab57182960fb7c3b54c1&query=${search}`
      )
      .then((res) => setMoviesData(res.data.results));
  }, [search]);

  return (
    <div className="form-component">
      <div className="form-container">
        <form onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            placeholder="Search for any movie"
            id="search-input"
            onChange={(e) => setSearch(e.target.value)}
          />
        </form>
      </div>
      <div className="result">
        {moviesData
          .map((movie) => (
            <Card key={movie.id} movie={movie} tmpQuery={search}/>
          ))}
      </div>
    </div>
  );
};

export default Form;
