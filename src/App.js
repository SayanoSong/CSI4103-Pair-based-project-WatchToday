import React, { Fragment, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import WatchList from "./pages/WatchList";
import NavBar from "./components/NavBar"
import 'bootstrap/dist/css/bootstrap.min.css';
import MovieDetails from "./components/MovieDetails";
import Form from "./components/Form";
import Login from "./components/login/Login";
import Register from "./components/login/Register";
import ChangePwd from "./components/login/ChangePwd";

const App = () => {

  const [movieId, setMovieId] = useState();

  const setMovieCardId = (id) => {
    setMovieId(id);
  }

  return (
    <Fragment>
      <NavBar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home setMovieCardId={(id) => setMovieCardId(id)} />} />
          <Route path="/search" element={<Form setMovieCardId={(id) => setMovieCardId(id)} />} />
          <Route path="/watchlist" element={<WatchList setMovieCardId={(id) => setMovieCardId(id)} />} />
          <Route path="/moviedetails" element={<MovieDetails id={movieId}/>} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/pwd" element={<ChangePwd />} />
        </Routes>
      </BrowserRouter>
    </Fragment>
  );
};

export default App;
