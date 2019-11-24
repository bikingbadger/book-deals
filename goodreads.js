const axios = require("axios");
const parser = require("xml2js").parseString;

const toReadAPI =
  "";

axios
  .get(toReadAPI)
  .then(response => {
    const xmlData = response.data;
    console.log(`Respone Code: ${response.status}`);
    parser(xmlData, function(err, result) {
      const jsonResult = JSON.parse(JSON.stringify(result));
      console.dir(jsonResult);

      const reviews = jsonResult["GoodreadsResponse"]["reviews"][0]['review'];
      console.log(reviews.length);
      for (var i = 0; i < reviews.length; i++) {
        var book = reviews[i]['book'][0];
        console.log(`ISNB: ${book.isbn} Title: ${book.title_without_series}`);
        console.log('==========================================');
      }
    });
  })
  .catch(err => {
    console.log(err);
  });
