/* eslint-disable no-console, no-process-exit */



// ------------------------------------- 
//   ONLY FOR TESTING. RUN app.js for full project
// ----------------------------------
const michelin = require('./michelin');
const maitres = require('./maitres');

const axios = require('axios');
const fs = require('fs');

async function sandbox() {
  try {

    // //Fetching from Maitres
    // console.log('🕵️‍♀️  browsing https://www.maitresrestaurateurs.fr');
    // const restaurants2 = await maitres.get();
    // const json2 = await JSON.stringify(restaurants2, null, 2);
    // fs.writeFileSync('./MaitreRestaurateur.json', json2);


    //Fetching from Michelin
    console.log('🕵️‍♀️  browsing https://guide.michelin.com/fr');
    const nbPages = await michelin.getNbPages("https://guide.michelin.com/fr/fr/restaurants/bib-gourmand")
    const restaurantsUrls = await michelin.fetchRestaurantsUrls(nbPages); 
    let restaurants = [];
    for (url of restaurantsUrls){
      await michelin.scrapeRestaurant(url, restaurants); 
    }
    const json = await JSON.stringify(restaurants, null, 2);
    fs.writeFileSync('./MichelinBib.json', json);

    console.log('done');
    process.exit(0);


  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}


sandbox();
