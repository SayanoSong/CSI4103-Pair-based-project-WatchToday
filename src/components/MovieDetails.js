import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import MovieCast from "./MovieCast";
import defaultImage from "../img/defaultPoster.png";
import MoviePlatform from "./MoviePlatform";
import MovieRecommendations from "./MovieRecommendations";
import VideoModal from "./VideoModal";

const getPosterPath = (posterpath) => {
  if (posterpath) {
    return `https://www.themoviedb.org/t/p/w300_and_h450_bestv2${posterpath}`;
  } else {
    return defaultImage;
  }
};

const getLanguages = (data) => {
  let result = "";
  if (data != null) {
    for (let i = 0; i < data.length; i++) {
      if (i !== data.length - 1) {
        result += data[i]["english_name"] + ", ";
      } else {
        result += data[i]["english_name"];
      }
    }
  }
  return result;
};

const backToPage = (navigator, QueryStr, prevMovieIds) => {
  //console.log(QueryStr + "||" + prevMovieIds);
  if (prevMovieIds !== undefined && prevMovieIds.length > 1) {
    console.log(prevMovieIds);
    prevMovieIds.pop();
    let prevMovieId = prevMovieIds.pop();
    prevMovieIds.push(prevMovieId);
    navigator(`/movie/${prevMovieId}`, {state:{tmpStr: QueryStr, tmpMovieId: prevMovieIds}});
    return;
  }
  //console.log(QueryStr);
  switch (QueryStr) {
    case "&WatchList&":
      navigator("/watchlist");
      break;
    case (undefined || null):
      navigator("/");
      break;
    case "&Browse&":
      navigator("/");
      break;
    default:
      navigator("/search/", {
        state: {
          tmpStr: QueryStr,
        },
      });
  }
};

