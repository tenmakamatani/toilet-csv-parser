import * as fs from 'fs';

import { IToilet, INotMultiPurposeToilet, IMultiPurposeToilet } from './types/Toilet';

import { getNum } from './common/getNum';

const outputPath = 'toilet.json'

const save = (results) => {
  // Delete json
  if (fs.existsSync(outputPath)) {
    fs.unlinkSync(outputPath);
  }
  // Change structure
  const toilets: IToilet[] = [];
  results.forEach((result) => {
    result['開館時間'] = result['開館時間'].split('\n');

    const toilet: IToilet = {} as IToilet;
    toilet['name'] = result['名称'];
    toilet['latitude'] = parseFloat(result['緯度']);
    toilet['longitude'] = parseFloat(result['経度']);
    toilet['address'] = result['住所'];
    toilet['phoneNumber'] = result['電話番号'];
    toilet['price'] = result['料金'];

    toilet['manOnly'] = {} as INotMultiPurposeToilet;
    toilet['womanOnly'] = {} as INotMultiPurposeToilet;
    toilet['manAndWoman'] = {} as INotMultiPurposeToilet;
    toilet['multiPurpose'] = {} as IMultiPurposeToilet;
    
    const details = result['概略'].split('\n');
    details.forEach(detail => {
      const title = detail.split(':')[0];
      switch (title) {
        case '男性専用トイレ_パウダースペース':
          toilet['manOnly']['powderSpace'] = getNum(detail);
          break;
      }
    });

    toilets.push(toilet);
  });
  // Create json
  fs.writeFileSync(outputPath, JSON.stringify(toilets, null, '\t'));
}

export { save };