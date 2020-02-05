import * as fs from 'fs';

import { IToilet, INotMultiPurposeToilet, IMultiPurposeToilet } from './types/Toilet';

import { getNum } from './common/getNum';
import { getBoolean } from './common/getBoolean';

const outputPath = 'toilet.json'

const save = (results) => {
  // Delete json
  if (fs.existsSync(outputPath)) {
    fs.unlinkSync(outputPath);
  }
  // Set counter
  let i = 1;
  // Change structure
  const toilets: IToilet[] = [];
  results.forEach((result) => {
    const toilet: IToilet = {} as IToilet;
    toilet['id'] = i;
    toilet['name'] = result['名称'];
    toilet['latitude'] = parseFloat(result['緯度']);
    toilet['longitude'] = parseFloat(result['経度']);
    toilet['address'] = result['住所'];
    toilet['phoneNumber'] = result['電話番号'];
    const prices = result['料金'].split('\n');
    toilet['facilityPrice'] = prices[0].replace(/施設の利用料金:/, '');
    toilet['toiletPrice'] = prices[1].replace(/トイレの利用料金:/, '');

    toilet['manOnly'] = {} as INotMultiPurposeToilet;
    toilet['womanOnly'] = {} as INotMultiPurposeToilet;
    toilet['manAndWoman'] = {} as INotMultiPurposeToilet;
    toilet['multiPurpose'] = {} as IMultiPurposeToilet;
    
    const details = result['概略'].split('\n');
    details.forEach(detail => {
      const title = detail.split(':')[0];
      switch (title) {
        case 'トイレの利用可能者':
          toilet['availableUsers'] = detail.replace(/トイレの利用可能者:/, '');
          break;
        case 'その他特記事項等':
          toilet['otherNoteworthyThings'] = detail.replace(/その他特記事項等:/, '');
          break;
        case '男性専用トイレ_小便器台数':
          toilet['manOnly']['urinalNum'] = getNum(detail);
          break;
        case '男性専用トイレ_洋式トイレ台数':
          toilet['manOnly']['westernStyleNum'] = getNum(detail);
          break;
        case '男性専用トイレ_和式トイレ台数':
          toilet['manOnly']['japaneseStyleNum'] = getNum(detail);
          break;
        case '男性専用トイレ_パウダースペース':
          toilet['manOnly']['powderSpace'] = getNum(detail);
          break;
        case '男性専用トイレ_着替え台・着替えスペース':
          toilet['manOnly']['changingSpace'] = getNum(detail);
          break;
        case '男性専用トイレ_ベビーチェア':
          toilet['manOnly']['babyChair'] = getNum(detail);
          break;
        case '男性専用トイレ_幼児用便座':
          toilet['manOnly']['infantToiletSheat'] = getNum(detail);
          break;
        case '男性専用トイレ_幼児用トイレ':
          toilet['manOnly']['infantToilet'] = getNum(detail);
          break;
        case '男性専用トイレ_おむつ交換台':
          toilet['manOnly']['diaperChangingTable'] = getNum(detail);
          break;
        case '女性専用トイレ_洋式トイレ台数':
          toilet['womanOnly']['westernStyleNum'] = getNum(detail);
          break;
        case '女性専用トイレ_和式トイレ台数':
          toilet['womanOnly']['japaneseStyleNum'] = getNum(detail);
          break;
        case '女性専用トイレ_パウダースペース':
          toilet['womanOnly']['powderSpace'] = getNum(detail);
          break;
        case '女性専用トイレ_着替え台・着替えスペース':
          toilet['womanOnly']['changingSpace'] = getNum(detail);
          break;
        case '女性専用トイレ_ベビーチェア':
          toilet['womanOnly']['babyChair'] = getNum(detail);
          break;
        case '女性専用トイレ_幼児用便座':
          toilet['womanOnly']['infantToiletSheat'] = getNum(detail);
          break;
        case '女性専用トイレ_幼児用トイレ':
          toilet['womanOnly']['infantToilet'] = getNum(detail);
          break;
        case '女性専用トイレ_おむつ交換台':
          toilet['womanOnly']['diaperChangingTable'] = getNum(detail);
          break;
        case '男女兼用トイレ（多目的トイレ以外）_パウダースペース':
          toilet['manAndWoman']['powderSpace'] = getNum(detail);
          break;
        case '男女兼用トイレ（多目的トイレ以外）_着替え台・着替えスペース':
          toilet['manAndWoman']['changingSpace'] = getNum(detail);
          break;
        case '男女兼用トイレ（多目的トイレ以外）_ベビーチェア':
          toilet['manAndWoman']['babyChair'] = getNum(detail);
          break;
        case '男女兼用トイレ（多目的トイレ以外）_幼児用便座':
          toilet['manAndWoman']['infantToiletSheat'] = getNum(detail);
          break;
        case '男女兼用トイレ（多目的トイレ以外）_幼児用トイレ':
          toilet['manAndWoman']['infantToilet'] = getNum(detail);
          break;
        case '男女兼用トイレ（多目的トイレ以外）_おむつ交換台':
          toilet['manAndWoman']['diaperChangingTable'] = getNum(detail);
          break;
        case '多目的トイレ_男女の区別':
          toilet['multiPurpose']['genderDistinction'] = getBoolean(detail);
          break;
        case '多目的トイレ_トイレ数':
          toilet['multiPurpose']['num'] = getNum(detail);
          break;
        case '多目的トイレ_うち車椅子対応':
          toilet['multiPurpose']['wheelChair'] = getNum(detail);
          break;
        case '多目的トイレ_うちオストメイト設備付':
          toilet['multiPurpose']['ostomate'] = getNum(detail);
          break;
        case '多目的トイレ_うち大型ベッド付':
          toilet['multiPurpose']['largeBed'] = getNum(detail);
          break;
        case '多目的トイレ_うち非常用通報装置付':
          toilet['multiPurpose']['notificationDevice'] = getNum(detail);
          break;
        case '多目的トイレ_うち着替え台付':
          toilet['multiPurpose']['changingSpace'] = getNum(detail);
          break;
        case '多目的トイレ_うちベビーチェア付':
          toilet['multiPurpose']['babyChair'] = getNum(detail);
          break;
        case '多目的トイレ_うち幼児用便座付':
          toilet['multiPurpose']['infantToiletSheat'] = getNum(detail);
          break;
        case '多目的トイレ_うち幼児用トイレ付':
          toilet['multiPurpose']['infantToilet'] = getNum(detail);
          break;
        case '多目的トイレ_うちおむつ交換台付':
          toilet['multiPurpose']['diaperChangingTable'] = getNum(detail);
          break;
        case '多目的トイレ_おむつ用袋':
          toilet['multiPurpose']['diaperBags'] = getBoolean(detail);
          break;
        case '多目的トイレ_おむつ用ゴミ箱':
          toilet['multiPurpose']['diaperTrashCan'] = getBoolean(detail);
          break;
        default:
          break;
      }
    });

    toilets.push(toilet);
    i++;
  });
  // Create json
  fs.writeFileSync(outputPath, JSON.stringify(toilets, null, '\t'));
}

export { save };