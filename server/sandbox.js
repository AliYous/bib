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

    let links = [];
    await maitres.fetchAllrestaurants(links, 2)
    console.log(links) 




    process.exit(0);

  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}


sandbox();
