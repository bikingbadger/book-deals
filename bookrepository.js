const axios = require("axios");
const cheerio = require("cheerio");

// Array for storing all the books across the pages
const bookList = new Array();

axios
  .get("https://www.bookdepository.com/dealsAndOffers/promo/id/1762")
  .then(response => {
    const html = response.data;
    console.log(`Respone Code: ${response.status}`);

    if (response.status === 200) {
      const $ = cheerio.load(html);

      const bookCount = $("#search-info .search-count").html(); //.text();
      const pages = Math.ceil(bookCount / 30);
      console.log(pages);

      // Loop over each page and retrieve the books on each page
      for (let index = 0; index < pages; index++) {
        axios
          .get(
            `https://www.bookdepository.com/dealsAndOffers/promo/id/1762?page=${index}`,
          )
          .then(response => {
            const html = response.data;
            console.log(`Respone Code: ${response.status}`);

            if (response.status === 200) {
              const $ = cheerio.load(html);
              $(".book-item").each((i, el) => {
                const isbn = $(el)
                  .find("meta")
                  .attr("content");
                // console.log("ISBN:", isbn);

                const title = $(el)
                  .find(".title")
                  .text()
                  .replace(/\s\s+/g, "");
                // console.log("Title:", title);

                const price = $(el)
                  .find(".price")
                  .clone() //clone the element
                  .children() //select all the children
                  .remove() //remove all the children
                  .end() //again go back to selected element;
                  .text()
                  .replace(/\s\s+/g, "");
                // console.log("Price:", price);

                const book = { ISBN: isbn, Title: title, Price: price };
                bookList.push(book);
              });
            }
            return bookList;
          })
          .then(books => {
            console.table(books);
          });
      }
    }
  });
