const axios = require('axios');
const cheerio = require('cheerio');


/**
 * Scrape a given restaurant url and adds it in hash format to the restaurants array 
 * @param  {String}  url
 * @return {Object} restaurant
 */
module.exports.scrapeRestaurant = async (url, restaurantsArray) => {
  const response = await axios(url);
  const { data, status } = response;

  if (status >= 200 && status < 300) {
    const $ = cheerio.load(data)
    const name = $('.section-main h2.restaurant-details__heading--title').text();
    const address = $('body > main > div.restaurant-details > div.container > div > div.col-xl-8.col-lg-7 > section.section.section-main.restaurant-details__main > div.restaurant-details__heading.d-none.d-lg-block > ul > li:nth-child(1)').text()
    const priceAndType = $('body > main > div.restaurant-details > div.container > div > div.col-xl-4.order-xl-8.col-lg-5.order-lg-7.restaurant-details__aside > div.restaurant-details__heading.d-lg-none > ul > li.restaurant-details__heading-price').text().trim().replace(/\s/g, '').split("•");
    const price = priceAndType[0];
    const type = "Cuisine : " + priceAndType[1];
    const experience_array = $('#experience-section > ul > li:nth-child(2)').text().trim().split(' ');
    const experience = experience_array[experience_array.length - 2] + ' ' + experience_array[experience_array.length - 1];
    const distinction = 'Bib Gourmand';
    let phone = 'Non renseigné';
    if ($('body > main > div.restaurant-details > div.container > div > div.col-xl-8.col-lg-7 > section:nth-child(4) > div.row > div:nth-child(1) > div > div:nth-child(1) > div > div > a').attr("href")) {
      phone = '+' + $('body > main > div.restaurant-details > div.container > div > div.col-xl-8.col-lg-7 > section:nth-child(4) > div.row > div:nth-child(1) > div > div:nth-child(1) > div > div > a').attr("href").replace(/[^0-9]/g, ''); //we use regex to remove the non digits char
    };


    const restaurant = {
      name: name,
      address: address,
      phone: phone,
      price: price,
      type: type,
      experience: experience,
      distinction: distinction
    };
    restaurantsArray.push(restaurant);
  }
  else console.error(status);

  return null;
};


module.exports.getNbPages = async (url) => {
  const response = await axios(url);
  const { data, status } = response;
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
    const { data, status } = response;

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




