$(document).ready(function(){
	$.getJSON('http://ip-api.com/json', function(position){
		var latitude = position.lat;
		var longitude = position.lon;
		var units = 'metric';
		$.ajax({
			url: 'http://api.openweathermap.org/data/2.5/weather',
			dataType: 'jsonp',
			data: {
			'lat': latitude,
			'lon': longitude,
			'APPID': '5d5c2dde4d3a52f4ef89efbd7b9e25d2',
			'units': units
		},
			success: function(data) {
				var city = data.name;
				var country = data.sys.country;
				var tempC = Math.round(data.main.temp);
				var weather = capitalizeFirstLetter(data.weather[0].description);
				var icon = data.weather[0].icon;
				var id = data.weather[0].id;
				$('#location').text(city + ', ' + country);
				$('#temp').html(tempC + '&deg;C');
				$('#weather').text(weather);
				$('#icon').addClass('wi wi-owm-' + id);

				//background color change
				var currentTime = new Date().getHours();
				if (currentTime <= 7 || currentTime > 20) {
        	$('body,html').addClass('night');
				}
				else {
   				if (id >= "200" && id <= "532") {
						$('body,html').addClass('dark-grey');
					}
					if (id >= "803" && id <= "804") {
						$('body,html').addClass('light-grey');
					}
					if (id >= "800" && id <= "802") {
						$('body,html').addClass('blue');
					}
					if (id >="600" && id <= "622") {
						$('body,html').addClass('snow');
					}
          //default to blue for all other weather types
          else $('body,html').addClass('blue');
				}

				//toggle celsius/fahrenheit
				$('#myonoffswitch').on('click', function(){
					$('#temp').toggleClass('fahrenheit celsius');
					if ($('#temp').hasClass('fahrenheit')){
						$('.fahrenheit').html(setFahrenheit(tempC));
						}
					else {
						$('.celsius').html(tempC + '&deg;C');
						}
				}); //end $('.switch').on('click' function
			} //end ajax success function
		}); // end .ajax method
	}, 'jsonp'); // end getJSON method
}); //end $(document).ready method

function setFahrenheit(temp) {
	return Math.round(((temp * 9) / 5) + 32) + '&deg;F';
}

function capitalizeFirstLetter(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}
