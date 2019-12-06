require("dotenv").config();
const Goodreads = require("./goodreads");
const Books = require("./bookrepository");

(async () => {
  try {
    const books = await Books();
    const myBooks = await Goodreads();
    console.log(myBooks);
  } catch (error) {
    console.log(error);
  }
})();
