/* eslint-disable no-console, no-process-exit */



const michelin = require('./michelin');
const maitres = require('./maitres');
const commonBib = require('./commonBib');

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
    // console.log('🕵️‍♀️  browsing https://guide.michelin.com/fr');
    // const nbPages = await michelin.getNbPages("https://guide.michelin.com/fr/fr/restaurants/bib-gourmand")
    // const restaurantsUrls = await michelin.fetchRestaurantsUrls(nbPages); 
    // let restaurants = [];
    // for (url of restaurantsUrls){
    //   await michelin.scrapeRestaurant(url, restaurants); 
    // }
    // const json = await JSON.stringify(restaurants, null, 2);
    // fs.writeFileSync('./MichelinBib.json', json);
    // console.log('done');

    console.log('Looking for the restaurants that are common to both websites ...');
    const bibList = await commonBib.findBib(); 
    const json3 = await JSON.stringify(bibList, null, 2);
    fs.writeFileSync('./commonBib.json', json3);

    process.exit(0);


  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}


sandbox();
