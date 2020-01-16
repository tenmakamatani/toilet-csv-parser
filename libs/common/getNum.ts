export const getNum = (detail: string) => {
  const numData = detail.split(':')[1];
  return numData === '無し' ? 0 : Number(numData);
}