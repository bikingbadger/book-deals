# book-deals

Linking up Good Reads List with Book Depository to find cheaps deals

Get to-read shelf
curl "https://www.goodreads.com/review/list?v=2&id=$process.env.GOODREAD_ID}&shelf=to-read&key=$process.env.GOODREAD_KEY}&sort=avg_rating&per_page=200&page=1"
