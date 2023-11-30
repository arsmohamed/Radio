import React, { useState } from 'react';
import axios from 'axios';

function RadioPlayer() {
  const [stations, setStations] = useState([]);
  const [selectedStation, setSelectedStation] = useState(null);

  const getStations = async () => {
    try {
      const response = await axios.get('https://50k-radio-stations.p.rapidapi.com/get/channels', {
        params: {
          keyword: 'a',
          country_id: '50',
          page: '1'
        },
        headers: {
          'X-RapidAPI-Key': 'd21e22b6aemsh31775c1a1d8ff0cp111a5bjsned4612084d2a',
          'X-RapidAPI-Host': '50k-radio-stations.p.rapidapi.com'
        }
      });
      console.log(response.data);
      setStations(response.data.content);
    } catch (error) {
      console.error(error);
    }
  };

  const playStation = (station) => {
    setSelectedStation(station);
  };

  return (
    <div>
      <button onClick={getStations}>Get Stations</button>
      {Array.isArray(stations) && stations.map((station) => (
        <div key={station.id}>
          <input
            type="radio"
            id={station.id}
            name="station"
            value={station.id}
            onChange={() => playStation(station)}
          />
          <label htmlFor={station.id}>{station.name}</label>
        </div>
      ))}
      {selectedStation && (
        <audio src={selectedStation.stream} controls autoPlay />
      )}
    </div>
  );
}


export default RadioPlayer;
