import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { useNavigate } from 'react-router-dom';
import Card from './Card';

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

describe('Card', () => {
  const mockMovie = {
    id: 123,
    title: 'The Movie',
    poster_path: '/path/to/poster.jpg',
    genre_ids: [1, 2],
  };
  const mockSetMovieCardId = jest.fn();

  it('renders movie title and poster', () => {
    const { getByText, getByAltText } = render(
      <Card movie={mockMovie} setMovieCardId={mockSetMovieCardId} />
    );

    const titleElement = getByText(/The Movie/);
    expect(titleElement).toBeInTheDocument();

    const posterElement = getByAltText(/movie poster/);
    expect(posterElement).toBeInTheDocument();
  });

  it('adds movie to watchlist when add button is clicked', () => {
    const { getByText } = render(
      <Card movie={mockMovie} setMovieCardId={mockSetMovieCardId} />
    );

    const addButton = getByText('+ Watchlist');
    fireEvent.click(addButton);

    expect(window.localStorage.movies).toContain('123');
  });

  it('removes movie from watchlist when remove button is clicked', () => {
    window.localStorage.movies = '123,456';

    const { getByText } = render(
      <Card movie={{ ...mockMovie, id: 456 }} setMovieCardId={mockSetMovieCardId} />
    );

    const removeButton = getByText('Remove');
    fireEvent.click(removeButton);

    expect(window.localStorage.movies).not.toContain('456');
  });

  it('navigates to moviedetails page when poster is clicked', () => {
    const mockNavigate = jest.fn();
    useNavigate.mockReturnValue(mockNavigate);

    const { getByAltText } = render(
      <Card movie={mockMovie} setMovieCardId={mockSetMovieCardId} />
    );

    const posterElement = getByAltText(/movie poster/);
    fireEvent.click(posterElement);

    expect(mockSetMovieCardId).toHaveBeenCalledWith(123);
    expect(mockNavigate).toHaveBeenCalledWith('/moviedetails/');
  });
});
