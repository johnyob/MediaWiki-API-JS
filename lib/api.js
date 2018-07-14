const request = require("request");
const urlParse = require("url");
const log = require("npmlog")

const WIKIPEDIA_API = "http://en.wikipedia.org/w/api.php";

module.exports = (parameters, callback, options={}) => {
  parameters.lang = parameters.lang || "en";
  parameters.format = "json";

  var url = WIKIPEDIA_API + urlParse.format({query: parameters});
  request(url, {json: true}, (error, response, body) => {
    if (error) {
      log.error(url, error);
      return;
    }
    callback(body, url)
  });
};
