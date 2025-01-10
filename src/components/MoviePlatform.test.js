import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import MoviePlatform from "./MoviePlatform";

jest.mock('axios');

const mockResponse = {
  data: {
    result: {
      streamingInfo: {
        us: {
          netflix: [{ link: 'https://www.netflix.com/' }],
          hulu: [{ link: 'https://www.hulu.com/' }],
        },
      },
    },
  },
};

describe('MoviePlatform', () => {
  it('renders available platforms', async () => {
    axios.request.mockResolvedValue(mockResponse);
    render(<MoviePlatform id="12345" />);

    await waitFor(() => expect(axios.request).toHaveBeenCalled());

    expect(screen.getByText('Available Platforms')).toBeInTheDocument();
    expect(screen.getByAltText('netflix')).toBeInTheDocument();
    expect(screen.getByAltText('hulu')).toBeInTheDocument();
  });

  it('renders no available platforms message when there are none', async () => {
    axios.request.mockRejectedValue(new Error('Request failed'));
    render(<MoviePlatform id="12345" />);
  
    await waitFor(() => expect(axios.request).toHaveBeenCalled());
  
    expect(screen.getByText('Currently No Available Platform')).toBeInTheDocument();
  });
});
