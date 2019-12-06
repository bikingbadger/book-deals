require("dotenv").config();
const {Books} = require("./bookrepository");

(async () => {
  const books = await Books();
  console.log(books);
})();
