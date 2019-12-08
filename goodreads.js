const axios = require("axios");
const parser = require("xml2js").parseString;

/**
 * Use axios to get the data of given URL
 *
 * @param {String} url URL of HTML to scrape
 */
const getHTML = async url => {
  return await axios.get(url);
};

const Goodreads = async () => {
  const url = `https://www.goodreads.com/review/list?v=2&id=${process.env.GOODREAD_ID}&shelf=to-read&key=${process.env.GOODREAD_KEY}&sort=position&per_page=200&page=1`;

  const res = await getHTML(url);

  const status = res.status;
  const xmlData = res.data;

  if (status !== 200) {
    return [];
  }
  let books = [];
  parser(xmlData, function(err, result) {
    const jsonResult = JSON.parse(JSON.stringify(result));
    const reviews = jsonResult["GoodreadsResponse"]["reviews"][0]["review"];

    for (var i = 0; i < reviews.length; i++) {
      // Extract the data from the xml
      const isbn = reviews[i]["book"][0]["isbn13"][0];
      const title = reviews[i]["book"][0]["title_without_series"][0];

      // Create a book object
      const book = { isbn: isbn, title: title, price: '₪0' };

      // Push the object to the array
      books.push(book);
    }
  });
  return books;
};
module.exports = Goodreads;
