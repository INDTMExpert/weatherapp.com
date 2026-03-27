

// const options = {
//     method: 'GET',
//     headers: {
//         // IMPORTANT: Paste your newly generated RapidAPI key here
//         'x-rapidapi-key': '8e6f390f49msh56fe262cddac018p1d1749jsne8108774c276', 
//         'x-rapidapi-host': 'open-weather13.p.rapidapi.com',
//         'Content-Type': 'application/json'
//     }
// };

// const getWeather = async (cit) => {
//     // Update the main heading with the searched city name
//     cityName.innerHTML = cit;
    
//     // Safely encode the city name for the URL to handle spaces (e.g., "New York")
//    const url = 'https://open-weather13.p.rapidapi.com/city/NewYork/EN';
//     try {
//         const response = await fetch(url, options);
//         const data = await response.json(); 
        
//         console.log("API Response:", data); // Keep this to verify the data structure in your console

//         // Update DOM elements using the correct paths from the JSON response
//         temp.innerHTML = data.main.temp;
//         temp1.innerHTML = data.main.temp;
//         max_temp.innerHTML = data.main.temp_max; 
//         min_temp.innerHTML = data.main.temp_min; 
//         feels_like.innerHTML = data.main.feels_like;
//         humidity.innerHTML = data.main.humidity;
//         humidity1.innerHTML = data.main.humidity;
        
//         // Format the timestamps for sunrise and sunset    
        
//         wind_degrees.innerHTML = data.wind.deg;  
//         wind_speed.innerHTML = data.wind.speed;  
//         wind_speed1.innerHTML = data.wind.speed;

//     } catch (error) {
//         console.error("Error fetching weather data:", error);
//     }
// };

// // Listen for the search button click
// sub.addEventListener("click", (e) => {
//     e.preventDefault();
//     getWeather(cit.value); 
// });

// // Load default weather on page load
// getWeather("Jaipur");


// Open-Meteo doesn't need API keys or custom headers, so we can remove the 'options' object!

// Open-Meteo returns time as ISO strings (e.g., "2023-12-14T06:30")
// This helper easily converts that into a readable format like "6:30 AM"
const formatTime = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

const getWeather = async (cit) => {
    // 🛑 DEBUGGING: Let's see exactly what the function is receiving!
    console.log("1. getWeather was triggered!");
    console.log("2. The city it is trying to search for is:", cit);

    try {
        const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cit.trim())}&count=1&language=en&format=json`;
        const geoResponse = await fetch(geoUrl);
        const geoData = await geoResponse.json();

        if (!geoData.results || geoData.results.length === 0) {
            console.error("City not found error triggered!");
            cityName.innerHTML = "Not Found - Try Again";
            return; 
        }

        const { latitude, longitude, name } = geoData.results[0];
        cityName.innerHTML = name; 

        const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,is_day,wind_speed_10m,wind_direction_10m,wind_gusts_10m,surface_pressure,pressure_msl,cloud_cover,weather_code,precipitation,rain,showers,snowfall,apparent_temperature&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset&timezone=auto`;
        
        const weatherResponse = await fetch(weatherUrl);
        const weatherData = await weatherResponse.json();
        
        const current = weatherData.current;
        const daily = weatherData.daily;

        temp.innerHTML = current.temperature_2m;
        temp1.innerHTML = current.temperature_2m;
        feels_like.innerHTML = current.apparent_temperature; 
        humidity.innerHTML = current.relative_humidity_2m;
        humidity1.innerHTML = current.relative_humidity_2m;
        wind_speed.innerHTML = current.wind_speed_10m;
        wind_speed1.innerHTML = current.wind_speed_10m;
        wind_degrees.innerHTML = current.wind_direction_10m;
        
        max_temp.innerHTML = daily.temperature_2m_max[0]; 
        min_temp.innerHTML = daily.temperature_2m_min[0]; 
        sunrise.innerHTML = formatTime(daily.sunrise[0]);
        sunset.innerHTML = formatTime(daily.sunset[0]);

    } catch (error) {
        console.error("Error fetching data:", error);
    }
};

// Explicitly target your input and button
const searchInput = document.getElementById("cit");
const searchBtn = document.getElementById("sub");

// Listen for the button click
searchBtn.addEventListener("click", (e) => {
    e.preventDefault(); 
    // Pass exactly what is typed in the box
    getWeather(searchInput.value); 
});

// Load default weather on page load
getWeather("Jaipur");