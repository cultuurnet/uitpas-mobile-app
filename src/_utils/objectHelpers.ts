import { HttpMetadataPagingResponse } from '../_http';

export function removeEmptyKeys<T>(object: T): Partial<T> {
  return Object.keys(object).reduce<Partial<T>>((acc, key: string) => {
    if (object[key]) return { ...acc, [key]: object[key] };
    return acc;
  }, {});
}

export function insertUpdatedData<T extends { id: string }>(currentData: T[], dataToInsert: T[]): T[] {
  const result = [...(currentData || [])];
  const updatedData = dataToInsert.filter(updatedObject => result.some(currentObject => currentObject.id === updatedObject.id));
  updatedData.forEach(updatedObject =>
    result.splice(
      result.findIndex(currentObject => currentObject.id === updatedObject.id),
      1,
      updatedObject,
    ),
  );
  return [...result, ...dataToInsert.filter(newObject => !updatedData.some(updatedObject => updatedObject.id === newObject.id))];
}

export function keepRetrievedDataPage<T>(currentData: T[], retrievedData: T[], metadata: HttpMetadataPagingResponse): T[] {
  let result = currentData || [];
  if (!metadata.skip) result = []; // Start overnew when the offset was reset
  return [...result, ...retrievedData];
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export function deepCopy<T>(inObject: T): T {
  // Return the value if inObject is not an object
  if (typeof inObject !== 'object' || inObject === null) {
    return inObject;
  }

  // Return a copy of the value if inObject is a Date
  if (inObject instanceof Date) {
    return new Date(inObject) as any;
  }

  // Return the value if inObject is a File
  if (inObject instanceof File) {
    return inObject;
  }

  // Create an array or object to hold the values
  const outObject: any = Array.isArray(inObject) ? [] : {};
  for (const key in inObject) {
    const value = inObject[key];
    // Recursively (deep) copy for nested objects, including arrays
    outObject[key] = typeof value === 'object' && value !== null ? deepCopy(value) : value;
  }

  return outObject;
}
/* eslint-enable @typescript-eslint/no-explicit-any */

export function isEmptyObject(object: unknown): boolean {
  if (!object) return true;
  if (Array.isArray(object)) return object.every(isEmptyObject);
  if (typeof object === 'object') return Object.keys(object).every(key => isEmptyObject(object[key]));
  return false;
}
