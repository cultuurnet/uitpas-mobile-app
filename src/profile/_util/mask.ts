export const applyBarcodeMask = (input: string) => {
  const matches = input.match(/^(\d{4})(\d{3})(\d{3})(\d{3})$/i);
  matches.shift(); // remove first item

  return matches.join(' ');
};
