const api = require("./api");
const pageMethods = require("./page");
const categoryMethods = require("./category")

const defaultOptions = {
  apiURL: "http://en.wikipedia.org/w/api.php"
};


/**
* Wiki api
* @param {Object} options - api options
* @return {Object} methods for wikipedia api
*/

module.exports = (options={}) => {
  const _options = {...defaultOptions, ...options};

  /*
  * Helper Methods
  */

  var handlePage = (result) => {
    var id = Object.keys(result.query.pages)[0];
    if (!id || id == "-1") {
      throw new Error("No page found.");
    }
    return pageMethods(result.query.pages[id], _options);
  };

  /*
  * API Methods
  */


  /**
  * @method wiki.search
  * @param {string} query - search query
  * @param {Number} limit - cardinality of results = limit
  * @return {Promise} - promise with results
  */

  var search = (query, limit=25) => {
      return api(_options, {
        list: "search",
        srsearch: query,
        srlimit: limit
      }).then(response => {
        return {
          query: query,
          results: response.query.search
        };
      }).catch(error => console.log(error));
  };


  /**
  * @method wiki.page
  * @param {string} page - title of page
  * @return {Promise}
  */

  var page = (page) => {
    return api(_options, {
      titles: page,
      prop: "info|pageprops",
      inprop: "url",
      ppprop: "disambiguation"
    }).then(handlePage).catch(error => console.log(error));
  };


  /**
  * @method wiki.pageId
  * @param {string} id - id of page
  * @return {Promise}
  */

  var pageId = (id) => {
    return api(_options, {
      pageids: id,
      prop: "info|pageprops",
      inprop: "url",
      ppprop: "disambiguation"
    }).then(handlePage).catch(error => console.log(error));
  };


  return {
    search: search,
    page: page,
    pageId: pageId,
    ...categoryMethods(_options)
  };
};
