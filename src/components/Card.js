import React, { useState, useEffect } from "react";
import {useNavigate} from "react-router-dom";
import defaultImage from '../img/defaultPoster.png';
import axios from "axios";

const Card = ({ movie, tmpQuery, tmpMovieId, setListData }) => {

  const navigate = useNavigate();

  // State variable to track whether the movie is in the watchlist
  const [isInWatchlist, setIsInWatchlist] = useState(false);

  // Update isInWatchlist state based on localStorage.movies
  useEffect(() => {
    let storedData = window.localStorage.movies
      ? window.localStorage.movies.split(",")
      : [];

      const fetchMovie = async () => {
        const getList = async () => {
          let res;
          await axios.get(`http://localhost:3001/api/user/${localStorage.getItem("username")}`).then(response =>{
          res = response.data.movies;
        })
        return res;
        }
  
        let list = await getList();
        for(let i = 0; i < list.length; i++){
          if(list[i] === movie.id){
            setIsInWatchlist(true); // array.includes doesn't work with ints???
          }
        }
      }

    fetchMovie();
  }, [movie.id]);

  // Add the movie to localStorage.movies and update isInWatchlist state
  const addStorage = () => {
    let storedData = window.localStorage.movies
      ? window.localStorage.movies.split(",")
      : [];

    if (!storedData.includes(movie.id.toString())) {
      storedData.push(movie.id);
      window.localStorage.movies = storedData;
      setIsInWatchlist(true);
      alert("The Movie has been added into your watchlist!")
    }
  };

  // Remove the movie from localStorage.movies and update isInWatchlist state
  const deleteStorage = () => {
    let storedData = window.localStorage.movies.split(",");
    let newData = storedData.filter((id) => id != movie.id);
    window.localStorage.movies = newData;
    setIsInWatchlist(false);

    // Remove the movie from the listData state in the UserList component
    setListData((prevListData) =>
    prevListData.filter((m) => m.id !== movie.id)
    );
  }

  // Note: This is awful, should refactor it out into a separate file, userService.js

  const removeMovie = async () => {
    let req = 'http://localhost:3001/api/user/remove';
    await axios.patch(req, {name: localStorage.getItem("username"), movieId: movie.id}).then(response => {
      alert("The Movie has been removed from your watchlist!")
    });
    setIsInWatchlist(false);
  }

  const addMovie = async () => {
    if(!localStorage.getItem("username")){
      setIsInWatchlist(false);
      alert("You must be logged in to add a movie to your watchlist!");
      return;
    }
    let req = "http://localhost:3001/api/user/add";
    await axios.patch(req, {name: localStorage.getItem("username"), movieId: movie.id}).then(response => {
      setIsInWatchlist(true);
      alert("The Movie has been added into your watchlist!")
    });
  }

  const openMovie = () => {
    console.log(tmpMovieId);
    let newMovieIds = [];
    if(tmpMovieId !== undefined){
      newMovieIds = tmpMovieId.copyWithin();
    }
    newMovieIds.push(movie.id);
    navigate(`/movie/${movie.id}`, {
      state: {
        tmpStr: tmpQuery,
        tmpMovieId: newMovieIds
      }
    });
};

  // Set watchlistButtonText based on isInWatchlist state
  const watchlistButtonText = isInWatchlist ? "Remove" : "+ Watchlist";

  return (
    <div className="card">
     
      <div className="img-wrapper">
        <img
          src={"https://image.tmdb.org/t/p/w500" + movie.poster_path}
          onError={(e) => { e.target.src = defaultImage }}
          alt="movie poster"
        />
        <div className="overlay" onClick={() => openMovie(movie.id)}>
          <p>View details</p>
        </div>
      </div>
      <h2>
        {movie.title && movie.title.length <= 40
          ? movie.title
          : movie.title && movie.title.length > 40
          ? `${movie.title.substring(0, 40)}...`
          : movie.name && movie.name.length <= 40
          ? movie.name
          : movie.name && movie.name.length > 40
          ? `${movie.name.substring(0, 40)}...`
          : ""}
      </h2>
      <div className="btn" onClick={() => {
        if (isInWatchlist) {
          // deleteStorage();
          removeMovie();
        } else {
          // addStorage();
          addMovie();
        }
      }}>
        {watchlistButtonText}
      </div>
    </div>
  );
};

export default Card;