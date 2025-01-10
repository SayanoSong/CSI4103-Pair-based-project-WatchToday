import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import MovieCast from './MovieCast';

// Mock the axios library
jest.mock('axios');

const movieCastMockData = {
  data: {
    cast: [
      {
        id: 1,
        name: 'John Doe',
        profile_path: '/samplePath.jpg',
      },
      {
        id: 2,
        name: 'Jane Doe',
        profile_path: '/samplePath2.jpg',
      },
    ],
  },
};

// Suppress console.error output during tests
console.error = jest.fn();

describe('MovieCast component', () => {
  it('renders the cast information', async () => {
    axios.get.mockResolvedValue(movieCastMockData);

    render(<MovieCast id={1} />);

    await waitFor(() => expect(axios.get).toHaveBeenCalledTimes(1));

    expect(screen.getByText('Cast')).toBeInTheDocument();

    movieCastMockData.data.cast.forEach((actor) => {
      expect(screen.getByText(actor.name)).toBeInTheDocument();
    });
  });

  it('handles errors and displays no cast information', async () => {
    axios.get.mockRejectedValue(new Error('Error fetching cast data'));

    render(<MovieCast id={1} />);

    await waitFor(() => expect(axios.get).toHaveBeenCalledTimes(1));

    expect(screen.getByText('Cast')).toBeInTheDocument();
    expect(screen.getByText('No Cast Information')).toBeInTheDocument();
  });
});
