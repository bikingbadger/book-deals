const axios = require("axios");
const cheerio = require("cheerio");

const bookDepositoryURL = "https://www.bookdepository.com/dealsAndOffers/promo/id";

/**
 * Use axios to get the data of given URL
 *
 * @param {String} url URL of HTML to scrape
 */
const getHTML = async url => {
  return await axios.get(url);
};

/**
 * Get the page count on the page
 *
 * @param {String} url URL of the page to get the count of the books
 */
const getPageCount = async url => {
  const res = await getHTML(url);

  const status = res.status;
  const html = res.data;

  if (status !== 200) {
    return -1;
  }
  const $ = cheerio.load(html);

  const bookCount = $("#search-info .search-count").html(); //.text();
  const pages = Math.ceil(bookCount / 30);
  return pages;
};

/**
 * Extract each book onto the page into an array
 *
 * @param {String} url URL for the page of books
 * @returns {Array} An array of books
 */
const getPageBooks = async url => {
  const res = await getHTML(url);

  const status = res.status;
  const html = res.data;

  if (status !== 200) {
    return [];
  }
  const $ = cheerio.load(html);
// Array for storing all the books across the pages
const bookList = new Array();

  $(".book-item").each((i, el) => {
    const isbn = $(el)
      .find("meta")
      .attr("content");

    const title = $(el)
      .find(".title")
      .text()
      .replace(/\s\s+/g, "");

    const price = $(el)
      .find(".price")
      .clone() //clone the element
      .children() //select all the children
      .remove() //remove all the children
      .end() //again go back to selected element;
      .text()
      .replace(/\s\s+/g, "");

    const book = { ISBN: isbn, Title: title, Price: price };
    bookList.push(book);
  });

  return bookList;
};

const Books = async () => {
  const url = `${bookDepositoryURL}/1762`;
  const pages = await getPageCount(url);
  console.log(`Pages: ${pages}`);

  let books = [];
  // Loop over each page and retrieve the books on each page
  for (let index = 1; index <= pages; index++) {
    const pageBooks = await getPageBooks(`${url}?page=${index}`);
    books.push(pageBooks);
  }

  return books;
};

module.exports =  Books ;
