const axios = require('axios');
const cheerio = require('cheerio');

/**
 * Parse webpage restaurant
 * @param  {String} data - html response
 * @return {Object} restaurant
 */
const parse = data => {
  const $ = cheerio.load(data);
  const name = $('.section-main h2.restaurant-details__heading--title').text();
  const experience = $('#experience-section > ul > li:nth-child(2)').text();

  return {name, experience};
};





/**
 * Scrape a given restaurant url
 * @param  {String}  url
 * @return {Object} restaurant
 */
module.exports.scrapeRestaurant = async url => {
  const response = await axios(url);
  const {data, status} = response; 

  if (status >= 200 && status < 300) {
    return parse(data);
  }

  console.error(status);

  return null;
};


module.exports.getNbPages = async (url) => {
  const response = await axios(url);
  const data = response.data
  const status = response.status
  const $ = cheerio.load(data);

  const totalRestaurants = $("body > main > section.section-main.search-results.search-listing-result > div > div > div.search-results__count > div.d-flex.align-items-end.search-results__status > div.flex-fill > h1")
      .text()
      .trim()
      .split(" ");
  const nbPages = Math.ceil(Number(totalRestaurants[totalRestaurants.length - 2]) / 20);

  return nbPages

}


/**
 * Get all Urls of restaurants
 * @param  {String}  url
 * @return {Array} restaurantsUrls
 */
module.exports.fetchRestaurantsUrls = async (nbPages) => {
  const url = "https://guide.michelin.com/fr/fr/restaurants/bib-gourmand/page/";
  let links = [];
  for (let i = 1; i <= nbPages; i++) {
    const response = await axios(`${url}${i}`);
    const data= response.data;
    const status = response.status;

    if (status >= 200 && status < 300) {
      const $ = cheerio.load(data);
      $('.link').each((index, value) => {
        let link = $(value).attr('href');
        links.push(`https://guide.michelin.com${link}`);
      });
    }
    else console.error(status);
  }
  return links;
};




