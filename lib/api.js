const request = require("request-promise");
const urlParse = require("url");
const log = require("npmlog")

module.exports = (_options, parameters={}) => {
  parameters = {
    ...parameters,
    format: "json",
    action: "query",
    redirects: "",
    json: true
  };

  var url = _options.apiURL + urlParse.format({query: parameters});

  return request(url).then(response => JSON.parse(response)).then(response => {
    if (response.error) {
      throw new Error(response.error.info);
    }
    return response;
  });
};
