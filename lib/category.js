const api = require("./api");

/**
* Category object
* @param {Object} _options - api options
* @return {Object} - contains methods for category
*/

module.exports = (_options) => {
  /*
  * Helper Methods
  */

  var f = (parameters, results=[]) => {
    return api(_options, parameters).then(result => {
      let next = [...results, ...result.query[parameters.list].map(x => x.title)];
      let queryContinue = result["query-continue"] || result.continue;
      if (queryContinue) {
        let nextKey = (queryContinue[parameters.list] && queryContinue[parameters.list].cmfrom) || queryContinue.cmcontinue;
        parameters.cmcontinue = nextKey;
        parameters.cmfrom = nextKey;
        return f(parameters, next);
      }
      return next;
    }).catch(error => console.log(error));
  };

  /*
  * API Methods
  */


  /**
   * @method category.pagesInCategory
   * @param {String} category
   * @return {Array} - Array of pages in category (includes pages and subcategory names)
   */

  var pagesInCategory = (category, limit=500) => {
    if (category.indexOf("Category:") == -1) {
      category = "Category:" + category;
    }

    return f({
      cmtitle: category,
      list: "categorymembers",
      limit: limit
    });
  }

  return {
    pagesInCategory: pagesInCategory
  };
};
