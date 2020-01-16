export const getBoolean = (detail: string): boolean => {
  const booleanData = detail.split(':')[1];
  return booleanData === '有り';
}