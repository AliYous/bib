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

  
    console.log('🕵️‍♀️  browsing https://www.maitresrestaurateurs.fr');
    const restaurants2 = await maitres.get();
    const json2 = await JSON.stringify(restaurants2, null, 2);
    fs.writeFileSync('server/MaitreRestaurateur.json', json2);


    
    console.log('🕵️‍♀️  browsing https://guide.michelin.com/fr');
    const nbPages = michelin.getNbPages('https://guide.michelin.com/fr/fr/restaurants/bib-gourmand/');
    const links = michelin.fetchRestaurantsUrls(nbPages);
    let restaurants = []
    
    for (let i = 0; i < links.length; i += size) {
      arrayOfArrays.push(links.slice(i, i + size));
    }
    process.exit(0);

  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}


sandbox();
