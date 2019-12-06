require("dotenv").config();
const Goodreads = require("./goodreads");
const Books = require("./bookrepository");

(async () => {
  try {
    const books = await Books();
    const myBooks = await Goodreads();

    myBooks.forEach(book => {
      const isbn = book[0].isbn13[0];
      const title = book[0].title[0];
      if (typeof isbn === "string") {
        const found = books.find(book => {
          return isbn === book.isbn;
        });

        if (found) {
          console.log(isbn);
          console.log(title);
          console.log("BINGO!!!!!!");
        }
      }
    });
  } catch (error) {
    console.log(error);
  }
})();
