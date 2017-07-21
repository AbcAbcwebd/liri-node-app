var request = require('request');
var twitterKeys = require('./keys.js');
var command = process.argv[2];
var Twitter = require('twitter');
var accessCodes = twitterKeys.twitterKeys;

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
		};
	}
}

pullTweets();

/*
// Interprets user's commands 
switch(command) {
    case "my-tweets":
        code block
        break;
    case "spotify-this-song":
        code block
        break;
    case "movie-this":
        code block
        break;
    case "do-what-it-says":
        code block
        break;
};
*/


