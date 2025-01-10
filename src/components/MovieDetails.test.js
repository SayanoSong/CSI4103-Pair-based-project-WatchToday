import React from "react";
import { render, screen } from "@testing-library/react";
import axios from "axios";
import MovieDetails from "./moviedetails";

jest.mock("axios");

describe("MovieDetails", () => {
  const mockMovieDets = {
    original_title: "Test Movie",
    poster_path: "/test-poster.jpg",
    genres: [{ name: "Action" }, { name: "Adventure" }],
    release_date: "2022-01-01",
    runtime: 120,
    vote_average: 7.5,
    overview: "This is a test movie.",
  };

  beforeAll(() => {
    axios.get.mockResolvedValue({ data: mockMovieDets });
  });

  it("should render movie details", async () => {
    render(<MovieDetails id={123} />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
    expect(await screen.findByText("Test Movie")).toBeInTheDocument();
    expect(screen.getByAltText("movie poster")).toHaveAttribute(
      "src",
      "https://www.themoviedb.org/t/p/w300_and_h450_bestv2/test-poster.jpg"
    );
    expect(screen.getByText("Action")).toBeInTheDocument();
    expect(screen.getByText("Adventure")).toBeInTheDocument();
    expect(screen.getByText("Release date: 2022-01-01")).toBeInTheDocument();
    expect(screen.getByText("Duration: 120 minutes")).toBeInTheDocument();
    expect(screen.getByText("Vote Average: 7.5")).toBeInTheDocument();
    expect(screen.getByText("Overview: This is a test movie.")).toBeInTheDocument();
  });
});
