import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Slider from 'react-slick';
import Card from "./Card";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const MovieRecommendations = ({ id, tmpQueryStr, tmpMovieIds}) => {
  const navigate = useNavigate();
  const [movieRecommendations, setMovieRecommendations] = useState([]);

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=a601d280bc9e05d04e911fde18236e15&language=en-US`
      )
      .then((resp) => {
        if (resp.data) {
          console.log(resp.data)
          setMovieRecommendations(resp.data.results);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    variableWidth: true
  };

  const openMovie = (movieId) => {
    navigate(`/movie/${movieId}`, {});
  }
  
  return (
    <div className="movieRecommendations">
      <h2 className="recommendationsTitle">Recommended Movies</h2>
      <Slider {...settings}>
      {movieRecommendations.length > 0 ? (
          movieRecommendations.map((movie) => (
            <Card key={movie.id} movie={movie} tmpMovieId={tmpMovieIds} tmpQuery={tmpQueryStr} onClick={() => openMovie(movie.id)}>
            </Card>
          ))
        ) : (
          <h3><b>No Recommended Movies Found</b></h3>
        )
        }
      </Slider>
    </div>
  );
};

export default MovieRecommendations;