import React, { useEffect, useState } from "react";
import axios from "axios";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import defaultImage from '../img/defaultActor.png';

const MovieCast = ({ id }) => {
  const [movieCast, setMovieCast] = useState([]);

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${id}/credits?api_key=a601d280bc9e05d04e911fde18236e15&language=en-US`
      )
      .then((resp) => {
        if (resp.data) {
          setMovieCast(resp.data.cast);
          //console.log(resp.data.cast);
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
    slidesToScroll: 5
  };

  return (
    <div className="movieCast">
      <h2 className="castTitle">Cast</h2>
      <Slider {...settings}>
        {movieCast.length > 0 ? (
          movieCast.map((actor) => (
            <div key={actor.id}>
              <img
                className="cast-card"
                src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2${actor.profile_path}`}
                onError={(e) => { e.target.src = defaultImage }}
                alt={actor.name}
              />
              <h3 className="actor-name">{actor.name}</h3>
            </div>
          ))
        ) : (
          <h3><b>No Cast Information</b></h3>
        )
        }
      </Slider>
    </div>
  );
};

export default MovieCast;
