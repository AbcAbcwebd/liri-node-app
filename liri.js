var request = require('request');
var twitterKeys = require('./keys.js');
var command = process.argv[2];
var Twitter = require('twitter');

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
var accessCodes = twitterKeys.twitterKeys;
console.log(accessCodes)
var t = new Twitter(accessCodes);
var params = {
//q: "",
//count: 1
} // this is the param variable which will have key and value ,the key is the keyword which we are interested in searching and count is the count of it
t.get('statuses/user_timeline.json', params,searchedData); // get is the 
/*function to search the tweet which three paramaters 'search/tweets'
,params and a callback function.*/
function searchedData(err, data, response) {
console.log(data);
}