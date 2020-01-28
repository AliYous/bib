const axios = require('axios');
const cheerio = require('cheerio');
const url = "https://www.maitresrestaurateurs.fr/annuaire/recherche/";
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
		const name = $('').text();
		const address = $().text()
		const priceAndType = $('s__heading.d-lg-none > ul > li.restaurant-details__heading-price').text().trim().replace(/\s/g, '').split("•");
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
				let url = $(value).find('.single_libel a').attr('href');
				let name = $(value).find('.single_libel a').text().replace(/\s*\(.*?\)\s*/g, '');

				let restaurant = {
					name: name,
					url: url
				};
				
				console.log(name);
				console.log(url);

				restaurantsArray.push(restaurant);
				
			});
    }
    else console.error(status);
  }
};