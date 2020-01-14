import fs from 'fs';

const outputPath = 'toilet.json'

const save = (results) => {
  // Delete json
  if (fs.existsSync(outputPath)) {
    fs.unlinkSync(outputPath);
  }
  // Change structure
  results.forEach(result => {
    result['概略'] = result['概略'].split('\n');
    result['開館時間'] = result['開館時間'].split('\n');
    result['料金'] = result['料金'].split('\n');
  })
  // Create json
  fs.writeFileSync(outputPath, JSON.stringify(results, null, '\t'));
}

export { save };