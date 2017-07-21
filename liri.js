var request = require('request');
var twitterKeys = require('./keys.js');
var command = process.argv[2];
var userParameter = process.argv[3];
var Twitter = require('twitter');
var accessCodes = twitterKeys.twitterKeys;
var Spotify = require('node-spotify-api');
var fs = require('fs');

// To accomodate multi-word inputs
if (process.argv[4]){
	console.log("Concanting")
	userParameter = "";
	var inputParams = process.argv.slice(3);
	for (var i = 0; i < inputParams.length; i++){
		if (i > 0){
			userParameter = userParameter + " ";
		}
		userParameter = userParameter + inputParams[i];
	};
	console.log(userParameter)
};

function logResults(result){
	fs.appendFile('./log.txt', result, function (err) {
	  if (err) throw err;
	});
};

function pullTweets(){
	var t = new Twitter(accessCodes);
	var params = {
	// Not necesary to specify as this API call already defaults to 20. 
	}; 
	t.get('statuses/user_timeline.json', params,searchedData); 
	function searchedData(err, data, response) {
		for (var key in data){
			console.log("------------------------");
			console.log(data[key].text);
			console.log(data[key].created_at);
			console.log("------------------------");

			logResults("------------------------");
			logResults(data[key].text);
			logResults(data[key].created_at);
			logResults("------------------------");
		};
	}
}

function checkSpotify(){
	if (userParameter){
		var spotify = new Spotify({
		  id: '8b96941a05b8461eb5eeb6dcb6e4de80',
		  secret: 'a7a7ef39d65441da889a20b71a623037'
		});
		 
		spotify.search({ type: 'track', query: userParameter }, function(err, data) {
		  if (err) {
		    return console.log('Error occurred: ' + err);
		  }

		  if (!data){
		  	console.log("Invalid input");
		  	return;
		  }
		 
			console.log("Artist: " + data.tracks.items[1].artists[0].name); 
			console.log("Song name: " + data.tracks.items[1].name); 
			console.log("Listen at: " + data.tracks.items[1].external_urls.spotify); 
			console.log("Album: " + data.tracks.items[1].album.name); 

			logResults("Artist: " + data.tracks.items[1].artists[0].name);
			logResults("Song name: " + data.tracks.items[1].name);
			logResults("Listen at: " + data.tracks.items[1].external_urls.spotify);
			logResults("Album: " + data.tracks.items[1].album.name);
		}); 
	} else {
		// To avoid unneccesary API calls. 
		console.log("Artist: Ace of Base"); 
		console.log("Song name: The Sign"); 
		console.log("Listen at: https://play.spotify.com/track/3DYVWvPh3kGwPasp7yjahc?play=true&utm_source=open.spotify.com&utm_medium=open"); 
		console.log("Album: The Sign"); 

		logResults("Artist: Ace of Base");
		logResults("Song name: The Sign");
		logResults("Listen at: https://play.spotify.com/track/3DYVWvPh3kGwPasp7yjahc?play=true&utm_source=open.spotify.com&utm_medium=open");
		logResults("Album: The Sign");
	}
};

function findMovie(){
	// Since this is a larger amount of information, a default API call will be used, to make maintenance easier.
	if (!userParameter){
		userParameter = "Mr+Nobody";
	};
	var queryUrl = "http://www.omdbapi.com/?t=" + userParameter + "&y=&plot=short&apikey=40e9cece";
	request(queryUrl, function (error, response, body) {
		if (error){
		  	console.log(error);
		  	return;
		};

		if (!body){
			console.log("Invalid input");
		  	return;
		}

		body = JSON.parse(body);

		console.log("Title: " + body.Title);
		console.log("Release year: " + body.Year);
		console.log("IMDb Rating: " + body.Ratings[0].Value);
		console.log("Rotten Tomatoes Score: " + body.Ratings[1].Value);
		console.log("Country of production: " + body.Country);
		console.log("Language: " + body.Language);
		console.log("Plot: " + body.Plot);
		console.log("Cast: " + body.Actors);

		logResults("Title: " + body.Title);
		logResults("Release year: " + body.Year);
		logResults("IMDb Rating: " + body.Ratings[0].Value);
		logResults("Rotten Tomatoes Score: " + body.Ratings[1].Value);
		logResults("Country of production: " + body.Country);
		logResults("Language: " + body.Language);
		logResults("Plot: " + body.Plot);
		logResults("Cast: " + body.Actors);
	});
};

function doWhatItSays(){
	fs.readFile("./random.txt", "utf8", function(error, data){
		if (error){
			return console.log(error);
		};

		command = data.split(",")[0];
		userParameter = data.split(",")[1];
		checkInput();
	});
};


function checkInput(){
	// Interprets user's commands 
	switch(command) {
	    case "my-tweets":
	        pullTweets();
	        break;
	    case "spotify-this-song":
	        checkSpotify();
	        break;
	    case "movie-this":
	        findMovie();
	        break;
	    case "do-what-it-says":
	        doWhatItSays();
	        break;
	};
};

checkInput();