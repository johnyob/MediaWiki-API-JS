const api = require("./api");


/**
* Page object
* @param {Object} pageResponse - response from page
* @param {Object} _options - api options
* @return {Object} - contains methods for page
*/

module.exports = (pageResponse, _options) => {
  const page = pageResponse;


  /**
  * Text content from page
  * @method page.content
  * @return {Promise}
  */

  var content = () => {
    return api(_options, {
      titles: page.title,
      prop: "extracts",
      explaintext: ""
    }).then((result) => {
      return result.query.pages[page.pageid].extract;
    });
  };


  /**
  * Summary content from page
  * @method page.summary
  * @return {Promise}
  */

  var summary = () => {
      return api(_options, {
        titles: page.title,
        prop: "extracts",
        exintro: "",
        explaintext: ""
      }).then((result) => {
        return result.query.pages[page.pageid].extract;
      });
  };


  /**
  * References from page
  * @method page.references
  * @return {Promise}
  */

  var references = () => {
    return api(_options, {
      titles: page.title,
      prop: "extlinks",
      ellimit: "max"
    }).then((result) => {
      return result.query.pages[page.pageid].extlinks.map(link => link["*"]);
    });
  };


  /**
  * @method page.categories
  * @return {Promise}
  */

  var categories = (limit=200) => {
    return api(_options, {
      titles: page.title,
      prop: "categories",
      pllimit: limit
    }).then((result) => {
      return result.query.pages[page.pageid].categories.map(category => category.title);
    });
  };


  return {
    content: content,
    summary: summary,
    references: references,
    categories: categories,
    title: page.title,
    id: page.pageid
  };
};
