const fs = require('fs');
var stringSimilarity = require('string-similarity');

const contains = (restaurant, bib) => {
  for (element of bib) {
    if (restaurant === element)
      return true;
  }
  return false;
}

module.exports.findBib = async () => {
  const michelinJSON = await fs.readFileSync('./MichelinBib.json');
  const michelin = JSON.parse(michelinJSON);

  const maitreJSON = await fs.readFileSync('./MaitreRestaurateur.json');
  const maitre = JSON.parse(maitreJSON);

  let bib = [];
  for (restaurant of maitre) {
    for (restaurant2 of michelin) {
      const nameSimilarity = stringSimilarity.compareTwoStrings(restaurant.name.toLowerCase().trim().replace(/\s\n\r\t,-'/, ''), restaurant2.name.toLowerCase().trim().replace(/\s\n\r\t,-'/, ''));
      const addressSimilarity = stringSimilarity.compareTwoStrings(restaurant.address.toLowerCase().trim().replace(/\s\n\r\t,-'/, ''), restaurant2.address.toLowerCase().trim().replace(/\s\n\r\t,-'/, ''));
      const phoneSimilarity = stringSimilarity.compareTwoStrings(restaurant.phone.substr(1), restaurant2.phone.substr(4));
      if (nameSimilarity > 0.8 && !contains(restaurant2, bib))
        bib.push(restaurant2);
      else if (phoneSimilarity > 0.8 && restaurant.phone !== 'Non renseigné' && restaurant2.phone !== 'Non renseigné' && !contains(restaurant2, bib))
        bib.push(restaurant2);
      else if (nameSimilarity > 0.6 && addressSimilarity > 0.6 && !contains(restaurant2, bib))
        bib.push(restaurant2);
    }
  }

  return bib;
}