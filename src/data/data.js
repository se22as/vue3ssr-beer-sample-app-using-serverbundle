const fetch = require('node-fetch');

/**
 * APIs for getting beer from https://punkapi.com/
 *
 * All rest calls return json content, below is a sample response
 * [
 *   {
 *      "id": 17
 *      name: "AB:06",
 *      tagline: "Imperial Black IPA.",
 *      first_brewed: "04/2011",
 *      description: "Our sixth Abstrakt....""
 *    }
 *  ]
 */

/**
 * Returns an array of objects containing "id", "name", "description" of all
 * Punk IPA beers.
 */
export function fetchAllBeers() {
  const url = 'https://api.punkapi.com/v2/beers';

  return fetch(url)
    .then((res) => res.json())
    .then((json) => {
      const beers = json.map(
        (beer) => ({
          id: beer.id,
          name: beer.name,
          tagline: beer.tagline,
        }),
      );
      // put the beers in alphabetical order
      beers.sort((a, b) => {
        const nameA = a.name.toUpperCase();
        const nameB = b.name.toUpperCase();
        // eslint-disable-next-line no-nested-ternary
        return (nameA < nameB) ? -1 : (nameA > nameB) ? 1 : 0;
      });
      return {
        beers,
      };
    });
}

/**
 * Returns an array of beer ids.
 */
// export function fetchAllBeerIds() {
//   const url = 'https://api.punkapi.com/v2/beers';
//   return fetch(url)
//   .then(res => res.json())
//   .then(json => {
//     const beers = json.map( (beer) => beer.id);
//     // put ids in order
//     beers.sort(function(a, b) {
//       var idA = a.id;
//       var idB = b.id;
//       return (idA < idB) ? -1 : (idA > idB) ? 1 : 0;
//     });
//     return beers;
//   });
// }

/**
 * Get the full details of a specified beer.
 */
export function fetchBeer(id) {
  const url = `https://api.punkapi.com/v2/beers/${id}`;
  return fetch(url)
    .then((res) => res.json())
    .then((json) => ({
      id,
      beer: (json.length > 0) ? json[0] : json,
    }));
}

/**
 * Get the full details of a random beer.
 */
export function fetchRandomBeer() {
  const url = 'https://api.punkapi.com/v2/beers/random';
  return fetch(url)
    .then((res) => res.json())
    .then((json) => ({
      beer: (json.length > 0) ? json[0] : json,
    }));
}
