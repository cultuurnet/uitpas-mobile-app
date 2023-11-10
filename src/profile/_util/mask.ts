export const applyBarcodeMask = (input: string) => {
  const inputArray = input.replaceAll(' ', '').split('');

  const part1 = inputArray.slice(0, 4);
  const part2 = inputArray.length >= 5 ? [' ', ...inputArray.slice(4, 7)] : [];
  const part3 = inputArray.length >= 8 ? [' ', ...inputArray.slice(7, 10)] : [];
  const part4 = inputArray.length >= 11 ? [' ', ...inputArray.slice(10, 13)] : [];

  return `${part1.join('')}${part2.join('')}${part3.join('')}${part4.join('')}`;
};
