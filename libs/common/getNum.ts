export const getNum = (detail: string): number => {
  const numData = detail.split(':')[1];
  if (numData === '無し') return 0;
  const num = Number(numData);
  return num ? num : 0;
}