export const applyBarcodeMask = (input: string) => {
  return input
    ?.replaceAll(' ', '')
    ?.replace(/^(\d{0,4})(\d{0,3})(\d{0,3})(\d{0,3})$/i, '$1 $2 $3 $4')
    ?.trim();
};
