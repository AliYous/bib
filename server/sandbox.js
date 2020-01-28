/* eslint-disable no-console, no-process-exit */
const michelin = require('./michelin');
const axios = require('axios');

async function sandbox () {
  try {
    const nbPages = await michelin.getNbPages("https://guide.michelin.com/fr/fr/restaurants/bib-gourmand")
    console.log(nbPages)
    const restaurantsUrls = await michelin.fetchRestaurantsUrls(nbPages); //Need to get nb of pages through a method
    console.log(restaurantsUrls)
    console.log('done');
    process.exit(0);

  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}



sandbox();
