const axios = require('axios');
const cheerio = require('cheerio');


/**
 * Fetch data of all the restaurants on the website (name). We only need the name so we can compare it with our other list
 * @param  {Array} restaurantsArray - array containing data of each restaurant
 * @param  {Number} nbPages - number of pages of results
 */
module.exports.fetchAllrestaurants = async (restaurantsArray, nbPages) => {
  for (let i = 1; i <= nbPages; i++) {
    const response = await axios({
      method: 'post',
      url: 'https://www.maitresrestaurateurs.fr/annuaire/ajax/loadresult#',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      data: `page=${i}&sort=undefined&request_id=ec830a0fb20e71279f65cd4fad4cb137&annuaire_mode=standard`
		});
    const { data, status } = response;

    if (status >= 200 && status < 300) {
			const $ = cheerio.load(data);
			
      $('.single_desc').each((index, value) => {
				let url = `https://www.maitresrestaurateurs.fr${$(value).find('.single_libel a').attr('href')}`;
				let name = $(value).find('.single_libel a').text().replace(/\s*\(.*?\)\s*/g, '');

				let restaurant = {
					name: name,
					url: url
				};

				restaurantsArray.push(restaurant);				
			});
    }
    else console.error(status);
  }
};