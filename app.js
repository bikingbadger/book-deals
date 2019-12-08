require("dotenv").config();
const Goodreads = require("./goodreads");
const Books = require("./bookrepository");

(async () => {
  try {
    const books = await Books();
    const myBooks = await Goodreads();

    let deals = [];
    myBooks.forEach(myBook => {
      if (myBook.isbn.nil) return;
      const found = books.find(book => myBook.isbn === book.isbn);
      found ? deals.push(found) : false;
    });
    console.log(deals);
  } catch (error) {
    console.log(error);
  }
})();
