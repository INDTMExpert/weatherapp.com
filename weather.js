const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '8e6f390f49msh56fe262cddac018p1d1749jsne8108774c276',
		'X-RapidAPI-Host': 'weather-by-api-ninjas.p.rapidapi.com'
	}
};


const getWeather = (cit) => {

	cityName.innerHTML = cit
	
	fetch('https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=' + cit, options)

		.then(response => response.json())
		.then((response) => {
			
			console.log(response)

			temp.innerHTML = response.temp

			temp1.innerHTML = response.temp

			max_temp.innerHTML = response.max_temp

			min_temp.innerHTML = response.min_temp

			feels_like.innerHTML = response.feels_like

			humidity.innerHTML = response.humidity

			humidity1.innerHTML = response.humidity

			sunrise.innerHTML = response.sunrise

			sunset.innerHTML = response.sunset

			wind_degrees.innerHTML = response.wind_degrees

			wind_speed.innerHTML = response.wind_speed

			wind_speed1.innerHTML = response.wind_speed

			

		})
		.catch(err => console.error(err));
}

sub.addEventListener("click", (e) => {
	e.preventDefault()
	getWeather(cit.value)

})

getWeather("Jaipur")












