import React, { useState } from "react";
import axios from "axios";

function App() {
  // State to hold the weather data received from the API response
  const [data, setData] = useState({});

  // State to store the location input provided by the user
  const [location, setLocation] = useState("");

  // API URL to fetch weather data from the OpenWeatherMap API based on the user's location
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=895284fb2d2c50a520ea537456963d9c`;

  // Function to search for weather data when the user presses the 'Enter' key



// last last


  const searchLocation = (event) => {
    // Check if the 'Enter' key is pressed
    if (event.key === "Enter") {
      // Make an API call using Axios to get weather data
      axios.get(url).then((response) => {
        // Update the state 'data' with the received API response data
        setData(response.data);
        // Log the API response data to the console for debugging purposes
      });
      // Clear the 'location' state after the API call
      setLocation("");
    }
  };

  return (
    <div className="app">
      {/* JSX code to render a search bar (a div with class 'searchbar') with an input element */}
      <div className="searchbar">
        {/* Input element */}
        <input
          // Bind the value of the input to the 'location' state (controlled component)
          value={location}
          // Call the 'setLocation' function to update the 'location' state when the input value changes
          onChange={(event) => setLocation(event.target.value)}
          // Call the 'searchLocation' function when the user presses a key while the input is focused
          onKeyPress={searchLocation}
          // Placeholder text to display inside the input when it is empty
          placeholder="Enter Location"
          // Set the input type to 'text'
          type="text"
        />
      </div>


      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? <h1>{data.main.temp.toFixed()}°F</h1> : null}
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>

        {data.name !== undefined && (
          <div className="bottom">
            <div className="feels">
              {data.main ? (
                <p className="bold">{data.main.feels_like.toFixed()}°F</p>
              ) : null}
              <p>Feels Like</p>
            </div>
            <div className="humidity">
              {data.main ? <p className="bold">{data.main.humidity}%</p> : null}
              <p>Humidity</p>
            </div>
            <div className="wind">
              {data.wind ? (
                <p className="bold">{data.wind.speed.toFixed()} MPH</p>
              ) : null}
              <p>Wind Speed</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
