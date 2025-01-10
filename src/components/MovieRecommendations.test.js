import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import MovieRecommendations from "./MovieRecommendations";
import axios from "axios";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";

jest.mock("axios");

const renderWithRouter = (ui, { route = "/" } = {}) => {
  const history = createMemoryHistory({ initialEntries: [route] });
  return {
    ...render(<Router history={history}>{ui}</Router>),
    history
  };
};

describe("MovieRecommendations component", () => {
  it("renders the recommendations", async () => {
    const id = 1;
    const tmpQueryStr = "&MovieRecommendations&";
    const tmpMovieIds = [2];

    const movieRecommendations = [
      { id: 3, title: "Recommended Movie 1" },
      { id: 4, title: "Recommended Movie 2" }
    ];

    axios.get.mockImplementation((url) => {
      if (url.includes("recommendations")) {
        return Promise.resolve({ data: { results: movieRecommendations } });
      }
    });

    renderWithRouter(<MovieRecommendations id={id} tmpQueryStr={tmpQueryStr} tmpMovieIds={tmpMovieIds} />);

    await waitFor(() => {
      expect(screen.getByText(/Recommended Movies/i)).toBeInTheDocument();
    });

    movieRecommendations.forEach((movie) => {
      expect(screen.getByText(movie.title)).toBeInTheDocument();
    });
  });
});
