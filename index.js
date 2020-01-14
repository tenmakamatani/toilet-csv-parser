const csv = require('csv-parser');
const fs = require('fs');
const results = [];

const main = () => {
  fs.createReadStream('assets/toilet.csv')
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', () => {
      results.forEach(result => {
        console.log(result['ID']);
      })
      console.log(`計: ${results.length}件`)
    });
}

main();