import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import Browse from "./Browse";
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

describe("Browse component", () => {
  it("renders Popular Movies and Top Rated Movies sections", async () => {
    const popularMovies = [
      { id: 1, title: "Popular Movie 1" },
      { id: 2, title: "Popular Movie 2" }
    ];

    const topRatedMovies = [
      { id: 3, title: "Top Rated Movie 1" },
      { id: 4, title: "Top Rated Movie 2" }
    ];

    axios.get.mockImplementation((url) => {
      if (url.includes("popular")) {
        return Promise.resolve({ data: { results: popularMovies } });
      } else if (url.includes("top_rated")) {
        return Promise.resolve({ data: { results: topRatedMovies } });
      }
    });

    renderWithRouter(<Browse />);

    await waitFor(() => {
      expect(screen.getByText(/Popular Movies/i)).toBeInTheDocument();
      expect(screen.getByText(/Top Rated Movies/i)).toBeInTheDocument();
    });

    popularMovies.forEach((movie) => {
      expect(screen.getByText(movie.title)).toBeInTheDocument();
    });

    topRatedMovies.forEach((movie) => {
      expect(screen.getByText(movie.title)).toBeInTheDocument();
    });
  });
});
