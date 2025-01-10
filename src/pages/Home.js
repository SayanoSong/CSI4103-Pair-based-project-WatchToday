import React from "react";
import Browse from "../components/Browse";

/*The more page, brings you to the Form page */

const Home = ({setMovieCardId}) => {

  return (
    <div className="homePage">
      <Browse/>
    </div>
  );
};

export default Home;
