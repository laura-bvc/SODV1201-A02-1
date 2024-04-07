    // Fetch current weather
    const url = 'https://api.open-meteo.com/v1/forecast?latitude=51.0501&longitude=-114.0853&current=temperature_2m,apparent_temperature,is_day,precipitation,weather_code&timezone=America%2FDenver';
	
		
	// json from https://gist.github.com/stellasphere/9490c195ed2b53c707087c8c2db4ec0c
	const wmo = "https://gist.githubusercontent.com/stellasphere/9490c195ed2b53c707087c8c2db4ec0c/raw/76b0cb0ef0bfd8a2ec988aa54e30ecd1b483495d/descriptions.json";
	// const wmo = "./descriptions.json";
	var wmo_json;
	
	fetch(wmo)
	.then(data => data.json())
	.then(json => {
		wmo_json = json;
		});

    fetch(url)
    .then(data => data.json())
    .then(json => parseCurr(json))

	
	function parseCurr(json) {
		const currData = {
			Date: new Date(json.current.time),
			wmo: json.current.weather_code,
			is_day: json.current.is_day == "1"? "day":"night",
			Temp: json.current.temperature_2m,
			Temp_feel: json.current.apparent_temperature,
			Precip: json.current.precipitation
		}

		
		$("#weather_img").before('<div>As of ' + currData.Date.toLocaleString() + '</div>');
		// for div $("#weather_img")
		$("#weather_img").append('<div><img src="' + wmo_json[currData.wmo][currData.is_day].image + '"></img></div>');
		$("#weather_img").append('<div id="img_label">' + wmo_json[currData.wmo][currData.is_day].description + '</div>');
		
		// for div $("#weather_txt")
		$("#weather_txt").append('<div><em>Temperature: </em>' + currData.Temp + '°C</div>');
		$("#weather_txt").append('<div><em>Feels like: </em>' + currData.Temp_feel + '°C</div>');
		$("#weather_txt").append('<div><em>Precipitation: </em>' + currData.Precip + 'mm</div>');
		

	}