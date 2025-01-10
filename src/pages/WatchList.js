import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import Card from "../components/Card";


/*This is the watchlist page were you can view your watchlist. */
const UserList = ({ setMovieCardId }) => {
  const [listData, setListData] = useState([]);
  const [moviesId, setMoviesId] = useState([]);

  useEffect(() => {
    // let moviesId = window.localStorage.movies
    //   ? window.localStorage.movies.split(",")
    //   : [];

    const fetchWatchlist = async () => {
      const getList = async () => {
        let res;
        await axios.get(`http://localhost:3001/api/user/${localStorage.getItem("username")}`).then(response =>{
        res = response.data.movies;
      })
      return res;
      }

      let list = await getList();
      setMoviesId(list);

      for (let i = 0; i < list.length; i++) {
        await axios
          .get(
            `https://api.themoviedb.org/3/movie/${list[i]}?api_key=a601d280bc9e05d04e911fde18236e15&language=en-US`
          )
          .then((res) => {setListData((listData) => [...listData, res.data]);
          });
      }
    }

    fetchWatchlist();

  }, []);

  return (
    <div className="watchlistPage">
      <h2>Your Watchlist</h2>
      {localStorage.getItem("username") ?
      <div className="result">
        {listData.length > 0 ? (
          listData.map((movie) => (
            <Card
              movie={movie}
              key={movie.id}
              tmpQuery="&WatchList&"
              setMovieCardId={setMovieCardId}
              setListData={setListData} // pass setListData function to Card
            />
          ))
        ) : (
          <h2>is empty, start adding movies to fill your list.</h2>
        )}
      </div>
      :
      <h2>You need to be logged in to view your watchlist.</h2>
    }
    </div>
  );
};

export default UserList;
