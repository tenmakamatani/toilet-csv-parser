import fs from 'fs';

const outputPath = 'toilet.json'

const save = (results) => {
  // Delete json
  if (fs.existsSync(outputPath)) {
    fs.unlinkSync(outputPath);
  }
  // Change structure
  results.forEach(results => {
    results['概略'] = results['概略'].split('\n');
    results['開館時間'] = results['開館時間'].split('\n');
    results['料金'] = results['料金'].split('\n');
  })
  // Create json
  fs.writeFileSync(outputPath, JSON.stringify(results, null, '\t'));
}

export { save };