const MovieDetails = () => {
  const {id} = useParams();
  const [movieDets, setMovieDets] = useState([]);
  const [movieVideos, setMovieVideos] = useState([]);
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  let tmpQueryStr = location.state?.tmpStr ?? '';
  let tmpMovieIds = location.state?.tmpMovieId ?? [];

  // Movie trailer modal  
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedVideoKey, setSelectedVideoKey] = useState("");
  const openModal = (videoKey) => {
    setSelectedVideoKey(videoKey);
    setModalIsOpen(true);
  };
  const closeModal = () => {
    setModalIsOpen(false);
  };

  const addMovie = async () => {
    console.log("Adding")
    if(!localStorage.getItem("username")){
      setIsInWatchlist(false);
      alert("You must be logged in to add a movie to your watchlist!");
    } else {
      let req = "http://localhost:3001/api/user/add";
      await axios.patch(req, {name: localStorage.getItem("username"), movieId: parseInt(id)}).then(response => {
        setIsInWatchlist(true);
        alert("The Movie has been added into your watchlist!")
      });
    }
  }

  const removeMovie = async () => {
    console.log("IN HERE")
    let req = 'http://localhost:3001/api/user/remove';
    await axios.patch(req, {name: localStorage.getItem("username"), movieId: parseInt(id)}).then(response => {
      alert("The Movie has been removed from your watchlist!")
    });
    setIsInWatchlist(false);
    console.log(isInWatchlist)
  }

  useEffect(() => {

    const fetchWatchList = async () => {
      const getList = async () => {
        let res;
        await axios.get(`http://localhost:3001/api/user/${localStorage.getItem("username")}`).then(response =>{
        res = response.data.movies;
      })
        return res
      }

      let list = await getList();
      console.log(id)
      console.log(list)
      console.log("HERE")
      for(let i = 0 ; i < list.length; i++){
        console.log(list[i])
        if(list[i] === parseInt(id)){
          setIsInWatchlist(true);
          console.log("Found HERE")
          return;
        }
      }
    }

    const fetchMovieDetails = async () => {
      try {
        const detailsResp = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}?api_key=a601d280bc9e05d04e911fde18236e15&language=en-US`
        );
        if (detailsResp.data) {
          setMovieDets(detailsResp.data);
          console.log(detailsResp.data);
        }
      } catch (error) {
        console.error(error);
      }
    };
  
    const fetchMovieVideos = async () => {
      try {
        const videosResp = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}/videos?api_key=a601d280bc9e05d04e911fde18236e15&language=en-US`
        );
        if (videosResp.data) {
          setMovieVideos(videosResp.data.results);
          console.log(videosResp.data.results);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchWatchList();
    fetchMovieDetails();
    fetchMovieVideos();
    // setIsInWatchlist(storedData.includes(id));
  }, [id]);

  return (
    <div className="moviedetails">
      {movieDets ? (
        <>
          <table className="table table-borderless">
            <div className="container" id="btnContainer">
              <button
                type="button"
                className="btn btn-primary h-75 detailBtn"
                id="btn1"
                onClick={() => backToPage(navigate, tmpQueryStr, tmpMovieIds)}
              >
                Back
              </button>
            </div>
            <tbody>
              <tr>
                <td>
                <div className="poster-container">
                  <img
                    src={getPosterPath(movieDets.poster_path)}
                    alt="movie poster"
                  ></img>
                  {movieVideos.some(
                    (video) =>
                      video.site === "YouTube" &&
                      (video.type.toLowerCase().includes("trailer") ||
                        video.type.toLowerCase().includes("teaser"))
                  ) && (
                    <button
                      className="watch-trailer-btn"
                      onClick={() => {
                        const youtubeVideo = movieVideos.find(
                          (video) =>
                            video.site === "YouTube" &&
                            (video.type.toLowerCase().includes("trailer") ||
                              video.type.toLowerCase().includes("teaser"))
                        );
                        openModal(youtubeVideo.key);
                      }}
                    >
                      Watch Trailer
                    </button>
                  )}
                  {/* Add the watchlist button here */}
                  <div
                    className="watchlist-btn"
                    onClick={() => {
                      if (!isInWatchlist) {
                        // deleteStorage();
                        addMovie();
                      } else {
                        removeMovie();
                        // addStorage();
                      }
                    }}
                  >
                    {isInWatchlist ? "Remove from watchlist" : "+ Watchlist"}
                  </div>
                </div>
                </td>
                <td>
                  <h2 className="media-heading" id="movieTitle">
                    Title: {movieDets.original_title}
                  </h2>
                  <div id="details">
                    <div className="genreTitle">
                      <div className="genre-container">
                        {movieDets.genres?.map((item, index) => (
                          <div className="genre" key={index}>
                            {item.name}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="language">
                    <div className="language_container">
                      <p className="languages">
                        <b>Languages:&nbsp;</b>
                        {getLanguages(movieDets.spoken_languages)}
                      </p>
                    </div>
                  </div>
                  <p className="status">
                    <b>Status: </b>
                    {movieDets.status}
                  </p>
                  <p className="released">
                    <b>Release date: </b>
                    {movieDets.release_date}
                  </p>
                  <p className="duration">
                    <b>Duration: </b>
                    {movieDets.runtime} minutes
                  </p>
                  <p className="vote">
                    <b>Vote Average: </b>
                    {movieDets.vote_average}
                  </p>
                  <p className="voteNum">
                    <b>Number of votes: </b>
                    {movieDets.vote_count}
                  </p>
                  <p className="overview">
                    <b>Overview: </b>
                    {movieDets.overview}
                  </p>
                </td>
              </tr>
            </tbody>
          </table> 
          
          <MovieCast id={id} /> <MoviePlatform id={id}/><MovieRecommendations tmpMovieIds={tmpMovieIds} tmpQueryStr={tmpQueryStr} id={id}/> <VideoModal isOpen={modalIsOpen} onRequestClose={closeModal} videoKey={selectedVideoKey}/></>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    );
};

export default MovieDetails;
