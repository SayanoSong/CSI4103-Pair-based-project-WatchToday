import React, { useEffect, useState } from "react";
import axios from "axios";
import Slider from 'react-slick';
import Card from "./Card";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useNavigate } from "react-router-dom";

const Browse = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [popularMoviesPage, setPopularMoviesPage] = useState(1);
  const [topRatedMoviesPage, setTopRatedMoviesPage] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    loadPopularMovies();
    loadTopRatedMovies();
  }, []);

  useEffect(() => {
    if (popularMoviesPage > 1) {
      loadPopularMovies();
    }
  }, [popularMoviesPage]);

  useEffect(() => {
    if (topRatedMoviesPage > 1) {
      loadTopRatedMovies();
    }
  }, [topRatedMoviesPage]);

  const loadPopularMovies = () => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/popular?api_key=a601d280bc9e05d04e911fde18236e15&language=en-US&page=${popularMoviesPage}`
      )
      .then((resp) => {
        if (resp.data) {
          setPopularMovies((prev) => [...prev, ...resp.data.results]);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const loadTopRatedMovies = () => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=a601d280bc9e05d04e911fde18236e15&language=en-US&page=${topRatedMoviesPage}`
      )
      .then((resp) => {
        if (resp.data) {
          setTopRatedMovies((prev) => [...prev, ...resp.data.results]);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const loadMorePopularMovies = () => {
    setPopularMoviesPage((prev) => prev + 1);
  };

  const loadMoreTopRatedMovies = () => {
    setTopRatedMoviesPage((prev) => prev + 1);
  };

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    variableWidth: true
  };

  return (
    <div className="browse">
      <h2 className="sectionTitle">Popular Movies</h2>
      <Slider {...settings}>
        {popularMovies.length > 0 ? (
          popularMovies.map((movie) => (
            <Card key={movie.id} movie={movie} tmpQuery="&Browse&">
            </Card>
          ))
        ) : (
          <h3>No Popular Movies Found</h3>
        )
        }
        <button className="viewMoreBtn" onClick={loadMorePopularMovies}>
          View More
        </button>
      </Slider>
      <h2 className="sectionTitle">Top Rated Movies</h2>
      <Slider {...settings}>
        {topRatedMovies.length > 0 ? (
          topRatedMovies.map((movie) => (
            <Card key={movie.id} movie={movie} tmpQuery="&Browse&">
            </Card>
          ))
        ) : (
          <h3>No Top Rated Movies Found</h3>
        )
        }
        <button className="viewMoreBtn" onClick={loadMoreTopRatedMovies}>
          View More
        </button>
      </Slider>
    </div>
  );
};

export default Browse;