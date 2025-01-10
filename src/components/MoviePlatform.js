import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MoviePlatform = ({id}) => {
  const tmdb_id = `movie/${id}`
  const [platforms, setPlatforms] = useState({});

  useEffect(() => {
    const options = {
      method: 'GET',
      url: 'https://streaming-availability.p.rapidapi.com/v2/get/basic',
      params: { country: 'us', tmdb_id },
      headers: {
        'X-RapidAPI-Key': 'c2fff29047msh9c3a08a6b4b8f9fp1c8e7djsn370f778ddd42',
        'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com'
      }
    };

    axios.request(options).then(function (response) {
      console.log(response.data)
      setPlatforms(response.data.result.streamingInfo.us);
    }).catch(function (error) {
      setPlatforms(null)
    });
  }, [tmdb_id]);

  return (
    <>
    <h2 className="platform-header">Available Platforms</h2>
    <div className='platformTable'>
        {platforms? 
          Object.keys(platforms).map((platform) => (
            <div className='ImgContainer' key={platform}>
                <a href={platforms[platform][0].link} target="_blank" rel='noreferrer'>
                  <img className='platformImg' src={`/platform_logos/${platform}.svg`} alt={platform} />
                </a>
            </div>
          ))
        : (
            <h3><b>Currently No Available Platform</b></h3>
          )
        }
    </div>
    </>
  );
};

export default MoviePlatform;