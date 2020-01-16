export interface IToilet {
  name: string;        // 施設名称
  latitude: number;    // 緯度
  longitude: number;   // 経度
  address: string;     // 住所
  phoneNumber: string; // 電話番号
  price: string;       // 料金
  manOnly: INotMultiPurposeToilet;
  womanOnly: INotMultiPurposeToilet;
  manAndWoman: INotMultiPurposeToilet;
  multiPurpose: IMultiPurposeToilet;
}

// 多目的トイレ以外の概略部分
export interface INotMultiPurposeToilet {
  powderSpace: number;         // パウダースペース
  changingSpace: number;       // 着替え台・スペース
  babyChair: number;           // ベビーチェア
  infantToiletSheat: number;   // 幼児用便座
  infantToilet: number;        // 幼児用トイレ
  diaperChangingTable: number; // おむつ交換台
}

// 多目的トイレの概略部分
export interface IMultiPurposeToilet {
  genderDistinction: Existence; // 男女の区別
  hotWaterWashing: number;      // 温水洗浄機能
  num: number;                  // 数
  wheelChair: number;           // 車椅子
  ostomate: number;             // オストメイト
  largeBed: number;             // 大型ベッド
  notificationDevice: number;   // 緊急通報装置
  changingSpace: number;        // 着替え台
  babyChair: number;            // ベビーチェア
  infantToiletSheat: number;    // 幼児用便座
  infantToilet: number;         // 幼児用トイレ
  diaperChangingTable: number;  // おむつ交換台
  diaperBags: Existence;        // おむつ用袋
  diaperTrashCan: Existence;    // おむつ用ゴミ箱
}

type Existence = '有り' | '無し';