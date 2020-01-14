import csv from 'csv-parser';
import fs from 'fs';
const results = [];

import { save } from './libs/save';

const main = () => {
  fs.createReadStream('assets/toilet.csv')
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', async () => {
      await save(results);
      console.log(`計: ${results.length}件`)
    });
}

main();