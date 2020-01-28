/* eslint-disable no-console, no-process-exit */
const michelin = require('./michelin');
const axios = require('axios');
const fs = require('fs');

async function app() {
	try {

		// ----------   Michelin ----------------
		const nbPages = await michelin.getNbPages("https://guide.michelin.com/fr/fr/restaurants/bib-gourmand")
		const restaurantsUrls = await michelin.fetchRestaurantsUrls(nbPages);
		let restaurants = [];
		for (url of restaurantsUrls) {
			console.log("scraping " + url);
			await michelin.scrapeRestaurant(url, restaurants);
		}
		const json = await JSON.stringify(restaurants, null, 2);
		fs.writeFileSync('./michelinBib.json', json); //Creating the restaurants JSON file



		// ----------   Maitres restaurateurs ----------------





		process.exit(0);

	} catch (e) {
		console.error(e);
		process.exit(1);
	}
}


app();
