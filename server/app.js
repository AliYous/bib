/* eslint-disable no-console, no-process-exit */
const michelin = require('./michelin');
const maitres = require('./maitres');

const axios = require('axios');
const fs = require('fs');

async function app() {
	try {

		// ----------   Michelin ----------------
		// const nbPagesMichelin = await michelin.getNbPages("https://guide.michelin.com/fr/fr/restaurants/bib-gourmand")
		// const restaurantsUrls = await michelin.fetchRestaurantsUrls(nbPagesMichelin);
		// let restaurants = [];
		// for (url of restaurantsUrls) {
		// 	console.log("scraping " + url);
		// 	await michelin.scrapeRestaurant(url, restaurants);
		// }
		// const jsonMichelin = await JSON.stringify(restaurants, null, 2);
		// fs.writeFileSync('./michelinBib.json', jsonMichelin); //Creating the restaurants JSON file



		// ----------   Maitres restaurateurs ----------------
		let restaurantsMaitres = [];
		const nbPagesMaitres = 2; //Have to create a function to get the nb of pages
		await maitres.fetchAllrestaurants(restaurantsMaitres, nbPagesMaitres)
		const jsonMaitres = await JSON.stringify(restaurantsMaitres, null, 2);
		fs.writeFileSync('./maitresRestaurateurs.json', jsonMaitres); //Creating the restaurants JSON file




		process.exit(0);

	} catch (e) {
		console.error(e);
		process.exit(1);
	}
}


app();
