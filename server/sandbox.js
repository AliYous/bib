/* eslint-disable no-console, no-process-exit */
const michelin = require('./michelin');
const axios = require('axios');

async function sandbox () {
  try {
    const restaurantsUrls = await michelin.fetchRestaurantsUrls(5);
    console.log(restaurantsUrls);

  

    console.log('done');
    process.exit(0);

  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}



sandbox();
