const api = require("./api");

module.exports.data = (page, callback, options={}) => {
  var parameters = {
    action: "parse",
    page: page,
    prop: options.prop || "categories|externallinks|links",
  };

  api(parameters, (body, url) => {
    callback(body.parse, page, url);
  });
};

module.exports.summary = (page, callback, options={}) => {
  var parameters = {
    action: "query",
    titles: page,
    prop: "extracts",
    exintro: "",
    explaintext: ""
  }

  api(parameters, (body, url) => {
    callback(body.query, page, url);
  })
};
